const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// ============================================
// PHILOSOPHY PAGE CONTENT - Arabic
// ============================================
const philosophyArabic = {
    hero: {
        badge: "فلسفتنا",
        title: "الحوكمة الاستراتيجية من أجل",
        titleHighlight: "قيمة مستدامة.",
        subtitle: "مبادئنا توجه كل قرار، وكل توصية، وكل علاقة نبنيها."
    },
    coreBeliefs: {
        sectionTitle: "المعتقدات الأساسية",
        headline: "خلق قيمة مستدامة من خلال حوكمة رشيدة، واستراتيجية منضبطة، ونشر ذكي لرأس المال.",
        items: [
            {
                title: "الحوكمة الرشيدة",
                description: "نؤمن بأن خلق القيمة المستدامة يتحقق من خلال الحوكمة الرشيدة. الحوكمة ليست قيداً - بل هي أساس الحرية المؤسسية والنجاح طويل الأمد."
            },
            {
                title: "الاستراتيجية المنضبطة",
                description: "استراتيجياتنا مبنية على تحليل دقيق ومنهجيات منضبطة. نجمع بين الأطر الدولية (OECD, ISO, COSO, IFC) والرؤى المبنية على البيانات لتحقيق نتائج قابلة للقياس."
            },
            {
                title: "النشر الذكي لرأس المال",
                description: "نوجه المؤسسات نحو النشر الذكي لرأس المال، مع الموازنة بين أهداف النمو وإدارة المخاطر، وضمان الجاهزية الاستثمارية التي تجذب ثقة المستثمرين."
            }
        ]
    },
    quote: {
        text: "الحوكمة هي العمود الفقري لجميع أعمالنا الاستشارية - الأساس الذي تُبنى عليه المرونة المؤسسية والنمو المستدام.",
        source: "المبدأ الأساسي لـ GovernValu"
    },
    approach: {
        sectionTitle: "نهجنا",
        headline: "نموذج استشاري متكامل",
        paragraphs: [
            "يدمج مفهومنا الحوكمة والمخاطر والامتثال والتقييم وعلاقات الاستثمار وتحسين الأداء في نموذج استشاري متماسك واحد.",
            "نخدم الحكومات والشركات والمؤسسات المالية والمنظمات غير الحكومية والمنظمات الدولية بخدمات متوافقة مع المعايير الدولية.",
            "منهجياتنا مصممة لتناسب السياق التنظيمي والثقافي والاقتصادي لكل سوق نخدمه، مما يضمن توصيات ذات صلة وقابلة للتنفيذ."
        ],
        standards: [
            "معايير OECD للحوكمة",
            "أنظمة إدارة ISO",
            "إطار COSO للرقابة الداخلية",
            "منهجية IFC لحوكمة الشركات"
        ]
    },
    commitments: {
        sectionTitle: "التزاماتنا",
        headline: "ما نعد به",
        items: [
            { number: "٠١", title: "الاستقلالية", description: "مشورتنا خالية من تضارب المصالح. نقدم استشارات موضوعية تتماشى فقط مع نجاحك المؤسسي." },
            { number: "٠٢", title: "الشفافية", description: "نلتزم بالسلوك الأخلاقي في جميع أعمالنا الاستشارية. عملاؤنا يعرفون بالضبط كيف نصل إلى توصياتنا." },
            { number: "٠٣", title: "المساءلة", description: "تأثير قابل للقياس ومسؤولية. نقف وراء توصياتنا بنتائج واضحة وشراكة مستمرة." },
            { number: "٠٤", title: "التميز", description: "نسعى لأعلى معايير الدقة المهنية في كل تحليل، وكل توصية، وكل تفاعل." }
        ]
    },
    partnership: {
        sectionTitle: "شراكة العملاء",
        headline: "القيمة طويلة الأمد فوق المكاسب قصيرة الأجل",
        paragraphs: [
            "نؤمن بالشراكة طويلة الأمد مع العملاء بدلاً من الاستشارات المعاملاتية. نجاحنا يُقاس بالأثر الدائم الذي نخلقه للمؤسسات التي نخدمها.",
            "نلتزم بالريادة الإقليمية مع معايير عالمية، جامعين بين الفهم العميق لسوق الشرق الأوسط وشمال أفريقيا وأفضل الممارسات الدولية.",
            "بحلول عام ٢٠٣٠، نهدف لأن نكون من أكثر بيوت الاستشارات موثوقية في منطقة الشرق الأوسط وشمال أفريقيا، مقدمين حلولاً استشارية تعزز المرونة المؤسسية وثقة المستثمرين والنمو المستدام."
        ],
        coreValues: [
            { title: "النزاهة", description: "الاستقلالية والشفافية والسلوك الأخلاقي" },
            { title: "تميز الحوكمة", description: "العمود الفقري لجميع الأعمال الاستشارية" },
            { title: "الدقة المهنية", description: "منهجيات مبنية على الأدلة ومنضبطة" },
            { title: "المساءلة", description: "تأثير قابل للقياس ومسؤولية" },
            { title: "الابتكار المستمر", description: "تفكير تكيفي في عالم متغير" }
        ]
    },
    cta: {
        headline: "اختبر فلسفتنا",
        headlineHighlight: "مباشرة.",
        subtitle: "احجز استشارة لمناقشة كيف يمكن لمبادئنا أن توجه نجاحك.",
        buttonText: "تواصل معنا"
    }
};

