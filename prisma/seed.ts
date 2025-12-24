import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@governvalu.com' },
        update: {},
        create: {
            email: 'admin@governvalu.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'admin',
        },
    });

    console.log('Created admin user:', admin.email);

    // Create default categories
    const categories = [
        { name: 'News', slug: 'news', description: 'Latest news and updates' },
        { name: 'Insights', slug: 'insights', description: 'Industry insights and analysis' },
        { name: 'Announcements', slug: 'announcements', description: 'Company announcements' },
    ];

    for (const cat of categories) {
        await prisma.blogCategory.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
        console.log('Created category:', cat.name);
    }

    // Seed Page Content
    const fs = require('fs');
    const path = require('path');
    const contentDir = path.join(process.cwd(), 'content');
    const languages = ['en', 'ar'];

    console.log('Seeding page content...');

    // Need to cast prisma to any because Typescript might not pick up the new model immediately
    const prismaClient = prisma as any;

    for (const lang of languages) {
        const langDir = path.join(contentDir, lang);

        if (fs.existsSync(langDir)) {
            const files = fs.readdirSync(langDir).filter((file: string) => file.endsWith('.json'));

            for (const file of files) {
                const pageName = file.replace('.json', '');
                const filePath = path.join(langDir, file);
                const rawContent = fs.readFileSync(filePath, 'utf-8');
                const content = JSON.parse(rawContent);

                await prismaClient.pageContent.upsert({
                    where: {
                        page_lang: {
                            page: pageName,
                            lang: lang
                        }
                    },
                    update: {
                        content: content
                    },
                    create: {
                        page: pageName,
                        lang: lang,
                        content: content
                    }
                });
                console.log(`Seeded content for ${pageName} (${lang})`);
            }
        }
    }

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
