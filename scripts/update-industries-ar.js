const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start updating Arabic Industries content...');

    const arabicContent = {
        hero: {
            title: "خبرة في",
            titleHighlight: "القطاعات.",
            subtitle: "معرفة عميقة بالصناعة ممزوجة بتميز الحوكمة. نحن نتفهم التحديات الفريدة لكل قطاع عبر دول مجلس التعاون الخليجي."
        },
        intro: {
            sectionTitle: "التركيز القطاعي",
            description: "كل صناعة تعمل ضمن إطار تنظيمي خاص، وديناميكيات سوق، وتوقعات أصحاب مصلحة فريدة. تضمن خبرتنا القطاعية حلولاً تناسب احتياجاتكم بدقة."
        },
        industries: [
            {
                slug: "banking-finance",
                title: "الخدمات المصرفية والمالية",
                description: "التنقل عبر التعقيدات التنظيمية وقيادة التحول في الخدمات المالية.",
                image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=2574&auto=format&fit=crop",
                stats: {
                    clients: "15+",
                    assets: "$4B+"
                }
            },
            {
                slug: "real-estate",
                title: "العقارات والتطوير",
                description: "حوكمة استراتيجية للمحافظ العقارية ومشاريع التطوير عبر المنطقة.",
                image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "20+",
                    assets: "$2B+"
                }
            },
            {
                slug: "energy-utilities",
                title: "الطاقة والمرافق",
                description: "دعم تحول الطاقة بحوكمة قوية وأطر استثمار استراتيجية.",
                image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "8+",
                    assets: "$1.5B+"
                }
            },
            {
                slug: "sovereign-wealth",
                title: "صناديق الثروة السيادية",
                description: "تقديم المشورة لكيانات الاستثمار السيادية حول تميز الحوكمة والعوائد المستدامة.",
                image: "https://images.unsplash.com/photo-1526304640581-d334cdbbe462?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "5+",
                    assets: "$8B+"
                }
            },
            {
                slug: "family-enterprises",
                title: "الشركات العائلية",
                description: "الحفاظ على الإرث مع إضفاء الطابع الاحترافي على الحوكمة لنجاح متعدد الأجيال.",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "25+",
                    assets: "$3B+"
                }
            },
            {
                slug: "healthcare",
                title: "الرعاية الصحية وعلوم الحياة",
                description: "أطر حوكمة لمنظمات الرعاية الصحية التي تواجه الابتكار السريع والتنظيمات.",
                image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop",
                stats: {
                    clients: "10+",
                    assets: "$500M+"
                }
            },
            {
                slug: "technology",
                title: "التكنولوجيا والابتكار",
                description: "تمكين شركات التقنية من التوسع بحوكمة تدعم النمو السريع.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "12+",
                    assets: "$800M+"
                }
            },
            {
                slug: "hospitality-tourism",
                title: "الضيافة والسياحة",
                description: "استشارات استراتيجية لقطاع الضيافة المتنامي في قطر بما يتماشى مع رؤية 2030.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
                stats: {
                    clients: "8+",
                    assets: "$600M+"
                }
            }
        ],
        stats: [
            {
                value: "8+",
                label: "قطاعات مخدومة"
            },
            {
                value: "100+",
                label: "ارتباطات قطاعية"
            },
            {
                value: "$20B+",
                label: "أصول قطاعية تحت الاستشارة"
            },
            {
                value: "GCC",
                label: "تغطية إقليمية"
            }
        ],
        cta: {
            headline: "أي قطاع هو",
            headlineHighlight: "تركيزك؟",
            subtitle: "دعنا نوضح كيف يمكن لخبرتنا الصناعية معالجة تحديات الحوكمة والاستثمار الخاصة بك.",
            buttonText: "ابدأ محادثة",
            buttonLink: "/contact"
        }
    };

    try {
        const page = await prisma.pageContent.upsert({
            where: {
                page_lang: {
                    page: 'industries',
                    lang: 'ar'
                }
            },
            update: {
                content: arabicContent
            },
            create: {
                page: 'industries',
                lang: 'ar',
                content: arabicContent
            }
        });

        console.log(`Updated Arabic content for page: ${page.page}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
