"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Service data with full details
const servicesData: Record<string, {
    title: string;
    tagline: string;
    heroImage: string;
    description: string;
    longDescription: string[];
    capabilities: { title: string; description: string }[];
    benefits: string[];
    process: { step: string; title: string; description: string }[];
    caseStudyQuote?: { text: string; author: string; role: string };
}> = {
    "corporate-governance": {
        title: "Corporate Governance",
        tagline: "Architecting Excellence in the Boardroom",
        heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
        description: "In an era of heightened scrutiny, the boardroom is the first line of defense. We architect governance structures that go beyond compliance to become competitive advantages.",
        longDescription: [
            "Corporate governance is the system of rules, practices, and processes by which a company is directed and controlled. At GovernValu, we believe that robust governance is not merely about avoiding problems—it's about creating a framework for sustainable success.",
            "Our approach integrates global best practices with deep understanding of GCC regulatory environments, cultural nuances, and the unique dynamics of family-influenced enterprises that characterize the regional business landscape.",
            "We work with boards, executive leadership, and shareholders to create governance structures that enhance decision-making, mitigate risk, and align all stakeholders around long-term value creation."
        ],
        capabilities: [
            { title: "Board Effectiveness Audits", description: "Rigorous evaluation of board composition, skill gaps, committee structures, and decision-making dynamics. We benchmark against global best practices and regional requirements." },
            { title: "Governance Framework Design", description: "Development of comprehensive governance policies, charters, and operating procedures tailored to your organization's size, complexity, and strategic objectives." },
            { title: "Shareholder Engagement", description: "Proactive strategies to engage institutional investors, manage activist shareholders, and ensure transparent communication with all stakeholder groups." },
            { title: "ESG Integration", description: "Moving beyond reporting to embed environmental, social, and governance considerations into strategic planning and operational decision-making." },
            { title: "Regulatory Compliance", description: "Ensuring adherence to Qatar Financial Markets Authority (QFMA) requirements, international standards, and sector-specific regulations." },
            { title: "Succession Planning", description: "Designing leadership transition frameworks that ensure continuity of strategic vision and operational excellence." }
        ],
        benefits: [
            "Enhanced stakeholder confidence and trust",
            "Improved risk identification and mitigation",
            "Better strategic decision-making at board level",
            "Alignment with Qatar Vision 2030 objectives",
            "Reduced regulatory and reputational risk",
            "Foundation for sustainable long-term growth"
        ],
        process: [
            { step: "01", title: "Assessment", description: "Comprehensive review of existing governance structures, policies, and practices against global benchmarks." },
            { step: "02", title: "Gap Analysis", description: "Identification of areas requiring improvement and prioritization based on risk and strategic importance." },
            { step: "03", title: "Design", description: "Development of tailored governance frameworks, policies, and implementation roadmaps." },
            { step: "04", title: "Implementation", description: "Support in deploying new structures, training board members, and establishing monitoring mechanisms." }
        ],
        caseStudyQuote: {
            text: "GovernValu's governance audit transformed how our board operates. They identified critical gaps we hadn't seen and provided a clear roadmap to address them.",
            author: "Board Chairman",
            role: "Leading Qatari Conglomerate"
        }
    },
    "investment-advisory": {
        title: "Investment Advisory",
        tagline: "Strategic Capital Allocation for Generational Wealth",
        heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
        description: "We provide conflict-free, macroeconomic counsel to institutional allocators and family offices. Our focus is on asymmetric risk profiles and long-horizon compounding.",
        longDescription: [
            "In an increasingly complex global financial landscape, the need for independent, sophisticated investment counsel has never been greater. GovernValu provides pure advisory services—we sell no products and accept no commissions.",
            "Our investment philosophy centers on understanding each client's unique circumstances, risk tolerance, and long-term objectives. We then construct strategies that prioritize capital preservation while capturing asymmetric upside opportunities.",
            "We leverage our deep relationships across the GCC and global investment community to provide access to opportunities typically reserved for the largest institutional investors."
        ],
        capabilities: [
            { title: "Strategic Asset Allocation", description: "Dynamic portfolio construction that adjusts to macroeconomic regimes, monetary policy shifts, and evolving market conditions." },
            { title: "Private Markets Access", description: "Curated deal flow in private equity, real assets, infrastructure, and venture capital opportunities not available to the general market." },
            { title: "Risk Overlay & Hedging", description: "Sophisticated hedging strategies using derivatives and alternative instruments to protect portfolios during periods of volatility." },
            { title: "Manager Selection", description: "Rigorous due diligence and selection of best-in-class investment managers across asset classes and geographies." },
            { title: "Performance Monitoring", description: "Comprehensive reporting and analysis to ensure portfolio performance aligns with stated objectives and benchmarks." },
            { title: "Liquidity Management", description: "Balancing long-term investment horizons with appropriate liquidity provisions for operational and opportunistic needs." }
        ],
        benefits: [
            "Conflict-free advice aligned with your interests",
            "Access to institutional-quality opportunities",
            "Protection of capital during market stress",
            "Diversification across asset classes and geographies",
            "Transparent fee structures with no hidden costs",
            "Long-term wealth preservation and growth"
        ],
        process: [
            { step: "01", title: "Discovery", description: "Deep understanding of your financial situation, objectives, risk tolerance, and time horizons." },
            { step: "02", title: "Strategy Development", description: "Creation of a customized investment policy statement and strategic asset allocation framework." },
            { step: "03", title: "Implementation", description: "Execution of the investment strategy through manager selection, direct investments, and portfolio construction." },
            { step: "04", title: "Monitoring", description: "Ongoing oversight, rebalancing, and adjustment of the portfolio to respond to changing conditions." }
        ],
        caseStudyQuote: {
            text: "The team at GovernValu helped us navigate a complex market environment while maintaining discipline around our long-term objectives. Their independence is invaluable.",
            author: "Chief Investment Officer",
            role: "Family Office, Doha"
        }
    },
    "risk-intelligence": {
        title: "Risk & Intelligence",
        tagline: "Navigating Uncertainty with Foresight",
        heroImage: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=2670&auto=format&fit=crop",
        description: "Capital does not exist in a vacuum. It operates within a volatile geopolitical framework. We equip leaders with the intelligence to anticipate shifts in power and policy.",
        longDescription: [
            "In today's interconnected world, risks emerge from unexpected directions—geopolitical tensions, cyber threats, regulatory changes, and reputational challenges can all impact enterprise value. Traditional risk management focused on financial metrics is no longer sufficient.",
            "GovernValu provides a comprehensive approach to risk intelligence that integrates analysis of political, regulatory, technological, and reputational factors into strategic decision-making.",
            "Our team combines regional expertise with global perspective, helping clients anticipate and prepare for challenges before they materialize."
        ],
        capabilities: [
            { title: "Crisis Management", description: "Rapid response protocols for regulatory investigations, media crises, and reputational threats. We help you prepare before crises occur and respond effectively when they do." },
            { title: "Geopolitical Risk Analysis", description: "Monitoring and analysis of sanctions, trade policies, regional tensions, and regime stability affecting your investments and operations." },
            { title: "Cyber Governance", description: "Bridging the gap between technical cybersecurity teams and board-level oversight. Ensuring cyber risk is properly understood and managed at the highest levels." },
            { title: "Regulatory Intelligence", description: "Forward-looking analysis of legislative and regulatory changes across GCC, European, and global jurisdictions that may impact your business." },
            { title: "Due Diligence", description: "Comprehensive background checks on potential partners, acquisition targets, and key personnel. Protecting your reputation and investments." },
            { title: "Scenario Planning", description: "Development of strategic scenarios and contingency plans to prepare for a range of potential futures." }
        ],
        benefits: [
            "Early warning of emerging threats",
            "Better-informed strategic decisions",
            "Protection of reputation and relationships",
            "Preparedness for regulatory changes",
            "Resilience in crisis situations",
            "Competitive advantage through foresight"
        ],
        process: [
            { step: "01", title: "Risk Mapping", description: "Comprehensive identification and assessment of risks across political, regulatory, operational, and reputational dimensions." },
            { step: "02", title: "Intelligence Framework", description: "Establishment of monitoring systems and information flows to provide early warning of emerging threats." },
            { step: "03", title: "Mitigation Strategies", description: "Development of policies, procedures, and contingency plans to address identified risks." },
            { step: "04", title: "Continuous Monitoring", description: "Ongoing tracking of risk indicators and adjustment of strategies as the landscape evolves." }
        ],
        caseStudyQuote: {
            text: "When a regulatory challenge emerged, GovernValu had already helped us prepare. Their foresight saved us significant time and resources.",
            author: "General Counsel",
            role: "Regional Financial Institution"
        }
    },
    "family-office": {
        title: "Family Office Services",
        tagline: "Preserving Legacy Across Generations",
        heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        description: "Holistic management of family affairs, philanthropy, and intergenerational transfer of wealth and values.",
        longDescription: [
            "Family wealth in the GCC region carries unique characteristics—deep cultural traditions, strong family bonds, diverse business interests, and increasing global complexity. Preserving and growing this wealth across generations requires specialized expertise.",
            "GovernValu provides comprehensive family office services that address not just financial matters, but the full range of challenges facing distinguished families: governance, succession, education, philanthropy, and lifestyle management.",
            "We understand that every family is unique. Our approach begins with understanding your family's values, history, and vision for the future, then crafting strategies that honor that legacy while preparing for the challenges ahead."
        ],
        capabilities: [
            { title: "Wealth Structuring", description: "Design of holding structures, trusts, and entities that optimize tax efficiency, asset protection, and succession while complying with evolving regulations." },
            { title: "Family Governance", description: "Development of family constitutions, councils, and decision-making processes that balance family harmony with effective wealth management." },
            { title: "Next Generation Education", description: "Programs to prepare the rising generation for wealth stewardship—financial literacy, governance understanding, and responsible ownership." },
            { title: "Philanthropic Strategy", description: "Helping families define and pursue their charitable objectives through strategic giving, foundation management, and impact measurement." },
            { title: "Investment Oversight", description: "Comprehensive oversight of family investments across managers, asset classes, and geographies with consolidated reporting and performance monitoring." },
            { title: "Lifestyle & Concierge", description: "Coordination of personal affairs including property management, travel, security, and other lifestyle needs." }
        ],
        benefits: [
            "Unified family vision and purpose",
            "Smooth intergenerational transitions",
            "Prepared and capable next generation",
            "Tax-efficient wealth structures",
            "Meaningful philanthropic impact",
            "Preserved family harmony"
        ],
        process: [
            { step: "01", title: "Family Discovery", description: "Understanding of family history, values, dynamics, and objectives through confidential conversations with key family members." },
            { step: "02", title: "Assessment", description: "Review of existing structures, investments, governance mechanisms, and identification of gaps and opportunities." },
            { step: "03", title: "Strategy Design", description: "Development of comprehensive family office strategy covering governance, investments, succession, and philanthropy." },
            { step: "04", title: "Implementation", description: "Execution of the strategy with ongoing support, including establishment or optimization of family office operations." }
        ],
        caseStudyQuote: {
            text: "GovernValu helped our family navigate a complex succession while maintaining harmony. They understood that wealth is about more than money.",
            author: "Family Principal",
            role: "Third-Generation Business Family"
        }
    },
    "mergers-acquisitions": {
        title: "Cross-Border M&A",
        tagline: "Strategic Transactions Across Borders",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
        description: "Expert guidance on international mergers and acquisitions, ensuring seamless integration and value realization across jurisdictions.",
        longDescription: [
            "Cross-border transactions present unique challenges—different legal systems, cultural norms, regulatory requirements, and business practices. Success requires more than financial analysis; it demands deep understanding of the human and institutional factors that determine outcomes.",
            "GovernValu brings together expertise in finance, law, and regional business culture to guide clients through complex international transactions. We serve as trusted advisors from initial strategy through post-merger integration.",
            "Our approach emphasizes thorough preparation, cultural sensitivity, and disciplined execution. We help clients avoid common pitfalls and create value through well-structured, well-executed transactions."
        ],
        capabilities: [
            { title: "Strategic Advisory", description: "Development of M&A strategy aligned with corporate objectives, including target identification, market entry planning, and portfolio optimization." },
            { title: "Due Diligence Coordination", description: "Comprehensive review of financial, legal, operational, and cultural factors. We coordinate across work streams to ensure no stone is left unturned." },
            { title: "Valuation & Structure", description: "Rigorous valuation analysis and transaction structuring to optimize value, minimize risk, and align incentives." },
            { title: "Negotiation Support", description: "Strategic and tactical support throughout negotiations, helping clients achieve favorable terms while maintaining relationships." },
            { title: "Integration Planning", description: "Development of detailed integration roadmaps that address operational, cultural, and governance challenges." },
            { title: "Post-Merger Oversight", description: "Monitoring of integration progress and realization of synergies with intervention when needed." }
        ],
        benefits: [
            "Strategic clarity on M&A direction",
            "Thorough risk identification",
            "Optimized transaction structure",
            "Smooth integration execution",
            "Realized transaction synergies",
            "Preserved organizational culture"
        ],
        process: [
            { step: "01", title: "Strategy", description: "Definition of M&A objectives, criteria, and approach aligned with overall corporate strategy." },
            { step: "02", title: "Evaluation", description: "Identification, screening, and detailed evaluation of potential targets or acquirers." },
            { step: "03", title: "Execution", description: "Transaction structuring, negotiation, due diligence coordination, and closing." },
            { step: "04", title: "Integration", description: "Post-closing integration planning and execution to capture value and manage risks." }
        ],
        caseStudyQuote: {
            text: "The cross-border expertise of GovernValu was essential to the success of our acquisition. They understood both sides of the table.",
            author: "CEO",
            role: "GCC Industrial Group"
        }
    },
    "board-advisory": {
        title: "Board Advisory",
        tagline: "Elevating Board Effectiveness",
        heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        description: "Optimizing board composition and effectiveness to drive long-term strategic value and stakeholder confidence.",
        longDescription: [
            "The board of directors is the apex of corporate governance—it sets strategic direction, oversees management, and is accountable to shareholders. Yet many boards struggle to fulfill their potential, hampered by composition issues, ineffective processes, or unclear mandates.",
            "GovernValu provides independent, expert advisory services to help boards enhance their effectiveness. We work with chairmen, nominating committees, and individual directors to identify opportunities for improvement and implement meaningful change.",
            "Our approach is grounded in global best practices but tailored to the specific context of each organization—its industry, ownership structure, regulatory environment, and stage of development."
        ],
        capabilities: [
            { title: "Board Evaluation", description: "Rigorous assessment of board and committee effectiveness including composition, dynamics, processes, and outcomes. Confidential interviews and benchmarking against best practices." },
            { title: "Director Recruitment", description: "Identification and assessment of qualified director candidates who bring needed skills, experience, and perspectives. Support through interview and onboarding processes." },
            { title: "Board Education", description: "Customized training programs to enhance director knowledge of governance best practices, regulatory requirements, and industry-specific issues." },
            { title: "Committee Optimization", description: "Review and enhancement of committee structures, charters, and operating processes to ensure effective oversight of key areas." },
            { title: "Succession Planning", description: "Development of chair and director succession frameworks that ensure board continuity and fresh perspectives." },
            { title: "Independent Director Services", description: "Provision of qualified independent directors to serve on client boards, bringing governance expertise and objective perspective." }
        ],
        benefits: [
            "More effective board oversight",
            "Optimal board composition",
            "Better-informed directors",
            "Improved board dynamics",
            "Clear succession pathways",
            "Enhanced stakeholder confidence"
        ],
        process: [
            { step: "01", title: "Assessment", description: "Comprehensive evaluation of board composition, structure, processes, and culture through interviews and observation." },
            { step: "02", title: "Recommendations", description: "Development of prioritized recommendations for board enhancement with clear rationale and implementation pathways." },
            { step: "03", title: "Implementation", description: "Support in executing approved recommendations including recruitment, training, and process changes." },
            { step: "04", title: "Review", description: "Periodic reassessment to ensure sustained improvement and adaptation to changing circumstances." }
        ],
        caseStudyQuote: {
            text: "GovernValu's board evaluation opened our eyes to blind spots we didn't know we had. The improvements have been transformative.",
            author: "Chairman",
            role: "Listed Company, Qatar Exchange"
        }
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const service = servicesData[slug];

    useEffect(() => {
        if (!service) return;

        const reveals = document.querySelectorAll(".reveal");
        const revealOnScroll = () => {
            reveals.forEach((element) => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - 150) {
                    element.classList.add("active");
                }
            });
        };
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();
        return () => window.removeEventListener("scroll", revealOnScroll);
    }, [service]);

    if (!service) {
        notFound();
    }

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src={service.heroImage}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-onyx/60" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <Link href="/services" className="inline-flex items-center gap-2 text-brand text-sm uppercase tracking-widest mb-6 hover:text-white transition-colors reveal">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Services
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {service.title}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        {service.tagline}
                    </p>
                </div>
            </header>

            {/* Overview */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-6">Overview</h2>
                        <p className="text-2xl font-serif leading-relaxed text-gray-800 mb-8">{service.description}</p>
                        <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                            {service.longDescription.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">What We Deliver</h2>
                        <h3 className="text-4xl font-serif text-onyx">Our Capabilities</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.capabilities.map((capability, index) => (
                            <div key={index} className="p-8 bg-white border border-gray-100 shadow-lg reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                                <h4 className="text-lg font-bold text-onyx mb-3">{capability.title}</h4>
                                <p className="text-gray-600 text-sm font-light leading-relaxed">{capability.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-onyx text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">The Value</h2>
                            <h3 className="text-4xl font-serif mb-8">Benefits to Your Organization</h3>
                            <ul className="space-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-brand rounded-full shrink-0" />
                                        <span className="text-gray-300 font-light">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {service.caseStudyQuote && (
                            <div className="p-10 bg-white/5 border border-white/10 reveal">
                                <svg className="w-10 h-10 text-brand mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <blockquote className="text-xl font-serif italic text-white leading-relaxed mb-6">
                                    &ldquo;{service.caseStudyQuote.text}&rdquo;
                                </blockquote>
                                <div>
                                    <div className="text-brand text-sm font-bold">{service.caseStudyQuote.author}</div>
                                    <div className="text-gray-500 text-sm">{service.caseStudyQuote.role}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Approach</h2>
                        <h3 className="text-4xl font-serif text-onyx">How We Work</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {service.process.map((step, index) => (
                            <div key={index} className="relative reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="text-6xl font-serif text-brand/10 font-bold mb-4">{step.step}</div>
                                <h4 className="text-xl font-bold text-onyx mb-2">{step.title}</h4>
                                <p className="text-gray-600 text-sm font-light leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Ready to discuss <span className="text-brand">{service.title.toLowerCase()}</span>?
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-10">
                        Schedule a confidential consultation with our senior partners.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/services" className="inline-block px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                            Explore All Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
