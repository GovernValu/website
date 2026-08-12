const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function syncBoard() {
    try {
        console.log('Starting board content sync...');

        const contentDir = path.join(process.cwd(), 'content');
        const languages = ['en', 'ar'];

        for (const lang of languages) {
            const filePath = path.join(contentDir, lang, 'board.json');

            if (fs.existsSync(filePath)) {
                console.log(`Reading ${lang} board content from ${filePath}...`);
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                console.log(`Upserting ${lang} board content to database...`);
                await prisma.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: 'board',
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: 'board',
                        lang: lang,
                        content: content
                    }
                });
                console.log(`✅ Successfully synced ${lang} board content (${content.boardMembers?.list?.length ?? 0} members).`);
            } else {
                console.warn(`⚠️  No board content file found for ${lang} at ${filePath}`);
            }
        }

        console.log('Board content sync complete.');
    } catch (error) {
        console.error('Error syncing board content:', error);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
    }
}

syncBoard();