// ============================================
// EXPERTISE PAGE CONTENT - Arabic
// ============================================
const expertiseArabic = {
    hero: {
        badge: "خبرتنا",
        title: "خدمات استشارية",
        titleHighlight: "متكاملة.",
        subtitle: "خدمات استشارية شاملة عبر الحوكمة وعلاقات الاستثمار والتقييم وإدارة المخاطر والامتثال وتحسين التكلفة والتطوير المؤسسي."
    },
    clientTypes: {
        label: "نخدم:",
        items: [
            { name: "الحكومات", icon: "🏛️" },
            { name: "الشركات", icon: "🏢" },
            { name: "المؤسسات المالية", icon: "🏦" },
            { name: "المنظمات غير الحكومية", icon: "🤝" },
            { name: "المنظمات الدولية", icon: "🌍" }
        ]
    },
    expertiseAreas: {
        sectionTitle: "مجالات التركيز",
        headline: "مجالات خدماتنا",
        items: [
            {
                title: "حوكمة الشركات",
                description: "تمكين المؤسسات من تصميم وتطبيق وترسيخ أطر الحوكمة. نقدم استشارات حوكمة شاملة متوافقة مع معايير OECD وISO وCOSO وIFC.",
                features: ["تصميم إطار الحوكمة", "هيكل وفعالية مجلس الإدارة", "تطوير السياسات", "الامتثال التنظيمي"]
            },
            {
                title: "علاقات الاستثمار",
                description: "تعزيز الجاهزية الاستثمارية وثقة المستثمرين من خلال التواصل الاستراتيجي مع المستثمرين ودمج ESG وتموضع أسواق المال.",
                features: ["استراتيجية علاقات المستثمرين", "دمج ESG", "استشارات أسواق المال", "إشراك أصحاب المصلحة"]
            },
            {
                title: "خدمات التقييم",
                description: "تقديم خدمات تقييم مستقلة للشركات والعلامات التجارية باستخدام منهجيات مبنية على البيانات. نوفر تقييمات موضوعية للمعاملات والتقارير والتخطيط الاستراتيجي.",
                features: ["تقييم الشركات", "تقييم العلامات التجارية", "دعم المعاملات", "تقييم القيمة العادلة"]
            },
            {
                title: "إدارة المخاطر والامتثال",
                description: "تعزيز إدارة المخاطر والامتثال وأنظمة الرقابة الداخلية. نساعد المؤسسات على بناء أطر مرنة تحمي من المخاطر التشغيلية والتنظيمية.",
                features: ["إدارة المخاطر المؤسسية", "برامج الامتثال", "أنظمة الرقابة الداخلية", "الاستشارات التنظيمية"]
            },
            {
                title: "تحسين التكلفة",
                description: "دعم تحسين التكلفة والكفاءة التشغيلية من خلال التحليل المنهجي وتنفيذ استراتيجيات خفض التكلفة المستدامة.",
                features: ["تحليل هيكل التكلفة", "الكفاءة التشغيلية", "تحسين العمليات", "إدارة الأداء"]
            },
            {
                title: "التطوير المؤسسي",
                description: "بناء القيادة والقدرات المؤسسية من خلال التدريب وإدارة التغيير. ندعم مبادرات التحول الرقمي واعتماد الجودة.",
                features: ["تطوير القيادة", "إدارة التغيير", "التحول الرقمي", "اعتماد الجودة"]
            }
        ]
    },
    standards: {
        sectionTitle: "المعايير الدولية",
        headline: "توافقنا مع الأطر",
        items: [
            { name: "OECD", description: "مبادئ حوكمة الشركات" },
            { name: "ISO", description: "معايير نظم الإدارة" },
            { name: "COSO", description: "إطار الرقابة الداخلية" },
            { name: "IFC", description: "منهجية حوكمة الشركات" }
        ]
    },
    process: {
        sectionTitle: "عمليتنا",
        headline: "كيف نعمل",
        steps: [
            { number: "١", title: "الاكتشاف", description: "فهم عميق لأهدافك والسياق التنظيمي والتحديات المؤسسية." },
            { number: "٢", title: "التحليل", description: "تقييم دقيق باستخدام منهجيات مبنية على البيانات ومعايير مرجعية دولية." },
            { number: "٣", title: "الاستراتيجية", description: "تطوير توصيات مخصصة متوافقة مع المعايير الدولية." },
            { number: "٤", title: "الشراكة", description: "شراكة طويلة الأمد من خلال التنفيذ والمتابعة والتحسين المستمر." }
        ]
    },
    cta: {
        headline: "مستعد للاستفادة من",
        headlineHighlight: "خبرتنا",
        subtitle: "دعنا نوضح كيف يمكن لقدراتنا معالجة تحدياتك المؤسسية المحددة.",
        buttonText: "ابدأ محادثة"
    }
};

