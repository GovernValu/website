
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncSettings() {
    try {
        console.log('Starting settings content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'settings.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} settings content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} settings content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'settings',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'settings',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} settings content.`);
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log('Sync completed successfully.');
    } catch (error) {
        console.error('Error syncing settings content:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncSettings();
