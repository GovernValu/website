const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
    console.log('--- Verifying Database Content ---');
    const pages = ['philosophy', 'expertise', 'teams'];
    const langs = ['ar', 'en'];

    for (const page of pages) {
        for (const lang of langs) {
            try {
                const record = await prisma.pageContent.findUnique({
                    where: {
                        page_lang: {
                            page: page,
                            lang: lang
                        }
                    }
                });

                if (record) {
                    console.log(`[PASS] ${page} (${lang}): Found in DB.`);
                    // Check a key field
                    if (lang === 'ar') {
                        const content = record.content;
                        if (page === 'philosophy' && content.hero) console.log(`   Sample: ${content.hero.badge}`);
                        if (page === 'expertise' && content.hero) console.log(`   Sample: ${content.hero.badge}`);
                        if (page === 'teams' && content.hero) console.log(`   Sample: ${content.hero.badge}`);
                    }
                } else {
                    console.error(`[FAIL] ${page} (${lang}): NOT FOUND in DB.`);
                }
            } catch (error) {
                console.error(`[ERROR] ${page} (${lang}):`, error.message);
            }
        }
    }
}

verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