// ============================================
// TEAMS PAGE CONTENT - Arabic
// ============================================
const teamsArabic = {
    hero: {
        badge: "فريقنا",
        title: "مستشارون",
        titleHighlight: "خبراء.",
        subtitle: "يجمع فريقنا بين الخبرة العميقة في الحوكمة والاستثمار والتطوير المؤسسي مع الالتزام بالنزاهة المهنية."
    },
    culture: {
        sectionTitle: "ثقافتنا",
        headline: "مبني على التميز. مدفوع بالهدف.",
        paragraphs: [
            "في GovernValu، نؤمن بأن النتائج الاستثنائية تتطلب أشخاصاً استثنائيين. فريقنا متحد بالتزام مشترك بالنزاهة والدقة المهنية ونجاح العملاء.",
            "نعزز بيئة تُقدَّر فيها وجهات النظر المتنوعة، ويُشجَّع التعلم المستمر، ويكون التعاون هو القاعدة. كل عضو في فريقنا يجلب خبرة فريدة تعزز قدرتنا الجماعية.",
            "يجمع مستشارونا بين الخبرة الدولية والفهم العميق للسياق التنظيمي والثقافي والاقتصادي لمنطقة الشرق الأوسط وشمال أفريقيا."
        ]
    },
    coreValues: {
        sectionTitle: "قيمنا",
        headline: "ما يوجهنا",
        items: [
            { title: "النزاهة", description: "نلتزم بالاستقلالية والشفافية والسلوك الأخلاقي." },
            { title: "تميز الحوكمة", description: "الحوكمة هي العمود الفقري لجميع أعمالنا الاستشارية." },
            { title: "الدقة المهنية", description: "تحليل مبني على الأدلة ومنهجيات منضبطة." },
            { title: "شراكة العملاء", description: "القيمة طويلة الأمد فوق المكاسب قصيرة الأجل." },
            { title: "المساءلة", description: "تأثير قابل للقياس ومسؤولية." },
            { title: "الابتكار المستمر", description: "تفكير تكيفي في بيئة عالمية متغيرة." }
        ]
    },
    capabilities: {
        sectionTitle: "مجالات الخبرة",
        headline: "قدرات الفريق",
        items: [
            { title: "الحوكمة والامتثال", description: "خبراء في حوكمة الشركات وإدارة المخاطر وأطر الامتثال التنظيمي." },
            { title: "الاستثمار والتقييم", description: "متخصصون في علاقات الاستثمار وتقييم الشركات واستشارات أسواق المال." },
            { title: "التطوير المؤسسي", description: "محترفون في تطوير القيادة وإدارة التغيير والتحول المؤسسي." }
        ]
    },
    regionalFocus: {
        sectionTitle: "القيادة الإقليمية",
        headline: "معايير عالمية، خبرة إقليمية",
        paragraphs: [
            "يجمع فريقنا بين أفضل الممارسات الدولية والفهم العميق للمشهد التنظيمي والثقافي والاقتصادي الفريد لمنطقة الشرق الأوسط وشمال أفريقيا.",
            "نخدم الحكومات والشركات والمؤسسات المالية والمنظمات غير الحكومية والمنظمات الدولية بخدمات استشارية مصممة لسياق كل سوق."
        ],
        stats: [
            { value: "2016", label: "تأسست في تركيا" },
            { value: "MENA", label: "التركيز الإقليمي" }
        ]
    },
    careers: {
        sectionTitle: "الوظائف",
        headline: "انضم إلى فريقنا",
        description: "نبحث دائماً عن أفراد استثنائيين يشاركوننا التزامنا بتميز الحوكمة والنزاهة المهنية. إذا كنت شغوفاً بإحداث تأثير ذي معنى على التطوير المؤسسي، يسعدنا أن نسمع منك.",
        buttonText: "استكشف الفرص",
        qualificationsTitle: "ما نبحث عنه",
        qualifications: [
            "خبرة في الحوكمة أو الامتثال أو إدارة المخاطر أو التقييم",
            "فهم المعايير الدولية (OECD, ISO, COSO, IFC)",
            "خبرة في البيئة التنظيمية والتجارية لمنطقة الشرق الأوسط وشمال أفريقيا",
            "التزام بالنزاهة المهنية والسلوك الأخلاقي",
            "عقلية تحليلية مبنية على البيانات"
        ]
    }
};

