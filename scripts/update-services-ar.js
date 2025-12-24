
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const arabicServices = [
    {
        "slug": "corporate-governance",
        "title": "بناء وتطبيق وتمكين نظم الحوكمة",
        "tagline": "حوكمة الشركات",
        "shortDescription": "بناء وتأسيس نظم الحوكمة وفق المعايير والمبادئ الدولية والمحلية.",
        "icon": "building",
        "heroImage": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
        "description": "بناء وتأسيس نظم الحوكمة وفق المعايير والمبادئ الدولية والمحلية، مع التركيز على تأهيل المؤسسات وتمكينها من التطبيق الاحترافي.",
        "longDescription": [
            "نقدم خدمات شاملة لبناء وتأسيس نظم الحوكمة وفق المعايير والمبادئ الدولية والمحلية، مع التركيز على تأهيل المؤسسات وتمكينها من التطبيق الاحترافي.",
            "يشمل ذلك إعداد التقارير الدورية وغير الدورية للحوكمة لضمان الشفافية والمساءلة."
        ],
        "capabilities": [
            { "title": "بناء وتأسيس نظم الحوكمة", "description": "وفق المعايير والمبادئ الدولية، والمحلية بكل بلد، ووفق أفضل الممارسات." },
            { "title": "تأهيل المؤسسات", "description": "لاستقبال نظم الحوكمة مع التدريب على التطبيق الرشيد ونشر ثقافة الحوكمة الرشيدة." },
            { "title": "تمكين وتمتين نظم الحوكمة", "description": "في التطبيق الاحترافي لضمان الفعالية والاستدامة." },
            { "title": "إعداد التقارير", "description": "التقارير الدورية وغير الدورية للحوكمة لمجلس الإدارة والمساهمين." }
        ],
        "fullDescription": "بناء وتأسيس نظم الحوكمة وفق المعايير والمبادئ الدولية والمحلية، مع التركيز على تأهيل المؤسسات وتمكينها من التطبيق الاحترافي.",
        "benefits": [
            { "title": "بناء النظم", "description": "وفق أفضل الممارسات والمعايير الدولية والمحلية." },
            { "title": "نشر ثقافة الحوكمة", "description": "تعزيز ثقافة الحوكمة الرشيدة في المؤسسة." },
            { "title": "الشفافية والمساءلة", "description": "ضمان الشفافية والمساءلة في جميع العمليات." },
            { "title": "اتخاذ القرار", "description": "تحسين عملية اتخاذ القرار الاستراتيجي." }
        ],
        "process": [
            { "step": "٠١", "title": "التقييم", "description": "تقييم الوضع الحالي للحوكمة في المؤسسة." },
            { "step": "٠٢", "title": "التصميم", "description": "تصميم هيكل الحوكمة والسياسات المناسبة." },
            { "step": "٠٣", "title": "التطبيق", "description": "دعم المؤسسة في تطبيق النظام الجديد." },
            { "step": "٠٤", "title": "التمكين", "description": "تدريب الكوادر ومتابعة الأداء." }
        ],
        "caseStudyQuote": {
            "text": "ساعدتنا GovernValu في بناء نظام حوكمة قوي عزز من ثقة المستثمرين وأدائنا العام.",
            "author": "رئيس مجلس الإدارة",
            "role": "شركة مساهمة كبرى"
        }
    },
    {
        "slug": "investment-relations",
        "title": "بناء شبكات وعلاقات الاستثمار",
        "tagline": "علاقات الاستثمار والتشبيك",
        "shortDescription": "تطوير خطط الاستثمار وفتح علاقات استثمارية استراتيجية.",
        "icon": "chart",
        "heroImage": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
        "description": "نساعدك في بناء شبكات علاقات استثمارية قوية، وتطوير خطط استراتيجية لتقييم وتقديم الفرص الاستثمارية وإدارة المحافظ بفعالية.",
        "longDescription": [
            "فتح علاقات استثمارية وبناء وتطوير خطط الاستثمار هو جوهر خدماتنا.",
            "نقوم بدراسة وتقييم وتقديم الفرص الاستثمارية وتخطيط محافظ وصناديق الاستثمار وتصورات إدارتها."
        ],
        "capabilities": [
            { "title": "فتح علاقات استثمارية", "description": "بناء جسور التواصل مع المستثمرين الاستراتيجيين." },
            { "title": "تطوير خطط الاستثمار", "description": "صياغة استراتيجيات استثمارية محكمة." },
            { "title": "تقييم الفرص", "description": "دراسة وتقييم وتقديم الفرص الاستثمارية الواعدة." },
            { "title": "تخطيط المحافظ", "description": "تخطيط محافظ وصناديق الاستثمار وتصورات إدارتها." }
        ],
        "fullDescription": "نساعدك في بناء شبكات علاقات استثمارية قوية، وتطوير خطط استراتيجية لتقييم وتقديم الفرص الاستثمارية وإدارة المحافظ بفعالية.",
        "benefits": [
            { "title": "شبكة مستثمرين", "description": "الوصول إلى شبكة مستثمرين واسعة ومتنوعة." },
            { "title": "قرارات مدروسة", "description": "اتخاذ قرارات استثمارية مبنية على تحليل دقيق." },
            { "title": "تعظيم العوائد", "description": "تحقيق أقصى عائد على الاستثمارات." },
            { "title": "إدارة المخاطر", "description": "إدارة المخاطر الاستثمارية بفعالية." }
        ],
        "process": [
            { "step": "٠١", "title": "التحليل", "description": "تحليل الجاهزية الاستثمارية والقصة المالية." },
            { "step": "٠٢", "title": "الاستراتيجية", "description": "تحديد المستثمرين المستهدفين وأدوات العرض." },
            { "step": "٠٣", "title": "التواصل", "description": "تنفيذ حملات ترويجية واجتماعات مع المستثمرين." },
            { "step": "٠٤", "title": "الإغلاق", "description": "دعم المفاوضات وإتمام الصفقات الاستثمارية." }
        ]
    },
    {
        "slug": "corporate-valuation",
        "title": "تقييم الشركات والعلامات التجارية",
        "tagline": "التقييم المؤسسي",
        "shortDescription": "خدمات تقييم دقيقة للشركات والمشروعات والعلامات التجارية.",
        "icon": "bank",
        "heroImage": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2672&auto=format&fit=crop",
        "description": "نقدم خدمات تقييم مهنية ومستقلة للشركات والمشروعات والعلامات التجارية لتحديد قيمتها العادلة.",
        "longDescription": [
            "تشمل خدماتنا تقييم الشركات والمشروعات القائمة والناشئة.",
            "كما نتخصص في تقييم العلامات التجارية والأصول غير الملموسة."
        ],
        "capabilities": [
            { "title": "تقييم الشركات والمشروعات", "description": "تحديد القيمة العادلة للأعمال باستخدام أحدث المنهجيات." },
            { "title": "تقييم العلامات التجارية", "description": "تقدير قيمة العلامة التجارية وتأثيرها في السوق." }
        ],
        "fullDescription": "نقدم خدمات تقييم مهنية ومستقلة للشركات والمشروعات والعلامات التجارية لتحديد قيمتها العادلة.",
        "benefits": [
            { "title": "القيمة العادلة", "description": "تحديد القيمة العادلة للأصول بدقة." },
            { "title": "دعم المفاوضات", "description": "دعم المفاوضات الاستثمارية بتقييمات موثوقة." },
            { "title": "المركز المالي", "description": "تعزيز المركز المالي للمؤسسة." },
            { "title": "الأصول غير الملموسة", "description": "فهم أعمق لقيمة الأصول غير الملموسة." }
        ],
        "process": [
            { "step": "٠١", "title": "الفهم", "description": "فهم نموذج العمل والسياق الاستراتيجي." },
            { "step": "٠٢", "title": "النمذجة", "description": "بناء النماذج المالية وافتراضات التقييم." },
            { "step": "٠٣", "title": "المنهجية", "description": "تطبيق طرق التقييم المعتمدة دولياً." },
            { "step": "٠٤", "title": "التقرير", "description": "إصدار تقرير تقييم شامل ومستقل." }
        ]
    },
    {
        "slug": "business-solutions",
        "title": "حلول مشكلات الأعمال",
        "tagline": "تشخيص وحل المشكلات",
        "shortDescription": "تشخيص وحل المشكلات الإدارية والمالية والتشغيلية.",
        "icon": "shield",
        "heroImage": "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=2670&auto=format&fit=crop",
        "description": "نقدم حلولاً جذرية لمشكلات الأعمال المتنوعة، بدءاً من غياب الحوكمة والتمويل، وصولاً إلى مشكلات التشغيل و الموارد البشرية.",
        "longDescription": [
            "نعالج مشكلات غياب الحوكمة أو التطبيق غير الرشيد لها.",
            "نساعد في حل مشكلات التمويل والبنوك، ومشكلات التشغيل والإنتاج، ومشكلات السمعة والصورة الذهنية.",
            "كما نتصدى للمشكلات القانونية، ومشكلات ضعف الموارد البشرية، ومشكلات الثقافة المؤسسية السامة."
        ],
        "capabilities": [
            { "title": "مشكلات الحوكمة", "description": "معالجة غياب الحوكمة أو التطبيق غير الرشيد." },
            { "title": "مشكلات التمويل", "description": "حلول للتحديات المالية والعلاقات البنكية." },
            { "title": "مشكلات التشغيل", "description": "تحسين الكفاءة الإنتاجي والتشغيلية." },
            { "title": "مشكلات الموارد البشرية", "description": "معالجة ضعف الأداء والثقافة المؤسسية السامة." }
        ],
        "fullDescription": "نقدم حلولاً جذرية لمشكلات الأعمال المتنوعة، بدءاً من غياب الحوكمة والتمويل، وصولاً إلى مشكلات التشغيل والموارد البشرية.",
        "benefits": [
            { "title": "الأداء التشغيلي", "description": "تحسين الأداء التشغيلي والكفاءة." },
            { "title": "الاستقرار المالي", "description": "تعزيز الاستقرار المالي للمؤسسة." },
            { "title": "بيئة العمل", "description": "خلق بيئة عمل صحية ومنتجة." },
            { "title": "السمعة", "description": "حماية سمعة المؤسسة وصورتها." }
        ],
        "process": []
    },
    {
        "slug": "strategy",
        "title": "بناء الاستراتيجية والتخطيط",
        "tagline": "التخطيط الاستراتيجي",
        "shortDescription": "خدمات الإدارة الاستراتيجية والتخطيط طويل المدى.",
        "icon": "globe",
        "heroImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
        "description": "بناء الاستراتيجية والتخطيط والإدارة الاستراتيجية لضمان تحقيق الأهداف المؤسسية.",
        "longDescription": ["ندعم المؤسسات في صياغة رؤيتها المستقبلية وبناء استراتيجيات قوية وخطط تنفيذية محكمة لضمان النمو والاستدامة."],
        "capabilities": [
            { "title": "بناء الاستراتيجية", "description": "صياغة الرؤية والرسالة والأهداف الاستراتيجية." },
            { "title": "التخطيط الاستراتيجي", "description": "وضع خطط عمل تفصيلية لتحقيق الأهداف." },
            { "title": "الإدارة الاستراتيجية", "description": "الإشراف على تنفيذ الاستراتيجية وتعديلها." }
        ],
        "benefits": [],
        "process": []
    },
    // Adding remaining services with simpler structures but valid fields to avoid crashes
    {
        "slug": "risk-management",
        "title": "إدارة المخاطر",
        "tagline": "إدارة المخاطر",
        "shortDescription": "تحديد وتخفيف المخاطر.",
        "icon": "shield",
        "heroImage": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop",
        "description": "نساعدك في تحديد وتقييم وإدارة المخاطر المحتملة التي قد تؤثر على مؤسستك.",
        "longDescription": ["تحديد المخاطر التشغيلية والمالية والسمعة ووضع خطط للتعامل معها."],
        "capabilities": [
            { "title": "تحليل المخاطر", "description": "تحديد وتقييم المخاطر المحتملة." },
            { "title": "خطط الاستجابة", "description": "إعداد خطط طوارئ للتعامل مع الأزمات." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "change-management",
        "title": "إدارة التغيير",
        "tagline": "إدارة التغيير",
        "shortDescription": "قيادة التحولات المؤسسية.",
        "icon": "users",
        "heroImage": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        "description": "ندير عمليات التغيير المؤسسي لضمان انتقال سلس وتحقيق الأهداف المرجوة.",
        "longDescription": ["دعم المؤسسات في تبني التغييرات وتخفيف مقاومة الموظفين."],
        "capabilities": [
            { "title": "استراتيجية التغيير", "description": "وضع خطة لإدارة التغيير." },
            { "title": "التواصل", "description": "ضمان تواصل فعال خلال فترات التغيير." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "compliance",
        "title": "نظم الامتثال",
        "tagline": "الامتثال والرقابة",
        "shortDescription": "ضمان الالتزام باللوائح.",
        "icon": "building",
        "heroImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        "description": "نطور نظم امتثال قوية تضمن التزام مؤسستك بجميع القوانين واللوائح.",
        "longDescription": ["الامتثال للقوانين المحلية والدولية ومعايير الصناعة."],
        "capabilities": [
            { "title": "مراجعة الامتثال", "description": "التأكد من الالتزام بكافة المتطلبات القانونية." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "business-development",
        "title": "استشارات تطوير الأعمال",
        "tagline": "تطوير الأعمال",
        "shortDescription": "تنمية الأعمال واكتشاف الفرص.",
        "icon": "chart",
        "heroImage": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop",
        "description": "نقدم استشارات لتطوير أعمالك، واكتشاف أسواق جديدة.",
        "longDescription": ["تحليل السوق وتحديد فرص النمو والشراكات الاستراتيجية."],
        "capabilities": [
            { "title": "تحليل السوق", "description": "فهم ديناميكيات السوق والمنافسين." },
            { "title": "استراتيجيات النمو", "description": "وضع خطط للتوسع وزيادة الحصة السوقية." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "trademark",
        "title": "تسجيل وحماية العلامات التجارية",
        "tagline": "حماية الملكية الفكرية",
        "shortDescription": "حماية هويتك التجارية.",
        "icon": "shield",
        "heroImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
        "description": "نساعدك في تسجيل وحماية علامتك التجارية وأصولك غير الملموسة.",
        "longDescription": ["تسجيل العلامات التجارية وحمايتها من التعدي."],
        "capabilities": [
            { "title": "التسجيل", "description": "إجراءات تسجيل العلامات التجارية محلياً ودولياً." },
            { "title": "الحماية", "description": "متابعة ورصد التعديات على العلامة." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "cost-reduction",
        "title": "خدمات تخفيض التكلفة وتعظيم العوائد",
        "tagline": "الكفاءة المالية",
        "shortDescription": "تحسين الكفاءة المالية.",
        "icon": "chart",
        "heroImage": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2672&auto=format&fit=crop",
        "description": "نحلل هيكل التكاليف ونحدد فرص التوفير وتحسين الكفاءة.",
        "longDescription": ["مراجعة دقيقة للمصروفات والعمليات لتحديد مناطق الهدر."],
        "capabilities": [
            { "title": "تحليل التكاليف", "description": "دراسة تفصيلية لمراكز التكلفة." },
            { "title": "تحسين العوائد", "description": "استراتيجيات لزيادة الربحية." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "training",
        "title": "التدريب وتطوير نظم العمل",
        "tagline": "التدريب والتطوير",
        "shortDescription": "بناء القدرات المؤسسية.",
        "icon": "users",
        "heroImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
        "description": "نقدم برامج تدريبية وتطويرية لرفع كفاءة فريق العمل.",
        "longDescription": ["تطوير مهارات الموظفين وتحسين بيئة العمل."],
        "capabilities": [
            { "title": "التدريب", "description": "برامج تدريبية متخصصة." },
            { "title": "تطوير النظم", "description": "تحسين إجراءات العمل الداخلية." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "digital-transformation",
        "title": "استشارات التحول الرقمي",
        "tagline": "التحول الرقمي",
        "shortDescription": "تبني التقنيات الحديثة.",
        "icon": "wifi",
        "heroImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        "description": "ندعم رحلتك في التحول الرقمي لتبني أحدث التقنيات.",
        "longDescription": ["مساعدة المؤسسات على الاستفادة من الثورة الرقمية."],
        "capabilities": [
            { "title": "استراتيجية الرقمية", "description": "وضع رؤية للتحول الرقمي." },
            { "title": "الأتمتة", "description": "أتمتة العمليات اليدوية." }
        ],
        "benefits": [],
        "process": []
    },
    {
        "slug": "accreditation-quality",
        "title": "استشارات الجودة والاعتماد",
        "tagline": "الجودة والاعتماد",
        "shortDescription": "تأهيل المؤسسات لشهادات الجودة.",
        "icon": "shield",
        "heroImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        "description": "تأهيل المؤسسات للحصول على شهادات الجودة والاعتماد وفق النظم العالمية.",
        "longDescription": [
            "تقدم الشركة خدمات الاستشارات التي تتضمن تأهيل المؤسسات المختلفة للحصول على شهادات الجودة والاعتماد وفق نظم الاعتراف والاعتماد والجودة المعمول بها عالمياً.",
            "يشمل ذلك المؤسسات الحكومية والخاصة، ومنها المؤسسات الصحية والتعليمية."
        ],
        "capabilities": [
            { "title": "تأهيل للجودة", "description": "تجهيز المؤسسة لمتطلبات آيزو وغيرها." },
            { "title": "شهادات الاعتماد", "description": "الحصول على اعتمادات دولية." }
        ],
        "benefits": [
            "الاعتراف الدولي",
            "تحسين جودة الخدمات",
            "زيادة ثقة العملاء",
            "الامتثال للمعايير العالمية"
        ],
        "process": []
    }
];

const engagementArabic = {
    "sectionTitle": "نموذج المشاركة",
    "headline": "المسار إلى الوضوح",
    "steps": [
        {
            "number": "٠١",
            "title": "الاكتشاف",
            "description": "تدقيق عميق للهياكل الحالية والأصول والالتزامات. نقابل أصحاب المصلحة الرئيسيين لتحديد الفجوات."
        },
        {
            "number": "٠٢",
            "title": "التصميم",
            "description": "تطوير خارطة الطريق الاستراتيجية. يشمل ذلك الهيكلة القانونية وصياغة السياسات ونماذج إعادة توزيع الأصول."
        },
        {
            "number": "٠٣",
            "title": "التنفيذ",
            "description": "تنفيذ الاستراتيجية. نعمل جنباً إلى جنب مع فرقك القانونية والضريبية لضمان التكامل السلس."
        },
        {
            "number": "٠٤",
            "title": "الرقابة",
            "description": "المراقبة المستمرة والتعديل. تضمن المراجعات الربع سنوية تطور الاستراتيجية مع ظروف السوق."
        }
    ]
};

const ctaArabic = {
    "headline": "مستعد للارتقاء",
    "headlineHighlight": "بالمعايير؟",
    "subtitle": "حدد موعداً لاستشارة سرية مع كبار شركائنا لمناقشة احتياجات الحوكمة الخاصة بك.",
    "buttonText": "بدء الاستشارة",
    "buttonLink": "/contact"
};

const heroArabic = {
    "title": "هندسة",
    "titleHighlight": "استراتيجية.",
    "subtitle": "نحن ننشر فرقاً متعددة التخصصات لحل تحديات الحوكمة ورأس المال الأكثر تعقيداً في المنطقة."
};

const methodologyArabic = {
    "sectionTitle": "منهجيتنا",
    "quote": "نحن لا نقدم حلولاً معلبة. يبدأ كل ارتباط بتحليل جنائي للوضع الراهن، يليه هندسة مخصصة لاستراتيجية مصممة لتدوم."
};

async function updateServices() {
    console.log('Updating Arabic Services page content...');

    const fullContent = {
        hero: heroArabic,
        methodology: methodologyArabic,
        services: arabicServices,
        engagement: engagementArabic,
        cta: ctaArabic
    };

    await prisma.pageContent.upsert({
        where: {
            page_lang: {
                page: 'services',
                lang: 'ar'
            }
        },
        update: {
            content: fullContent
        },
        create: {
            page: 'services',
            lang: 'ar',
            content: fullContent
        }
    });

    console.log('Successfully updated Arabic Services content!');
}

updateServices()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
