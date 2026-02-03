"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

interface ContactPageClientProps {
    contactContent: any;
    settingsContent: any;
    initialLang: string;
}

export default function ContactPageClient({ contactContent, settingsContent, initialLang }: ContactPageClientProps) {
    const { language } = useLanguage();
    const t = LABELS[language];

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // FAQ Carousel State
    const [faqIndex, setFaqIndex] = useState(0);
    const [isAutoPlayingFaq, setIsAutoPlayingFaq] = useState(true);
    const faqItems = contactContent.faq?.items || [];
    const faqCardsPerView = 2; // Show 2 cards at a time on desktop

    // Auto-scroll FAQ carousel every 5 seconds
    useEffect(() => {
        if (!isAutoPlayingFaq || faqItems.length === 0) return;
        const interval = setInterval(() => {
            setFaqIndex((prev) => (prev + faqCardsPerView >= faqItems.length ? 0 : prev + faqCardsPerView));
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlayingFaq, faqItems.length]);

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
    }, [contactContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    company: "",
                    email: "",
                    phone: "",
                    inquiryType: "",
                    message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={contactContent.hero?.backgroundImage}
                        alt="Contact Hero"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        {contactContent.hero?.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight reveal" style={{ transitionDelay: "100ms" }}>
                        {contactContent.hero?.title} <span className={`text-brand italic font-serif ${language === 'ar' ? 'text-2xl md:text-3xl block mt-4 not-italic' : ''}`}>{contactContent.hero?.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto reveal" style={{ transitionDelay: "200ms" }}>
                        {contactContent.hero?.subtitle}
                    </p>
                </div>
            </header>

            {/* Main Content Grid */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-16">
                        {/* Intro */}
                        <div className="reveal">
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{contactContent.form?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-6">{contactContent.form?.headline}</h3>
                            <p className="text-gray-600 font-light text-lg leading-relaxed">
                                {contactContent.form?.subtitle}
                            </p>
                        </div>

                        {/* Quick Contacts */}
                        <div className="grid sm:grid-cols-2 gap-8 reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="p-6 bg-gray-50 border-l-4 border-brand">
                                <h4 className="font-bold text-onyx mb-1">{contactContent.quickContact?.phoneWorldwideLabel || "Türkiye"}</h4>
                                <p className="text-gray-600 font-mono text-sm mb-4 dir-ltr" dir="ltr">{contactContent.quickContact?.phoneWorldwide}</p>
                                <h4 className="font-bold text-onyx mb-1">{contactContent.quickContact?.phoneQatarLabel || "Qatar & Gulf"}</h4>
                                <p className="text-gray-600 font-mono text-sm mb-4 dir-ltr" dir="ltr">{contactContent.quickContact?.phoneQatar}</p>
                                <h4 className="font-bold text-onyx mb-1">{t.emailInquiry}</h4>
                                <p className="text-gray-600 font-mono text-sm break-all">{contactContent.quickContact?.email}</p>
                            </div>
                            <div className="p-6 bg-gray-50 border-l-4 border-gray-300">
                                <h4 className="font-bold text-onyx mb-1">{t.officeHours}</h4>
                                <p className="text-gray-600 text-sm mb-4">{contactContent.quickContact?.officeHours}</p>
                                <h4 className="font-bold text-onyx mb-1">{t.responseTime}</h4>
                                <p className="text-gray-600 text-sm">{t.within24Hours}</p>
                            </div>
                        </div>

                        {/* Headquarters */}
                        <div className="reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-onyx text-brand flex items-center justify-center rounded-full shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif text-onyx mb-2">{contactContent.headquarters?.title}</h4>
                                    <p className="text-gray-600 leading-relaxed font-light whitespace-pre-line">
                                        {contactContent.headquarters?.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="reveal mt-8 pt-6 border-t border-gray-200" style={{ transitionDelay: "300ms" }}>
                            <h4 className="font-bold text-onyx mb-4">{t.followUs || "Follow Us"}</h4>
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/company/governvalu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-brand text-gray-600 hover:text-white flex items-center justify-center rounded-full transition-all duration-300" aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a href="https://x.com/governvalu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-brand text-gray-600 hover:text-white flex items-center justify-center rounded-full transition-all duration-300" aria-label="X (Twitter)">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/governvalu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-brand text-gray-600 hover:text-white flex items-center justify-center rounded-full transition-all duration-300" aria-label="Instagram">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/governvalu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-brand text-gray-600 hover:text-white flex items-center justify-center rounded-full transition-all duration-300" aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-brand text-gray-600 hover:text-white flex items-center justify-center rounded-full transition-all duration-300" aria-label="WhatsApp">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 shadow-2xl shadow-gray-200/50 border-t-4 border-brand reveal relative" style={{ transitionDelay: "200ms" }}>
                        <div className="mb-8">
                            <h3 className="text-2xl font-serif text-onyx mb-2">{contactContent.form?.formTitle}</h3>
                            <p className="text-sm text-gray-500">{contactContent.form?.formSubtitle}</p>
                        </div>

                        {status === "success" ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center animate-fade-in">
                                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h4 className="text-lg font-bold mb-2">{t.successTitle}</h4>
                                <p className="text-sm">{t.successMessage}</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-green-700 font-semibold hover:underline text-sm"
                                >
                                    {t.sendAnother}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.firstName}</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.lastName}</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.companyName}</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                                        placeholder="Company Name"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.emailAddress}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.phoneNumber}</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="+974 ..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.natureOfInquiry}</label>
                                    <select
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent"
                                    >
                                        <option value="" disabled>{t.selectTopic}</option>
                                        {contactContent.form?.inquiryOptions?.map((option: string, i: number) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.messageDetails}</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full border-b border-gray-300 py-2 focus:border-brand focus:outline-none transition-colors bg-transparent placeholder-gray-300 resize-none"
                                        placeholder="How can we assist you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-onyx text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-brand transition-colors duration-300 disabled:opacity-50"
                                >
                                    {status === "submitting" ? t.sending : t.submitInquiry}
                                </button>

                                {status === "error" && (
                                    <p className="text-red-500 text-sm text-center">{t.errorMessage}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>


            {/* FAQ Section - Carousel */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{contactContent.faq?.sectionTitle}</h2>
                            <h3 className="text-4xl font-serif text-onyx">{contactContent.faq?.headline}</h3>
                            <div className="w-16 h-1 bg-brand mt-4" />
                        </div>

                        {/* Navigation Arrows */}
                        {faqItems.length > faqCardsPerView && (
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setIsAutoPlayingFaq(false);
                                        setFaqIndex((prev) => (prev === 0 ? Math.max(0, faqItems.length - faqCardsPerView) : prev - faqCardsPerView));
                                    }}
                                    className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all duration-300 group bg-white"
                                    aria-label="Previous"
                                >
                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAutoPlayingFaq(false);
                                        setFaqIndex((prev) => (prev + faqCardsPerView >= faqItems.length ? 0 : prev + faqCardsPerView));
                                    }}
                                    className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all duration-300 group bg-white"
                                    aria-label="Next"
                                >
                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Carousel Container */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${faqIndex * (100 / faqCardsPerView)}%)` }}
                        >
                            {faqItems.map((faq: any, index: number) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/2 flex-shrink-0 px-3"
                                >
                                    <div className="p-8 bg-white border-l-4 border-brand shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                        <h3 className="font-bold text-onyx mb-4 text-lg">{faq.question}</h3>
                                        <p className="text-gray-500 font-light text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    {faqItems.length > faqCardsPerView && (
                        <div className="flex items-center justify-center gap-2 mt-10">
                            {Array.from({ length: Math.ceil(faqItems.length / faqCardsPerView) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setIsAutoPlayingFaq(false);
                                        setFaqIndex(idx * faqCardsPerView);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(faqIndex / faqCardsPerView) === idx
                                        ? "bg-brand w-8"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to FAQ group ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[500px] bg-gray-200 relative">
                <iframe
                    src={contactContent.map?.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(100%) contrast(1.2) opacity(0.8)" }}
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0"
                ></iframe>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-2xl max-w-md text-center reveal">
                    <h3 className="text-2xl font-serif text-onyx mb-2">{contactContent.map?.headline}</h3>
                    <p className="text-gray-600 font-light mb-4">
                        {contactContent.map?.description}
                    </p>
                    <a
                        href="https://goo.gl/maps/example"
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                        {t.getDirections}
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