const philosophyEnglish = {
    hero: { badge: 'Our Philosophy', title: 'Strategic Governance for', titleHighlight: 'Sustainable Value.', subtitle: 'Our principles guide every decision, every recommendation, every relationship we build.' },
    coreBeliefs: {
        sectionTitle: 'Core Beliefs',
        headline: 'Sustainable value creation through sound governance, disciplined strategy, and intelligent capital deployment.',
        items: [
            { title: 'Sound Governance', description: 'We believe that sustainable value creation is achieved through sound governance. Governance is not a constraint—it is the foundation of institutional freedom and long-term success.' },
            { title: 'Disciplined Strategy', description: 'Our strategies are built on rigorous analysis and disciplined methodologies. We combine international frameworks (OECD, ISO, COSO, IFC) with data-driven insights to deliver measurable outcomes.' },
            { title: 'Intelligent Capital Deployment', description: 'We guide institutions toward intelligent capital deployment, balancing growth objectives with risk management and ensuring investment readiness that attracts investor confidence.' }
        ]
    },
    quote: { text: 'Governance is the backbone of all our advisory work—the foundation upon which institutional resilience and sustainable growth are built.', source: 'GovernValu Core Principle' },
    approach: {
        sectionTitle: 'Our Approach',
        headline: 'Integrated Advisory Model',
        paragraphs: ['Our concept integrates governance, risk, compliance, valuation, investment relations, and performance optimization into one coherent advisory model.', 'We serve governments, corporates, financial institutions, NGOs, and international organizations with services delivered in alignment with international standards.', 'Our methodologies are tailored to the regulatory, cultural, and economic context of each market we serve, ensuring relevant and actionable recommendations.'],
        standards: ['OECD Governance Standards', 'ISO Management Systems', 'COSO Internal Control Framework', 'IFC Corporate Governance Methodology']
    },
    commitments: {
        sectionTitle: 'Our Commitments',
        headline: 'What We Promise',
        items: [
            { number: '01', title: 'Independence', description: 'Our advice is free from conflicts of interest. We provide objective counsel aligned solely with your institutional success.' },
            { number: '02', title: 'Transparency', description: 'We uphold ethical conduct in all our advisory work. Our clients know exactly how we arrive at our recommendations.' },
            { number: '03', title: 'Accountability', description: 'Measurable impact and responsibility. We stand behind our recommendations with clear outcomes and ongoing partnership.' },
            { number: '04', title: 'Excellence', description: 'We pursue the highest standards of professional rigor in every analysis, every recommendation, every interaction.' }
        ]
    },
    partnership: {
        sectionTitle: 'Client Partnership',
        headline: 'Long-term Value Over Short-term Gains',
        paragraphs: ['We believe in long-term partnership with clients rather than transactional consulting. Our success is measured by the lasting impact we create for the institutions we serve.', 'We are committed to regional leadership with global standards, combining deep understanding of the MENA market with international best practices.', 'By 2030, we aim to be among the most trusted consulting houses in the MENA region, delivering advisory solutions that enhance institutional resilience, investor confidence, and sustainable growth.'],
        coreValues: [{ title: 'Integrity', description: 'Independence, transparency, ethical conduct' }, { title: 'Governance Excellence', description: 'The backbone of all advisory work' }, { title: 'Professional Rigor', description: 'Evidence-based, disciplined methodologies' }, { title: 'Accountability', description: 'Measurable impact and responsibility' }, { title: 'Continuous Innovation', description: 'Adaptive thinking in a changing world' }]
    },
    cta: { headline: 'Experience our philosophy', headlineHighlight: 'firsthand.', subtitle: 'Schedule a consultation to discuss how our principles can guide your success.', buttonText: 'Get in Touch' }
};

