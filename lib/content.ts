import fs from 'fs';
import path from 'path';
import prisma from './prisma';

const contentDir = path.join(process.cwd(), 'content');

export async function getContent<T>(pageName: string, lang: string = 'en'): Promise<T | null> {
    try {
        // Try fetching from database first
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

    // Fallback to file system
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

export async function saveContent<T>(pageName: string, content: T, lang: string = 'en'): Promise<void> {
    try {
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
