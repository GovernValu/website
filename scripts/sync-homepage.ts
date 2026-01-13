
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncHomepage() {
    try {
        console.log('Starting homepage content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'homepage.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} homepage content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} homepage content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'homepage',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'homepage',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} homepage content.`);
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log('Sync completed successfully.');
    } catch (error) {
        console.error('Error syncing homepage content:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncHomepage();
