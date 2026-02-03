"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";
import Link from "next/link";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQPageClientProps {
    faqContent: {
        sectionTitle?: string;
        headline?: string;
        items: FAQItem[];
    };
    initialLang: string;
}

export default function FAQPageClient({ faqContent, initialLang }: FAQPageClientProps) {
    const { language } = useLanguage();
    const t = LABELS[language];
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

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
        setTimeout(revealOnScroll, 100);
        return () => window.removeEventListener("scroll", revealOnScroll);
    }, [faqContent]);

    const faqItems = faqContent?.items || [];

    // Filter FAQs based on search query
    const filteredFaqs = searchQuery.trim()
        ? faqItems.filter(
            (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqItems;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <header className="relative h-[50vh] overflow-hidden bg-onyx flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-onyx via-onyx/95 to-onyx/90" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <span className="inline-block px-6 py-2 bg-brand/10 border border-brand/20 text-brand text-xs uppercase tracking-[0.3em] mb-6 reveal">
                        {faqContent?.sectionTitle || (language === 'ar' ? 'أسئلة شائعة' : 'Common Questions')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {faqContent?.headline || (language === 'ar' ? 'الأسئلة المتكررة' : 'Frequently Asked Questions')}
                    </h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto reveal" style={{ transitionDelay: "200ms" }}>
                        {language === 'ar'
                            ? 'اعثر على إجابات لأسئلتك حول خدماتنا الاستشارية'
                            : 'Find answers to your questions about our consulting services'}
                    </p>
                </div>
            </header>

            {/* Search Section */}
            <section className="py-12 bg-gray-50 border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={language === 'ar' ? 'ابحث في الأسئلة...' : 'Search questions...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                            dir={language === 'ar' ? 'rtl' : 'ltr'}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg overflow-hidden reveal"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-onyx pr-4">{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-brand shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[500px]' : 'max-h-0'}`}
                                    >
                                        <div className="px-6 pb-5 pt-2 bg-gray-50 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results count */}
                    {searchQuery && filteredFaqs.length > 0 && (
                        <p className="text-center text-gray-500 mt-8">
                            {language === 'ar'
                                ? `تم العثور على ${filteredFaqs.length} نتيجة`
                                : `Found ${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''}`}
                        </p>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif text-onyx mb-4 reveal">
                        {language === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Didn't find what you're looking for?"}
                    </h2>
                    <p className="text-gray-600 mb-8 reveal" style={{ transitionDelay: "100ms" }}>
                        {language === 'ar'
                            ? 'تواصل معنا وسنكون سعداء بالإجابة على استفساراتك'
                            : "Contact us and we'll be happy to answer your questions"}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white text-sm uppercase tracking-widest font-bold hover:bg-brand-dark transition-all duration-300 reveal"
                        style={{ transitionDelay: "200ms" }}
                    >
                        {t.contact}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
