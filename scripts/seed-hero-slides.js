const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const heroSlides = [
    {
        title: 'Precision in <br /><span class="italic text-brand font-serif">Governance.</span>',
        subtitle: 'Qatar-Based Advisory',
        description: 'We architect resilient strategies for sovereign wealth funds, regional corporations, and distinguished family offices across the GCC.',
        buttonText: 'Partner With Us',
        buttonLink: '/contact',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        order: 1,
        isActive: true
    },
    {
        title: 'Strategic <br /><span class="italic text-brand font-serif">Excellence.</span>',
        subtitle: 'Investment Advisory',
        description: 'Delivering world-class governance frameworks and investment strategies tailored to the unique dynamics of the MENA region.',
        buttonText: 'Explore Services',
        buttonLink: '/services',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop',
        order: 2,
        isActive: true
    },
    {
        title: 'Trusted <br /><span class="italic text-brand font-serif">Partners.</span>',
        subtitle: 'Family Office Solutions',
        description: 'Preserving generational wealth through innovative governance structures and succession planning expertise.',
        buttonText: 'Learn More',
        buttonLink: '/about',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        order: 3,
        isActive: true
    }
];

async function main() {
    console.log('--- Seeding Hero Slides ---');

    // Check if slides exist
    const existingCount = await prisma.heroSlide.count();
    console.log(`Existing slides: ${existingCount}`);

    if (existingCount === 0) {
        // Create slides
        for (const slide of heroSlides) {
            const created = await prisma.heroSlide.create({
                data: slide
            });
            console.log(`Created slide: ${created.id} - Order ${created.order}`);
        }
        console.log('Successfully seeded hero slides!');
    } else {
        console.log('Slides already exist. Skipping seed.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
