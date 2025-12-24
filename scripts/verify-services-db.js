const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Verifying Arabic Services content in DB...');

    const page = await prisma.pageContent.findUnique({
        where: {
            page_lang: {
                page: 'services',
                lang: 'ar'
            }
        }
    });

    if (!page) {
        console.log('No content found for services/ar');
        return;
    }

    const services = page.content.services;
    const invRel = services.find(s => s.slug === 'investment-relations');
    const corpVal = services.find(s => s.slug === 'corporate-valuation');

    console.log('--- Investment Relations ---');
    if (invRel) {
        console.log('Title:', invRel.title);
        console.log('Process Steps:', invRel.process ? invRel.process.length : 'MISSING');
        if (invRel.process) {
            console.log(JSON.stringify(invRel.process, null, 2));
        }
    } else {
        console.log('Service not found!');
    }

    console.log('--- Corporate Valuation ---');
    if (corpVal) {
        console.log('Title:', corpVal.title);
        console.log('Process Steps:', corpVal.process ? corpVal.process.length : 'MISSING');
        if (corpVal.process) {
            console.log(JSON.stringify(corpVal.process, null, 2));
        }
    } else {
        console.log('Service not found!');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
