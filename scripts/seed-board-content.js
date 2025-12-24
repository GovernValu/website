
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const englishContent = {
    "hero": {
        "badge": "Leadership",
        "title": "Board of Directors.",
        "subtitle": "Meet the distinguished leadership team driving our commitment to governance excellence."
    },
    "chairmanMessage": {
        "badge": "Chairman's Message",
        "title": "A Word from Our Chairman",
        "intro": "Firstly, I would like to express my sincere gratitude to all our current and future clients, and I am honored to introduce our company according to the following concepts:",
        "quote": "At GovernValu, we believe that governance is not a regulatory burden, but a strategic enabler of value, trust, and sustainability.",
        "body": [
            "We believe that we are a governance-first investment advisory firm, not just a consulting provider.",
            "Our firm was established to bridge the gap between international best practices and regional realities, offering advisory solutions that are practical, credible, and impact-driven.",
            "We are committed to working with our clients as trusted advisors, supporting them in navigating complexity, managing risk, and unlocking sustainable growth."
        ],
        "signature": {
            "name": "Prof. Dr. Samir Abdelaziz",
            "role": "Board Chairman"
        }
    },
    "quoteSection": {
        "text": "Governance is not a regulatory burden, but a strategic enabler of value, trust, and sustainability.",
        "author": "Prof. Dr. Samir Abdelaziz"
    },
    "boardMembers": {
        "badge": "Board of Directors",
        "title": "Our Distinguished Board Members",
        "list": [
            {
                "name": "Prof. Dr. Samir Abdelaziz, PhD",
                "role": "Board Chairman",
                "specialty": "Governance & Investment",
                "image": "/board/chairman.jpg"
            },
            {
                "name": "Prof. Dr. Ehab El Shamy, PhD",
                "role": "Board Member",
                "specialty": "Banking & Finance",
                "image": "/board/ehab-el-shamy.jpeg"
            },
            {
                "name": "Mr. Ahmed Al Bana",
                "role": "Board Member",
                "specialty": "Investment & Valuation",
                "image": "/board/ahmed-al-bana.jpeg"
            },
            {
                "name": "Dr. Saad Azm, PhD",
                "role": "Board Member",
                "specialty": "Accreditation & Quality",
                "image": "/board/saad-azm.jpg"
            },
            {
                "name": "Prof. Dr. Habib Hamam, PhD",
                "role": "Board Member",
                "specialty": "Digital Transformation",
                "image": "/board/habib-hamam.jpg"
            },
            {
                "name": "Dr. Yasser Fathy, PhD",
                "role": "Board Member",
                "specialty": "Analysis, Reputation Management, and Development",
                "image": "/board/yasser-fathy.jpg"
            },
            {
                "name": "Mr. Saleh Ghalayeni",
                "role": "Board Member",
                "specialty": "Business Development",
                "image": "/board/saleh-ghalayeni.jpg"
            }
        ]
    },
    "principles": {
        "badge": "Our Commitment",
        "title": "Leadership Principles",
        "items": [
            {
                "title": "Governance-First Approach",
                "description": "We are a governance-first investment advisory firm, placing governance at the center of all our advisory work."
            },
            {
                "title": "Bridging Best Practices",
                "description": "We bridge international best practices with regional realities, offering practical and credible solutions."
            },
            {
                "title": "Trusted Partnership",
                "description": "We are committed to working as trusted advisors, supporting clients through complexity toward sustainable growth."
            }
        ]
    },
    "cta": {
        "title": "Ready to partner with us?",
        "subtitle": "Let us support you in navigating complexity and unlocking sustainable growth.",
        "buttonText": "Contact Us",
        "buttonLink": "/contact"
    }
};

