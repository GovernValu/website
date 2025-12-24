
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const translations = {
    about: {
        "hero": {
            "title": "إرث من الثقة",
            "subtitle": "إعادة تعريف الحوكمة المتميزة للمؤسسات الأكثر نفوذاً في المنطقة.",
            "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        "intro": {
            "headline": "نحن مهندسو الثبات.",
            "content": [
                "في عصر يتسم بالتقلبات غير المسبوقة، لا تعد الحوكمة مجرد التزام تنظيمي، بل هي ركيزة استراتيجية للبقاء والنمو.",
                "تمتلك GovernValu جذورًا عميقة في المشهد المالي القطري وخبرة عالمية، حيث تقدم نهجًا فريدًا يجمع بين الحكمة التقليدية والابتكار الحديث."
            ],
            "stats": [
                { "value": "20+", "label": "عاماً من الخبرة" },
                { "value": "$8B+", "label": "أصول مدارة" },
                { "value": "50+", "label": "شريكاً" }
            ]
        },
        "vision": {
            "title": "رؤيتنا",
            "description": "أن نكون المعيار الذهبي للحوكمة واستشارات الاستثمار في الشرق الأوسط، لتمكين قادة المستقبل من اتخاذ قرارات حكيمة تؤمن الإرث وتعزز الازدهار.",
            "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
        },
        "mission": {
            "title": "رسالتنا",
            "description": "تزويد المؤسسات والمكاتب العائلية بالأطر الاستراتيجية والرؤى القابلة للتنفيذ اللازمة للتنقل عبر تعقيدات الأسواق العالمية والمحلية بثقة ونزاهة.",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
        },
        "values": {
            "title": "قيمنا الجوهرية",
            "items": [
                {
                    "title": "النزاهة",
                    "description": "نلتزم بأعلى المعايير الأخلاقية في كل تفاعل وقرار استثماري."
                },
                {
                    "title": "التميز",
                    "description": "نسعى جاهدين لتحقيق الكمال في كل استراتيجية وحل نقدمه لعملائنا."
                },
                {
                    "title": "الخصوصية",
                    "description": "نقدر سرية عملائنا ونحمي معلوماتهم وبروتوكولاتهم بأقصى درجات العناية."
                },
                {
                    "title": "الابتكار",
                    "description": "نتبنى تقنيات وأساليب جديدة لتقديم حلول حوكمة تواكب المستقبل."
                }
            ]
        },
        "cta": {
            "headline": "شراكة من أجل المستقبل",
            "subtitle": "اكتشف كيف يمكننا مساعدتك في تحقيق أهدافك الاستراتيجية.",
            "buttonText": "تواصل معنا",
            "buttonLink": "/contact"
        }
    },
    contact: {
        "hero": {
            "title": "تواصل معنا",
            "subtitle": "نحن هنا للإجابة على استفساراتكم ومناقشة كيف يمكننا خدمتكم."
        },
        "quickContact": {
            "phone": "+974 4444 5555",
            "email": "info@governvalu.com",
            "address": "الخليج الغربي، الدوحة، قطر"
        },
        "form": {
            "labels": {
                "firstName": "الاسم الأول",
                "lastName": "اسم العائلة",
                "email": "البريد الإلكتروني",
                "phone": "رقم الهاتف",
                "company": "الشركة / المؤسسة",
                "inquiryType": "نوع الاستفسار",
                "message": "الرسالة",
                "submit": "إرسال الرسالة",
                "sending": "جاري الإرسال..."
            },
            "placeholders": {
                "firstName": "أدخل الاسم الأول",
                "lastName": "أدخل اسم العائلة",
                "email": "name@company.com",
                "phone": "+974 ...",
                "company": "اسم شركتك",
                "message": "كيف يمكننا مساعدتك؟"
            },
            "inquiryOptions": [
                { "value": "general", "label": "استفسار عام" },
                { "value": "governance", "label": "استشارات الحوكمة" },
                { "value": "investment", "label": "استراتيجية الاستثمار" },
                { "value": "family_office", "label": "خدمات المكاتب العائلية" },
                { "value": "media", "label": "استفسار إعلامي" }
            ],
            "successMessage": "تلقينا رسالتك بنجاح. سيتواصل معك فريقنا قريباً.",
            "errorMessage": "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
        },
        "headquarters": {
            "title": "المقر الرئيسي",
            "address": {
                "line1": "مركز قطر للمال",
                "line2": "البرج ١، الطابق ٢٥",
                "line3": "الخليج الغربي، الدوحة، قطر"
            },
            "mapUrl": "https://www.google.com/maps/embed?pb=..."
        },
        "responsePromise": "نلتزم بالرد على جميع الاستفسارات المعتمدة خلال ٢٤ ساعة عمل."
    },
    services: {
        "hero": {
            "title": "خدماتنا",
            "subtitle": "حلول شاملة مصممة خصيصاً لتلبية احتياجات النخبة من المؤسسات والمستثمرين.",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
        },
        "serviceList": [
            {
                "slug": "corporate-governance",
                "title": "حوكمة الشركات",
                "shortDescription": "تطبيق أطر عمل صارمة لضمان المساءلة والشفافية.",
                "icon": "building",
                "fullDescription": "نحن نصمم وننفذ هياكل حوكمة قوية تعزز عملية صنع القرار، وتحسن الرقابة، وتضمن الامتثال للمعايير التنظيمية المحلية والدولية.",
                "benefits": [
                    { "title": "مجلس إدارة فعال", "description": "تحسين تكوين وأداء مجالس الإدارة." },
                    { "title": "الامتثال التنظيمي", "description": "ضمان التوافق مع لوائح هيئة قطر للأسواق المالية." },
                    { "title": "إدارة أصحاب المصلحة", "description": "تعزيز العلاقات والثقة مع جميع الأطراف المعنية." }
                ],
                "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "investment-strategy",
                "title": "استراتيجية الاستثمار",
                "shortDescription": "محافظ استثمارية مخصصة للنمو والحفاظ على رأس المال.",
                "icon": "chart",
                "fullDescription": "نقوم بتطوير استراتيجيات استثمار مخصصة تتماشى مع رغبتك في المخاطرة وأهدافك طويلة الأجل، مع التركيز على التنويع وتحقيق عوائد معدلة حسب المخاطر.",
                "benefits": [
                    { "title": "توزيع الأصول", "description": "تحديد المزيج الأمثل من فئات الأصول." },
                    { "title": "تحليل السوق", "description": "رؤى عميقة لاتجاهات السوق والفرص الناشئة." },
                    { "title": "إدارة الأداء", "description": "مراقبة مستمرة وتحسين للمحفظة الاستثمارية." }
                ],
                "image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "risk-management",
                "title": "إدارة المخاطر",
                "shortDescription": "تحديد وتخفيف المخاطر المالية والتشغيلية والاستراتيجية.",
                "icon": "shield",
                "fullDescription": "نساعدك على تحديد وتقييم وإدارة المخاطر التي قد تهدد أهدافك، من خلال أطر عمل شاملة تعزز المرونة والاستقرار.",
                "benefits": [
                    { "title": "تقييم المخاطر", "description": "تحديد نقاط الضعف والتهديدات المحتملة." },
                    { "title": "خطط الطوارئ", "description": "إعداد استراتيجيات للتعامل مع الأزمات." },
                    { "title": "الامتثال الداخلي", "description": "ضمان التزام العمليات بالسياسات والإجراءات." }
                ],
                "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "family-office",
                "title": "المكاتب العائلية",
                "shortDescription": "إدارة شاملة لثروات وشؤون العائلات المرموقة.",
                "icon": "users",
                "fullDescription": "نقدم خدمات متكاملة للمكاتب العائلية تشمل التخطيط للتعاقب، والحوكمة العائلية، وإدارة الاستثمارات، والأعمال الخيرية.",
                "benefits": [
                    { "title": "دستور العائلة", "description": "وضع قواعد ومبادئ توجيهية للعائلة." },
                    { "title": "تخطيط التعاقب", "description": "إعداد الجيل القادم لتولي المسؤولية." },
                    { "title": "إدارة الثروة", "description": "الحفاظ على الثروة وتنميتها للأجيال القادمة." }
                ],
                "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "mergers-acquisitions",
                "title": "الاندماج والاستحواذ",
                "shortDescription": "استشارات experte لصفقات الاندماج والاستحواذ المعقدة.",
                "icon": "globe",
                "fullDescription": "نقدم الدعم في جميع مراحل الصفقة، من التقييم والعناية الواجبة إلى التفاوض والتكامل ما بعد الصفقة.",
                "benefits": [
                    { "title": "تقييم الهدف", "description": "تحديد القيمة العادلة والفرص." },
                    { "title": "العناية الواجبة", "description": "فحص شامل للمخاطر والالتزامات." },
                    { "title": "هيكلة الصفقة", "description": "تحسين شروط الصفقة لتحقيق أقصى قيمة." }
                ],
                "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
            },
            {
                "slug": "valuation-services",
                "title": "خدمات التقييم",
                "shortDescription": "تقييم دقيق للأصول والشركات لأغراض الاستثمار والتقارير.",
                "icon": "bank",
                "fullDescription": "نستخدم منهجيات تقييم معتمدة دولياً لتقديم تقديرات دقيقة وموثوقة لقيمة الأصول والشركات.",
                "benefits": [
                    { "title": "تقييم الشركات", "description": "تحديد قيمة الشركات الخاصة والعامة." },
                    { "title": "تقييم الأصول غير الملموسة", "description": "تقييم العلامات التجارية وبراءات الاختراع." },
                    { "title": "تقارير مالية", "description": "دعم متطلبات التقارير المالية والضريبية." }
                ],
                "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2672&auto=format&fit=crop"
            }
        ],
        "cta": {
            "headline": "ارتقِ بأعمالك إلى المستوى التالي",
            "subtitle": "تواصل معنا لمناقشة كيف يمكن لخدماتنا أن تلبي احتياجاتك الفريدة.",
            "buttonText": "طلب استشارة",
            "buttonLink": "/contact"
        }
    },
    industries: {
        "hero": {
            "title": "القطاعات",
            "subtitle": "خبرة قطاعية عميقة عبر الصناعات الرئيسية في المنطقة.",
            "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
        },
        "intro": {
            "headline": "فهم عميق لديناميكيات السوق.",
            "content": "لا نطبق حلاً واحداً للجميع. نمتلك معرفة متخصصة بالتحديات والفرص الفريدة لكل قطاع نخدمه."
        },
        "industryList": [
            {
                "slug": "banking-finance",
                "title": "الخدمات المصرفية والمالية",
                "description": "استراتيجيات للتكيف مع التكنولوجيا المالية واللوائح المتغيرة.",
                "icon": "bank",
                "detailedFeatures": ["التحول الرقمي", "الامتثال التنظيمي", "إدارة المخاطر"],
                "fullDescription": "ندعم المؤسسات المالية في رحلتها للابتكار والامتثال، مع التركيز على الكفاءة التشغيلية ورضا العملاء.",
                "image": "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "sovereign-wealth",
                "title": "صناديق الثروة السيادية",
                "description": "إدارة استراتيجية للأصول الوطنية لضمان الاستدامة طويلة الأجل.",
                "icon": "globe",
                "detailedFeatures": ["توزيع الأصول الاستراتيجي", "الحوكمة المؤسسية", "الاستثمار المسؤول"],
                "fullDescription": "نعمل مع الصناديق السيادية لتعظيم العوائد طويلة الأجل والمساهمة في التنمية الاقتصادية الوطنية.",
                "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "family-enterprises",
                "title": "الشركات العائلية",
                "description": "الحفاظ على الإرث وتنمية الأعمال عبر الأجيال.",
                "icon": "users",
                "detailedFeatures": ["الحوكمة العائلية", "تخطيط الخلافة", "الاحترافية"],
                "fullDescription": "نساعد الشركات العائلية على الموازنة بين ديناميكيات الأسرة ومتطلبات الأعمال لضمان الاستمرارية والنمو.",
                "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
            },
            {
                "slug": "real-estate",
                "title": "العقارات والإنشاءات",
                "description": "تعظيم قيمة المحافظ العقارية وإدارة المشاريع الكبرى.",
                "icon": "building",
                "detailedFeatures": ["دراسات الجدوى", "تمويل المشاريع", "إدارة الأصول"],
                "fullDescription": "نقدم استشارات متخصصة للمطورين والمستثمرين لتعظيم العائد على الاستثمار وإدارة مخاطر السوق.",
                "image": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2610&auto=format&fit=crop"
            },
            {
                "slug": "energy",
                "title": "الطاقة والموارد",
                "description": "استراتيجيات لمواجهة تحديات تحول الطاقة والاستدامة.",
                "icon": "zap",
                "detailedFeatures": ["استراتيجيات الاستدامة", "تحسين الكفاءة", "الامتثال البيئي"],
                "fullDescription": "نساعد شركات الطاقة على التكيف مع مشهد الطاقة المتغير وتبني ممارسات مستدامة ومربحة.",
                "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop"
            },
            {
                "slug": "telecom",
                "title": "التكنولوجيا والاتصالات",
                "description": "دفع الابتكار والنمو في قطاع سريع التطور.",
                "icon": "wifi",
                "detailedFeatures": ["استراتيجيات النمو", "عمليات الاندماج", "الابتكار الرقمي"],
                "fullDescription": "ندعم شركات التكنولوجيا والاتصالات في تحديد فرص النمو الجديدة والبقاء في صدارة المنافسة.",
                "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
            }
        ],
        "cta": {
            "headline": "حلول متخصصة لقطاعك",
            "subtitle": "ناقش تحدياتك الخاصة مع خبرائنا القطاعيين.",
            "buttonText": "تواصل معنا",
            "buttonLink": "/contact"
        }
    },
    partners: {
        "hero": {
            "title": "شركاؤنا",
            "subtitle": "نتعاون مع الأفضل لتقديم قيمة استثنائية.",
            "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
        },
        "intro": {
            "headline": "قوة الشراكة.",
            "content": "نؤمن بأن التعاون هو مفتاح النجاح. لقد قمنا ببناء شبكة من الشركاء الاستراتيجيين والتقنيين لتعزيز قدراتنا وتقديم حلول شاملة لعملائنا."
        },
        "categories": [
            {
                "id": "strategic",
                "title": "الشركاء الاستراتيجيون",
                "description": "تحالفات مع مؤسسات رائدة توسع نطاق وصولنا وخبراتنا.",
                "partners": [
                    { "name": "Global Legal Advisors", "logo": "/placeholder-logo.png" },
                    { "name": "Qatar Finance Group", "logo": "/placeholder-logo.png" },
                    { "name": "MENA Strategy Consultants", "logo": "/placeholder-logo.png" }
                ]
            },
            {
                "id": "technology",
                "title": "شركاء التكنولوجيا",
                "description": "موفروا حلول تقنية متطورة تمكننا من تقديم خدمات رقمية مبتكرة.",
                "partners": [
                    { "name": "SecureCloud Systems", "logo": "/placeholder-logo.png" },
                    { "name": "DataAnalytica", "logo": "/placeholder-logo.png" },
                    { "name": "GovernanceTech Solutions", "logo": "/placeholder-logo.png" }
                ]
            }
        ],
        "cta": {
            "headline": "كن شريكاً لنا",
            "subtitle": "نبحث دائماً عن شركاء يشاركوننا قيمنا ورؤيتنا.",
            "buttonText": "تواصل للشراكة",
            "buttonLink": "/contact"
        }
    },
    news: {
        "hero": {
            "title": "الأخبار والرؤى",
            "subtitle": "آخر التطورات والتحليلات من GovernValu وعالم الأعمال.",
            "image": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop"
        },
        "featured": {
            "label": "قصة مميزة",
            "title": "مستقبل الحوكمة في الشرق الأوسط: تقرير 2025",
            "excerpt": "نظرة متعمقة على الاتجاهات الناشئة التي تشكل مشهد حوكمة الشركات في المنطقة، من الاستدامة إلى التحول الرقمي.",
            "link": "/news/future-of-governance-report",
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        },
        "updates": {
            "sectionTitle": "آخر التحديثات",
            "filters": ["الكل", "أخبار الشركة", "تحليل السوق", "فعاليات"],
            "loadMore": "تحميل المزيد"
        },
        "newsItems": [
            {
                "id": "1",
                "category": "أخبار الشركة",
                "date": "١٥ ديسمبر ٢٠٢٥",
                "title": "GovernValu توسع عملياتها إلى الرياض",
                "excerpt": "يسعدنا الإعلان عن افتتاح مكتبنا الجديد في مركز الملك عبد الله المالي، تعزيزاً لالتزامنا بخدمة عملائنا في المملكة.",
                "image": "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop"
            },
            {
                "id": "2",
                "category": "تحليل السوق",
                "date": "١٠ نوفمبر ٢٠٢٥",
                "title": "أثر الذكاء الاصطناعي على قرارات الاستثمار",
                "excerpt": "كيف تقوم المكاتب العائلية بدمج أدوات الذكاء الاصطناعي لتحسين استراتيجيات توزيع الأصول وإدارة المخاطر.",
                "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
            },
            {
                "id": "3",
                "category": "فعاليات",
                "date": "٢٥ أكتوبر ٢٠٢٥",
                "title": "مؤتمر الدوحة للحوكمة ٢٠٢٥",
                "excerpt": "انضم إلينا في مناقشة حيوية حول دور أعضاء مجلس الإدارة المستقلين في تعزيز الشفافية والأداء.",
                "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2670&auto=format&fit=crop"
            }
        ],
        "newsletter": {
            "title": "اشترك في نشرتنا الإخبارية",
            "description": "احصل على أحدث الرؤى والأخبار مباشرة إلى بريدك الوارد.",
            "placeholder": "عنوان بريدك الإلكتروني",
            "buttonText": "اشترك الآن"
        }
    },
    settings: {
        "companyName": "GovernValu",
        "tagline": "حوكمة واستشارات استثمارية",
        "logo": {
            "text": "G",
            "fullText": "GovernValu"
        },
        "footerBlurb": "حوكمة استراتيجية لاستثمارات مستدامة. شركة استشارات واستثمار تعتمد على الحوكمة تخدم منطقة الشرق الأوسط وشمال أفريقيا وخارجها.",
        "contact": {
            "phone": "+974 4412 3456",
            "email": "info@governvalu.com",
            "address": {
                "line1": "مركز قطر للمال",
                "line2": "البرج ١، الطابق ٢٥",
                "line3": "الخليج الغربي، الدوحة، قطر"
            },
            "officeHours": "الأحد - الخميس، ٨:٠٠ ص - ٥:٠٠ م"
        },
        "socialMedia": {
            "linkedin": "https://linkedin.com/company/governvalu",
            "twitter": "https://twitter.com/governvalu"
        },
        "regionalOffices": [
            {
                "city": "دبي",
                "country": "الإمارات العربية المتحدة",
                "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
                "address": "قرية البوابة، مركز دبي المالي العالمي، مبنى 5",
                "email": "dubai@governvalu.com"
            },
            {
                "city": "الرياض",
                "country": "المملكة العربية السعودية",
                "image": "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop",
                "address": "مركز الملك عبد الله المالي",
                "email": "riyadh@governvalu.com"
            },
            {
                "city": "لندن",
                "country": "المملكة المتحدة",
                "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
                "address": "١٤ شارع كرزون، مايفير",
                "email": "london@governvalu.com"
            }
        ],
        "footer": {
            "copyright": "© ٢٠٢٥ GovernValu. جميع الحقوق محفوظة.",
            "tagline": "الدقة في الحوكمة.",
            "links": [
                {
                    "label": "سياسة الخصوصية",
                    "url": "/privacy"
                },
                {
                    "label": "شروط الخدمة",
                    "url": "/terms"
                }
            ]
        },
        "seo": {
            "defaultTitle": "GovernValu | استشارات الحوكمة والاستثمار - قطر",
            "defaultDescription": "شركة استشارات الحوكمة والاستثمار الرائدة في قطر. مشورة استراتيجية لحوكمة الشركات، واستراتيجية الاستثمار، وتخفيف المخاطر، وخدمات المكاتب العائلية في جميع أنحاء دول مجلس التعاون الخليجي.",
            "keywords": "حوكمة، استثمار، قطر، دول مجلس التعاون الخليجي، حوكمة الشركات، استراتيجية الاستثمار، تخفيف المخاطر، المكاتب العائلية، استشارات، الدوحة"
        }
    }
};

async function updateAllContent() {
    console.log('Starting full translation update...');

    // Using simple loop to process sequentially
    for (const [page, content] of Object.entries(translations)) {
        console.log(`Updating ${page}...`);

        await prisma.pageContent.upsert({
            where: {
                page_lang: {
                    page: page,
                    lang: 'ar'
                }
            },
            update: {
                content: content
            },
            create: {
                page: page,
                lang: 'ar',
                content: content
            }
        });

        console.log(`✓ Updated ${page}`);
    }

    console.log('All translations updated successfully!');
}

updateAllContent()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
