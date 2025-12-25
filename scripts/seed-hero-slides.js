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
        isActive: true,

        // Arabic Content
        titleAr: 'دقة في <br /><span class="italic text-brand font-serif">الحوكمة.</span>',
        subtitleAr: 'استشارات مقرها قطر',
        descriptionAr: 'نحن نصمم استراتيجيات مرنة لصناديق الثروة السيادية والشركات الإقليمية والمكاتب العائلية المتميزة عبر دول مجلس التعاون الخليجي.',
        buttonTextAr: 'شاركنا النجاح',
    },
    {
        title: 'Strategic <br /><span class="italic text-brand font-serif">Excellence.</span>',
        subtitle: 'Investment Advisory',
        description: 'Delivering world-class governance frameworks and investment strategies tailored to the unique dynamics of the MENA region.',
        buttonText: 'Explore Services',
        buttonLink: '/services',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop',
        order: 2,
        isActive: true,

        // Arabic Content
        titleAr: 'التميز <br /><span class="italic text-brand font-serif">الاستراتيجي.</span>',
        subtitleAr: 'الاستشارات الاستثمارية',
        descriptionAr: 'تقديم أطر حوكمة عالمية المستوى واستراتيجيات استثمار مصممة خصيصاً للديناميكيات الفريدة لمنطقة الشرق الأوسط وشمال أفريقيا.',
        buttonTextAr: 'اكتشف خدماتنا',
    },
    {
        title: 'Trusted <br /><span class="italic text-brand font-serif">Partners.</span>',
        subtitle: 'Family Office Solutions',
        description: 'Preserving generational wealth through innovative governance structures and succession planning expertise.',
        buttonText: 'Learn More',
        buttonLink: '/about',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        order: 3,
        isActive: true,

        // Arabic Content
        titleAr: 'شركاء <br /><span class="italic text-brand font-serif">موثوقون.</span>',
        subtitleAr: 'حلول المكاتب العائلية',
        descriptionAr: 'الحفاظ على ثروة الأجيال من خلال هياكل الحوكمة المبتكرة وخبرة تخطيط التعاقب.',
        buttonTextAr: 'تعرف على المزيد',
    }
];

async function main() {
    console.log('--- Seeding Hero Slides with Translations ---');

    // Upsert slides based on order to update existing ones with translations
    for (const slide of heroSlides) {
        const existing = await prisma.heroSlide.findFirst({
            where: { order: slide.order }
        });

        if (existing) {
            console.log(`Updating slide order ${slide.order}...`);
            await prisma.heroSlide.update({
                where: { id: existing.id },
                data: slide
            });
        } else {
            console.log(`Creating slide order ${slide.order}...`);
            await prisma.heroSlide.create({
                data: slide
            });
        }
    }

    console.log('Successfully seeded/updated hero slides!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