const arabicContent = {
    "hero": {
        "badge": "القيادة",
        "title": "مجلس الإدارة.",
        "subtitle": "تعرف على فريق القيادة المتميز الذي يقود التزامنا بتميز الحوكمة."
    },
    "chairmanMessage": {
        "badge": "كلمة رئيس مجلس الإدارة",
        "title": "كلمة من رئيس مجلس الإدارة",
        "intro": "بداية، أود أن أعبّر عن خالص امتناني لجميع عملائنا الحاليين والمستقبليين، وأتشرف بأن أتناول شركتنا وفق المفاهيم التالية:",
        "quote": "نؤمن في GovernValu بأن الحوكمة ليست عبئًا تنظيميًا، بل أداة استراتيجية لتعظيم القيمة، وبناء الثقة، وتحقيق الاستدامة.",
        "body": [
            "نحن نؤمن بأننا شركة استشارية استثمارية تركز على الحوكمة أولاً، وليس مجرد مزود خدمات استشارية.",
            "تأسست الشركة لسد الفجوة بين أفضل الممارسات العالمية وواقع المؤسسات في المنطقة، عبر حلول استشارية عملية، ومهنية، وقائمة على الأثر.",
            "نلتزم بالعمل كشركاء موثوقين لعملائنا، لمساعدتهم على إدارة التعقيد، وتقليل المخاطر، وتحقيق نمو مستدام."
        ],
        "signature": {
            "name": "أ. د. سمير عبد العزيز",
            "role": "رئيس مجلس الإدارة"
        }
    },
    "quoteSection": {
        "text": "نؤمن بأن الحوكمة ليست عبئًا تنظيميًا، بل أداة استراتيجية لتعظيم القيمة، وبناء الثقة، وتحقيق الاستدامة.",
        "author": "أ. د. سمير عبد العزيز"
    },
    "boardMembers": {
        "badge": "مجلس الإدارة",
        "title": "أعضاء مجلس الإدارة المتميزون",
        "list": [
            {
                "name": "أ. د. سمير عبد العزيز",
                "role": "رئيس مجلس الإدارة",
                "specialty": "الحوكمة والاستثمار",
                "image": "/board/chairman.jpg"
            },
            {
                "name": "أ. د. إيهاب الشامي",
                "role": "عضو مجلس الإدارة",
                "specialty": "الصيرفة والتمويل",
                "image": "/board/ehab-el-shamy.jpeg"
            },
            {
                "name": "السيد أحمد البنا",
                "role": "عضو مجلس الإدارة",
                "specialty": "الاستثمار والتقييم",
                "image": "/board/ahmed-al-bana.jpeg"
            },
            {
                "name": "د. سعد عظم",
                "role": "عضو مجلس الإدارة",
                "specialty": "الاعتماد والجودة",
                "image": "/board/saad-azm.jpg"
            },
            {
                "name": "أ. د. حبيب همام",
                "role": "عضو مجلس الإدارة",
                "specialty": "التحول الرقمي",
                "image": "/board/habib-hamam.jpg"
            },
            {
                "name": "د. ياسر فتحي",
                "role": "عضو مجلس الإدارة",
                "specialty": "إدارة السمعة والتطوير",
                "image": "/board/yasser-fathy.jpg"
            },
            {
                "name": "السيد صالح غلاييني",
                "role": "عضو مجلس الإدارة",
                "specialty": "تطوير الأعمال",
                "image": "/board/saleh-ghalayeni.jpg"
            }
        ]
    },
    "principles": {
        "badge": "التزامنا",
        "title": "مبادئ القيادة",
        "items": [
            {
                "title": "نهج الحوكمة أولاً",
                "description": "نحن شركة استشارات استثمارية تركز على الحوكمة أولاً، ونضع الحوكمة في قلب جميع أعمالنا الاستشارية."
            },
            {
                "title": "جسر أفضل الممارسات",
                "description": "نسد الفجوة بين أفضل الممارسات الدولية والواقع الإقليمي، ونقدم حلولاً عملية وموثوقة."
            },
            {
                "title": "شراكة موثوقة",
                "description": "نلتزم بالعمل كمستشارين موثوقين، وندعم العملاء من خلال التعقيد نحو النمو المستدام."
            }
        ]
    },
    "cta": {
        "title": "مستعد للشراكة معنا؟",
        "subtitle": "دعنا ندعمك في إدارة التعقيد وتحقيق النمو المستدام.",
        "buttonText": "تواصل معنا",
        "buttonLink": "/contact"
    }
};

async function seedBoardContent() {
    console.log('Seeding Board page content...');

    // Seed English
    await prisma.pageContent.upsert({
        where: { page_lang: { page: 'board', lang: 'en' } },
        update: { content: englishContent },
        create: { page: 'board', lang: 'en', content: englishContent }
    });
    console.log('✓ Seeded English Board content');

    // Seed Arabic
    await prisma.pageContent.upsert({
        where: { page_lang: { page: 'board', lang: 'ar' } },
        update: { content: arabicContent },
        create: { page: 'board', lang: 'ar', content: arabicContent }
    });
    console.log('✓ Seeded Arabic Board content');
}

seedBoardContent()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
