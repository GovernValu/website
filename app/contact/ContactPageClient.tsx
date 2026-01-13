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
                        {contactContent.hero?.title} <span className="text-brand italic font-serif">{contactContent.hero?.titleHighlight}</span>
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
                                <h4 className="font-bold text-onyx mb-1">{contactContent.quickContact?.phoneWorldwideLabel || "Worldwide"}</h4>
                                <p className="text-gray-600 font-mono text-sm mb-4 dir-ltr">{contactContent.quickContact?.phoneWorldwide}</p>
                                <h4 className="font-bold text-onyx mb-1">{contactContent.quickContact?.phoneQatarLabel || "Qatar & Gulf"}</h4>
                                <p className="text-gray-600 font-mono text-sm mb-4 dir-ltr">{contactContent.quickContact?.phoneQatar}</p>
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

            {/* Regional Offices */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{contactContent.regionalOffices?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{contactContent.regionalOffices?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {settingsContent.regionalOffices?.map((office: any, index: number) => (
                            <div key={index} className="group relative h-[400px] overflow-hidden shadow-xl reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                                <img
                                    src={office.image}
                                    alt={office.city}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                    <h4 className="text-2xl font-serif mb-2">{office.city}</h4>
                                    <p className="text-sm text-gray-300 uppercase tracking-widest mb-4">{office.country}</p>
                                    <div className="space-y-1 text-sm font-light text-gray-200">
                                        <p>{office.address}</p>
                                        <p><a href={`mailto:${office.email}`} className="hover:text-brand transition-colors">{office.email}</a></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{contactContent.faq?.sectionTitle}</h2>
                        <h3 className="text-4xl font-serif text-onyx">{contactContent.faq?.headline}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {contactContent.faq?.items?.map((faq: any, index: number) => (
                            <div
                                key={index}
                                className="p-6 bg-white border-l-4 border-brand hover:bg-gray-50 transition-colors reveal"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <h3 className="font-bold text-onyx mb-2">{faq.question}</h3>
                                <p className="text-gray-500 font-light text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
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
