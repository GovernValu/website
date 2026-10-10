
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

                // Clients added in the admin portal exist only in the database; never
                // replace a longer live list with an older file unless forced.
                const existing = await prisma.pageContent.findUnique({
                    where: { page_lang: { page: 'clients', lang } },
                });
                const liveCount = ((existing?.content as any)?.clients ?? []).length;
                const fileCount = (content.clients ?? []).length;
                if (liveCount > fileCount && !process.argv.includes('--force')) {
                    console.warn(`⚠️ Skipping ${lang}: database has ${liveCount} clients, file has ${fileCount}. Re-run with --force to overwrite.`);
                    continue;
                }

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
