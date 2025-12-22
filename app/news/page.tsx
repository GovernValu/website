"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Mock data for news
const newsItems = [
    {
        id: 1,
        category: "Market Commentary",
        date: "December 15, 2024",
        title: "The Shift in GCC Capital Allocation Strategies",
        excerpt: "As sovereign funds pivot towards domestic value creation, we analyze the implications for foreign direct investment.",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop"
    },
    {
        id: 2,
        category: "Press Release",
        date: "November 28, 2024",
        title: "GovernValu Appoints New Head of Investment Advisory",
        excerpt: "We are pleased to welcome Sarah Al-Majed to lead our expanding private markets division in Riyadh.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop"
    },
    {
        id: 3,
        category: "Research",
        date: "November 10, 2024",
        title: "2025 Governance Outlook: The ESG Integration Mandate",
        excerpt: "Our proprietary research indicates a 40% increase in board-level ESG committee formation across top-tier GCC firms.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
    },
    {
        id: 4,
        category: "Market Commentary",
        date: "October 22, 2024",
        title: "Navigating Volatility: Family Office Resilience",
        excerpt: "How multi-generational family enterprises are restructuring their portfolios to withstand geoeconomic fragmentation.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 5,
        category: "Press Release",
        date: "October 05, 2024",
        title: "GovernValu Partners with Global Risk Monitor",
        excerpt: "A strategic alliance to provide real-time geopolitical risk intelligence to our institutional clients.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
        id: 6,
        category: "Research",
        date: "September 18, 2024",
        title: "The Rise of Private Credit in the Middle East",
        excerpt: "An in-depth look at the regulatory changes fueling the explosion of non-bank lending in the region.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop"
    }
];

export default function NewsPage() {
    useEffect(() => {
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
    }, []);

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-onyx text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 filter grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 via-onyx/50 to-onyx" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        Thought Leadership
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Insights & <br />
                        <span className="italic text-brand font-serif">Intelligence.</span>
                    </h1>
                </div>
            </header>

            {/* Featured Article */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center reveal">
                        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[500px] bg-gray-100 overflow-hidden">
                            <div className="absolute inset-0 bg-brand/10 z-10 hover:bg-transparent transition-colors duration-500" />
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                                alt="Featured"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-brand text-xs font-bold tracking-[0.2em] uppercase mb-4">Featured Report</span>
                            <h2 className="text-4xl font-serif text-onyx mb-6 leading-tight hover:text-brand transition-colors cursor-pointer">
                                The Future of Board Governance in a Digital Age
                            </h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-8">
                                As artificial intelligence reshapes decision-making, boards must adapt their oversight mechanisms. Our latest whitepaper explores the frameworks necessary for effective digital governance.
                            </p>
                            <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-onyx hover:text-brand transition-colors">
                                Read Full Report
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grip */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12 reveal">
                        <h2 className="text-3xl font-serif text-onyx">Latest Updates</h2>
                        <div className="hidden md:flex gap-4">
                            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-onyx">All</button>
                            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-onyx transition-colors">Research</button>
                            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-onyx transition-colors">News</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="group bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col reveal"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-onyx/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 left-4 z-20 bg-white text-onyx px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-xs text-gray-400 font-medium mb-3 block">{item.date}</span>
                                    <h3 className="text-xl font-serif text-onyx mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                    <div className="mt-auto">
                                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand group-hover:underline">
                                            Read More
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16 reveal">
                        <button className="px-8 py-3 border border-onyx text-onyx text-sm uppercase tracking-widest font-bold hover:bg-onyx hover:text-white transition-colors duration-300">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-onyx text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
                    <h2 className="text-3xl font-serif mb-4">Subscribe to Our Intelligence</h2>
                    <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
                        Receive our monthly market commentary and research directly to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="flex-grow bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
                        />
                        <button className="px-8 py-3 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