const expertiseEnglish = {
    hero: { badge: 'Our Expertise', title: 'Integrated Advisory', titleHighlight: 'Services.', subtitle: 'Comprehensive advisory services across governance, investment relations, valuation, risk management, compliance, cost optimization, and institutional development.' },
    clientTypes: { label: 'We Serve:', items: [{ name: 'Governments', icon: '🏛️' }, { name: 'Corporates', icon: '🏢' }, { name: 'Financial Institutions', icon: '🏦' }, { name: 'NGOs', icon: '🤝' }, { name: 'International Organizations', icon: '🌍' }] },
    expertiseAreas: {
        sectionTitle: 'Areas of Focus', headline: 'Our Service Areas', items: [
            { title: 'Corporate Governance', description: 'Enable institutions to design, implement, and institutionalize governance frameworks.', features: ['Governance Framework Design', 'Board Structure & Effectiveness', 'Policy Development', 'Regulatory Compliance'] },
            { title: 'Investment Relations', description: 'Enhance investment readiness and investor confidence through strategic investor communication.', features: ['Investor Relations Strategy', 'ESG Integration', 'Capital Markets Advisory', 'Stakeholder Engagement'] },
            { title: 'Valuation Services', description: 'Deliver independent corporate and brand valuation services using data-driven methodologies.', features: ['Corporate Valuation', 'Brand Valuation', 'Transaction Support', 'Fair Value Assessment'] },
            { title: 'Risk Management & Compliance', description: 'Strengthen risk management, compliance, and internal control systems.', features: ['Enterprise Risk Management', 'Compliance Programs', 'Internal Control Systems', 'Regulatory Advisory'] },
            { title: 'Cost Optimization', description: 'Support cost optimization and operational efficiency through systematic analysis.', features: ['Cost Structure Analysis', 'Operational Efficiency', 'Process Optimization', 'Performance Management'] },
            { title: 'Institutional Development', description: 'Build leadership and institutional capabilities through training and change management.', features: ['Leadership Development', 'Change Management', 'Digital Transformation', 'Quality Accreditation'] }
        ]
    },
    standards: { sectionTitle: 'International Standards', headline: 'Our Framework Alignment', items: [{ name: 'OECD', description: 'Corporate Governance Principles' }, { name: 'ISO', description: 'Management System Standards' }, { name: 'COSO', description: 'Internal Control Framework' }, { name: 'IFC', description: 'Corporate Governance Methodology' }] },
    process: { sectionTitle: 'Our Process', headline: 'How We Work', steps: [{ number: '1', title: 'Discovery', description: 'Deep understanding of your objectives, regulatory context, and institutional challenges.' }, { number: '2', title: 'Analysis', description: 'Rigorous assessment using data-driven methodologies and international benchmarks.' }, { number: '3', title: 'Strategy', description: 'Development of tailored recommendations aligned with international standards.' }, { number: '4', title: 'Partnership', description: 'Long-term partnership through implementation, monitoring, and continuous improvement.' }] },
    cta: { headline: 'Ready to leverage our', headlineHighlight: 'expertise', subtitle: 'Let us demonstrate how our capabilities can address your specific institutional challenges.', buttonText: 'Start a Conversation' }
};

