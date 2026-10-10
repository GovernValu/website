import fs from 'fs';
import path from 'path';
import prisma from './prisma';
import { applySharedLists, SHARED_LISTS, type ContentLang } from './bilingual';

const contentDir = path.join(process.cwd(), 'content');

function readContentFile<T>(pageName: string, lang: string): T | null {
    const filePath = path.join(contentDir, lang, `${pageName}.json`);

    if (!fs.existsSync(filePath)) {
        // Fallback to English if language file doesn't exist
        const enFilePath = path.join(contentDir, 'en', `${pageName}.json`);
        if (fs.existsSync(enFilePath)) {
            const fileContent = fs.readFileSync(enFilePath, 'utf-8');
            return JSON.parse(fileContent) as T;
        }
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}

/** The record exactly as stored for one language: database first, JSON files as fallback. */
async function readStoredContent<T>(pageName: string, lang: string): Promise<T | null> {
    try {
        const dbContent = await prisma.pageContent.findUnique({
            where: {
                page_lang: {
                    page: pageName,
                    lang: lang
                }
            }
        });

        if (dbContent) {
            return dbContent.content as T;
        }
    } catch (error) {
        console.warn(`[Content] Failed to fetch from DB, falling back to file system:`, error);
        // Continue to file system fallback
    }

    return readContentFile<T>(pageName, lang);
}

/**
 * Page content for one language, ready to render. Shared bilingual lists
 * (see lib/bilingual.ts) are read from the English record and localized.
 * Pass `raw: true` to get the stored record untouched, as the admin editor does.
 */
export async function getContent<T>(
    pageName: string,
    lang: string = 'en',
    options: { raw?: boolean } = {}
): Promise<T | null> {
    if (options.raw || !SHARED_LISTS[pageName]) {
        return readStoredContent<T>(pageName, lang);
    }

    const [content, enContent] = await Promise.all([
        readStoredContent<T>(pageName, lang),
        lang === 'en' ? null : readStoredContent<unknown>(pageName, 'en'),
    ]);

    return applySharedLists<T>(pageName, lang as ContentLang, content, lang === 'en' ? content : enContent);
}

async function upsertContent(pageName: string, lang: string, content: unknown): Promise<void> {
    await prisma.pageContent.upsert({
        where: {
            page_lang: {
                page: pageName,
                lang: lang
            }
        },
        update: {
            content: content as any
        },
        create: {
            page: pageName,
            lang: lang,
            content: content as any
        }
    });
}

export async function saveContent<T>(pageName: string, content: T, lang: string = 'en'): Promise<void> {
    try {
        if (!SHARED_LISTS[pageName]) {
            await upsertContent(pageName, lang, content);
            return;
        }

        // The English record owns shared lists. The Arabic record keeps a localized
        // copy so older deployments (and rollbacks) still render the full list.
        if (lang === 'en') {
            await upsertContent(pageName, lang, content);
            const arContent = await readStoredContent<unknown>(pageName, 'ar');
            if (arContent) {
                await upsertContent(pageName, 'ar', applySharedLists(pageName, 'ar', arContent, content));
            }
        } else {
            const enContent = await readStoredContent<unknown>(pageName, 'en');
            await upsertContent(pageName, lang, applySharedLists(pageName, lang as ContentLang, content, enContent));
        }
    } catch (error) {
        console.error(`[Content] Failed to save to DB:`, error);
        throw error;
    }
}

export function getAllContentPages(lang: string = 'en'): string[] {
    const langDir = path.join(contentDir, lang);
    if (!fs.existsSync(langDir)) {
        return [];
    }

    return fs.readdirSync(langDir)
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
}
