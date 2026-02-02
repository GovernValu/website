
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncClients() {
    try {
        console.log('Starting clients content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'clients.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} clients content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} clients content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'clients',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'clients',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} clients content.`);
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log('Sync completed successfully.');
    } catch (error) {
        console.error('Error syncing clients content:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncClients();
