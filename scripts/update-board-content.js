const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const boardEnglish = {
    hero: {
        badge: "Leadership",
        title: "Board of Directors",
        subtitle: "Guiding our strategic vision with integrity and expertise."
    },
    chairmanMessage: {
        badge: "Chairman's Message",
        title: "A Message from our Chairman",
        intro: "Welcome to GovernValu. We are committed to setting the highest standards of governance.",
        quote: "True leadership is about serving the institution and ensuring its long-term sustainability.",
        body: [
            "Our board is dedicated to overseeing the strategic direction of the company.",
            "We believe in transparency, accountability, and ethical conduct in all our operations."
        ],
        signature: {
            name: "Dr. Ahmed Al-Farsi",
            role: "Chairman of the Board"
        }
    },
    quoteSection: {
        text: "Governance is not just a set of rules; it is a culture of integrity.",
        author: "Board Vision"
    },
    boardMembers: {
        badge: "Our Board",
        title: "Meet the Directors",
        list: [
            {
                name: "Dr. Ahmed Al-Farsi",
                role: "Chairman",
                specialty: "Corporate Governance & Strategy",
                image: "/board/chairman.jpg"
            },
            {
                name: "Sarah Johnson",
                role: "Independent Director",
                specialty: "Risk Management & Finance",
                image: "/board/member1.jpg"
            },
            {
                name: "Michael Chen",
                role: "Non-Executive Director",
                specialty: "International Markets",
                image: "/board/member2.jpg"
            }
        ]
    },
    principles: {
        badge: "Principles",
        title: "Our Guiding Principles",
        items: [
            { title: "Integrity", description: "Acting with honesty and strong moral principles." },
            { title: "Accountability", description: "Taking responsibility for our actions and decisions." },
            { title: "Transparency", description: "Being open and clear about our operations." }
        ]
    },
    cta: {
        title: "Join us in our journey",
        subtitle: "Learn more about our governance practices.",
        buttonText: "Contact Us",
        buttonLink: "/contact"
    }
};

const boardArabic = {
    hero: {
        badge: "القيادة",
        title: "مجلس الإدارة",
        subtitle: "توجيه رؤيتنا الاستراتيجية بنزاهة وخبرة."
    },
    chairmanMessage: {
        badge: "رسالة الرئيس",
        title: "رسالة من رئيس مجلس الإدارة",
        intro: "مرحباً بكم في GovernValu. نحن ملتزمون بوضع أعلى معايير الحوكمة.",
        quote: "القيادة الحقيقية تدور حول خدمة المؤسسة وضمان استدامتها على المدى الطويل.",
        body: [
            "يكرس مجلس إدارتنا جهوده للإشراف على التوجه الاستراتيجي للشركة.",
            "نؤمن بالشفافية والمساءلة والسلوك الأخلاقي في جميع عملياتنا."
        ],
        signature: {
            name: "د. أحمد الفارسي",
            role: "رئيس مجلس الإدارة"
        }
    },
    quoteSection: {
        text: "الحوكمة ليست مجرد مجموعة من القواعد؛ إنها ثقافة النزاهة.",
        author: "رؤية المجلس"
    },
    boardMembers: {
        badge: "مجلسنا",
        title: "تعرف على الأعضاء",
        list: [
            {
                name: "د. أحمد الفارسي",
                role: "رئيس مجلس الإدارة",
                specialty: "حوكمة الشركات والاستراتيجية",
                image: "/board/chairman.jpg"
            },
            {
                name: "سارة جونسون",
                role: "عضو مستقل",
                specialty: "إدارة المخاطر والمالية",
                image: "/board/member1.jpg"
            },
            {
                name: "مايكل تشن",
                role: "عضو غير تنفيذي",
                specialty: "الأسواق الدولية",
                image: "/board/member2.jpg"
            }
        ]
    },
    principles: {
        badge: "المبادئ",
        title: "مبادئنا التوجيهية",
        items: [
            { title: "النزاهة", description: "التصرف بصدق ومبادئ أخلاقية قوية." },
            { title: "المساءلة", description: "تحمل المسؤولية عن أفعالنا وقراراتنا." },
            { title: "الشفافية", description: "أن نكون منفتحين وواضحين بشأن عملياتنا." }
        ]
    },
    cta: {
        title: "انضم إلينا في رحلتنا",
        subtitle: "تعرف على المزيد حول ممارسات الحوكمة لدينا.",
        buttonText: "تواصل معنا",
        buttonLink: "/contact"
    }
};

async function saveFile(page, lang, content) {
    const dir = path.join(__dirname, '..', 'content', lang);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${page}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Saved file: ${filePath}`);
}

async function main() {
    console.log('--- Writing Board Content to DB and Files ---');

    // Board English
    await prisma.pageContent.upsert({ where: { page_lang: { page: 'board', lang: 'en' } }, update: { content: boardEnglish }, create: { page: 'board', lang: 'en', content: boardEnglish } });
    await saveFile('board', 'en', boardEnglish);

    // Board Arabic
    await prisma.pageContent.upsert({ where: { page_lang: { page: 'board', lang: 'ar' } }, update: { content: boardArabic }, create: { page: 'board', lang: 'ar', content: boardArabic } });
    await saveFile('board', 'ar', boardArabic);

    console.log('Done updating Board content!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
