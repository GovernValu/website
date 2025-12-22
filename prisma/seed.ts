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