const teamsEnglish = {
    hero: { badge: 'Our Team', title: 'Expert', titleHighlight: 'Advisors.', subtitle: 'Our team combines deep expertise in governance, investment, and institutional development with a commitment to professional integrity.' },
    culture: { sectionTitle: 'Our Culture', headline: 'Built on Excellence. Driven by Purpose.', paragraphs: ['At GovernValu, we believe that exceptional outcomes require exceptional people.', 'We foster an environment where diverse perspectives are valued, continuous learning is encouraged, and collaboration is the norm.', 'Our advisors combine international expertise with deep understanding of the MENA region.'] },
    coreValues: { sectionTitle: 'Our Values', headline: 'What Guides Us', items: [{ title: 'Integrity', description: 'We uphold independence, transparency, and ethical conduct.' }, { title: 'Governance Excellence', description: 'Governance is the backbone of all our advisory work.' }, { title: 'Professional Rigor', description: 'Evidence-based analysis and disciplined methodologies.' }, { title: 'Client Partnership', description: 'Long-term value over short-term gains.' }, { title: 'Accountability', description: 'Measurable impact and responsibility.' }, { title: 'Continuous Innovation', description: 'Adaptive thinking in a changing global environment.' }] },
    capabilities: { sectionTitle: 'Expertise Areas', headline: 'Our Team Capabilities', items: [{ title: 'Governance & Compliance', description: 'Experts in corporate governance, risk management, and regulatory compliance frameworks.' }, { title: 'Investment & Valuation', description: 'Specialists in investment relations, corporate valuation, and capital markets advisory.' }, { title: 'Institutional Development', description: 'Professionals in leadership development, change management, and organizational transformation.' }] },
    regionalFocus: { sectionTitle: 'Regional Leadership', headline: 'Global Standards, Regional Expertise', paragraphs: ['Our team combines international best practices with deep understanding of the MENA region.', 'We serve governments, corporates, financial institutions, NGOs, and international organizations.'], stats: [{ value: '2016', label: 'Founded in Türkiye' }, { value: 'MENA', label: 'Regional Focus' }] },
    careers: { sectionTitle: 'Careers', headline: 'Join Our Team', description: 'We are always looking for exceptional individuals who share our commitment to governance excellence and professional integrity.', buttonText: 'Explore Opportunities', qualificationsTitle: 'What We Look For', qualifications: ['Expertise in governance, compliance, risk management, or valuation', 'Understanding of international standards (OECD, ISO, COSO, IFC)', 'Experience in the MENA region regulatory and business environment', 'Commitment to professional integrity and ethical conduct', 'Data-driven and analytical mindset'] }
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
    console.log('--- Writing Content to DB and Files ---');

    // Philosophy
    console.log('Processing Philosophy...');
    await prisma.pageContent.upsert({ where: { page_lang: { page: 'philosophy', lang: 'ar' } }, update: { content: philosophyArabic }, create: { page: 'philosophy', lang: 'ar', content: philosophyArabic } });
    await saveFile('philosophy', 'ar', philosophyArabic);

    await prisma.pageContent.upsert({ where: { page_lang: { page: 'philosophy', lang: 'en' } }, update: { content: philosophyEnglish }, create: { page: 'philosophy', lang: 'en', content: philosophyEnglish } });
    await saveFile('philosophy', 'en', philosophyEnglish);

    // Expertise
    console.log('Processing Expertise...');
    await prisma.pageContent.upsert({ where: { page_lang: { page: 'expertise', lang: 'ar' } }, update: { content: expertiseArabic }, create: { page: 'expertise', lang: 'ar', content: expertiseArabic } });
    await saveFile('expertise', 'ar', expertiseArabic);

    await prisma.pageContent.upsert({ where: { page_lang: { page: 'expertise', lang: 'en' } }, update: { content: expertiseEnglish }, create: { page: 'expertise', lang: 'en', content: expertiseEnglish } });
    await saveFile('expertise', 'en', expertiseEnglish);

    // Teams
    console.log('Processing Teams...');
    await prisma.pageContent.upsert({ where: { page_lang: { page: 'teams', lang: 'ar' } }, update: { content: teamsArabic }, create: { page: 'teams', lang: 'ar', content: teamsArabic } });
    await saveFile('teams', 'ar', teamsArabic);

    await prisma.pageContent.upsert({ where: { page_lang: { page: 'teams', lang: 'en' } }, update: { content: teamsEnglish }, create: { page: 'teams', lang: 'en', content: teamsEnglish } });
    await saveFile('teams', 'en', teamsEnglish);

    console.log('Done updating About pages content (DB + Files)!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
