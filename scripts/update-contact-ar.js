const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const contactArabic = {
    hero: {
        badge: "متاحون للاستشارة",
        title: "دعنا نبني",
        titleHighlight: "معاً.",
        subtitle: "ابدأ حواراً سرياً مع كبار شركائنا حول أهدافك في الحوكمة والاستثمار.",
        backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
    },
    quickContact: {
        phone: "+974 4412 3456",
        email: "info@governvalu.com",
        officeHours: "الأحد - الخميس، ٨:٠٠ ص - ٥:٠٠ م"
    },
    form: {
        sectionTitle: "اتصل بنا",
        headline: "ابدأ رحلتك",
        subtitle: "سواء كنت تبحث عن تحسين الحوكمة، أو استشارات استثمارية، أو مشورة استراتيجية، فإن كبار شركائنا مستعدون للاستماع.",
        formTitle: "طلب استشارة",
        formSubtitle: "يتم التعامل مع جميع الاتصالات بسرية تامة.",
        inquiryOptions: [
            "تدقيق حوكمة الشركات",
            "استشارات استثمارية",
            "إدارة المخاطر والأزمات",
            "خدمات المكاتب العائلية",
            "استشارات مجالس الإدارة",
            "الاندماج والاستحواذ عبر الحدود",
            "علاقات إعلامية / تحدث",
            "استفسار عام"
        ]
    },
    headquarters: {
        title: "المقر الرئيسي",
        city: "الدوحة، قطر",
        address: "مركز قطر للمال\nبرج ١، الطابق ٢٥\nالخليج الغربي، الدوحة"
    },
    responsePromise: {
        title: "استجابة خلال ٢٤ ساعة",
        description: "يقوم فريقنا بالرد على جميع الاستفسارات خلال يوم عمل واحد. يتم إعطاء الأولوية للأمور العاجلة."
    },
    map: {
        sectionTitle: "تفضل بزيارتنا",
        headline: "مركز قطر للمال",
        description: "يقع مقرنا الرئيسي في قلب الخليج الغربي بالدوحة، ويوفر بيئة عالمية المستوى للمناقشات الاستراتيجية السرية.",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5176454881595!2d51.52084931501227!3d25.286106483863773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1cfa88cf2f0c6b1b!2sQatar%20Financial%20Centre!5e0!3m2!1sen!2sus!4v1639000000000!5m2!1sen!2sus"
    },
    regionalOffices: {
        sectionTitle: "التواجد العالمي",
        headline: "المكاتب الإقليمية"
    },
    faq: {
        sectionTitle: "أسئلة شائعة",
        headline: "الأسئلة المتكررة",
        items: [
            {
                question: "ما هو الحد الأدنى للأصول؟",
                answer: "بالنسبة لخدمات المكاتب العائلية، تبدأ الارتباطات من أصول قابلة للاستثمار بقيمة ٥٠ مليون دولار. خدمات تدقيق الحوكمة ليس لها حد أدنى للأصول."
            },
            {
                question: "هل تقدمون استشارات ضريبية أو قانونية؟",
                answer: "نحن نعمل جنباً إلى جنب مع فرقك القانونية والضريبية. وبينما نقدم مشورة هيكلية استراتيجية، فإننا لا نعمل كمستشار قانوني رسمي."
            },
            {
                question: "هل الاستشارات الافتراضية متاحة؟",
                answer: "نعم. نستخدم قنوات مشفرة وآمنة لجميع الإحاطات الافتراضية. ومع ذلك، نوصي بعقد جلسة اكتشاف أولية شخصياً."
            },
            {
                question: "كم تستغرق مدة الارتباط النموذجي؟",
                answer: "تمتد تدقيقات الحوكمة عادة من ٨ إلى ١٢ أسبوعاً. يتم هيكلة الارتباطات الاستشارية المستمرة سنوياً مع مراجعات ربع سنوية."
            }
        ]
    }
};

const settingsArabic = {
    companyName: "GovernValu",
    tagline: "استشارات الحوكمة والاستثمار",
    logo: {
        text: "G",
        fullText: "GovernValu"
    },
    footerBlurb: "حوكمة استراتيجية لاستثمارات مستدامة. شركة استشارات وحوكمة استثمارية تخدم منطقة الشرق الأوسط وشمال أفريقيا وخارجها.",
    contact: {
        phone: "+974 4412 3456",
        email: "info@governvalu.com",
        address: {
            line1: "مركز قطر للمال",
            line2: "برج ١، الطابق ٢٥",
            line3: "الخليج الغربي، الدوحة، قطر"
        },
        officeHours: "الأحد - الخميس، ٨:٠٠ ص - ٥:٠٠ م"
    },
    socialMedia: {
        linkedin: "https://linkedin.com/company/governvalu",
        twitter: "https://twitter.com/governvalu"
    },
    regionalOffices: [
        {
            city: "دبي",
            country: "الإمارات العربية المتحدة",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
            address: "قرية البوابة، مبنى ٥، مركز دبي المالي العالمي",
            email: "dubai@governvalu.com"
        },
        {
            city: "الرياض",
            country: "المملكة العربية السعودية",
            image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop",
            address: "مركز الملك عبدالله المالي",
            email: "riyadh@governvalu.com"
        },
        {
            city: "لندن",
            country: "المملكة المتحدة",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
            address: "١٤ شارع كرزون، مايفير",
            email: "london@governvalu.com"
        }
    ],
    footer: {
        copyright: "© ٢٠٢٥ GovernValu. جميع الحقوق محفوظة.",
        tagline: "الدقة في الحوكمة.",
        links: [
            {
                label: "سياسة الخصوصية",
                url: "/privacy"
            },
            {
                label: "شروط الخدمة",
                url: "/terms"
            }
        ]
    },
    seo: {
        defaultTitle: "GovernValu | استشارات الحوكمة والاستثمار - قطر",
        defaultDescription: "الشركة الرائدة في استشارات الحوكمة والاستثمار في قطر. مشورة استراتيجية لحوكمة الشركات، واستراتيجية الاستثمار، وتخفيف المخاطر، وخدمات المكاتب العائلية عبر دول مجلس التعاون الخليجي.",
        keywords: "حوكمة, استثمار, قطر, مجلس التعاون الخليجي, حوكمة الشركات, استراتيجية الاستثمار, تخفيف المخاطر, مكتب عائلي, استشارات, الدوحة"
    }
};

async function main() {
    console.log('Update Contact page (Arabic)...');
    await prisma.pageContent.upsert({
        where: { page_lang: { page: 'contact', lang: 'ar' } },
        update: { content: contactArabic },
        create: { page: 'contact', lang: 'ar', content: contactArabic }
    });

    console.log('Update Settings page (Arabic)...');
    await prisma.pageContent.upsert({
        where: { page_lang: { page: 'settings', lang: 'ar' } },
        update: { content: settingsArabic },
        create: { page: 'settings', lang: 'ar', content: settingsArabic }
    });

    console.log('Done.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
