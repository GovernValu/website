
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncServices() {
    try {
        console.log('Starting services content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'services.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} services content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} services content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'services',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'services',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} services content.`);
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log('Sync completed successfully.');
    } catch (error) {
        console.error('Error syncing services content:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncServices();
