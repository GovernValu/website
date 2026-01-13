
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncContact() {
    try {
        console.log('Starting contact content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'contact.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} contact content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} contact content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'contact',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'contact',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} contact content.`);
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log('Sync completed successfully.');
    } catch (error) {
        console.error('Error syncing contact content:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncContact();
