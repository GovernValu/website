"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        inquiry: "Corporate Governance Audit",
        message: "",
        privacy: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        alert("Thank you for your inquiry. Our team will contact you within 24 hours.");
    };

    return (
        <>
            <Header />

            {/* Hero Section with Video/Image Background */}
            <header className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                        alt="Corporate Building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx/90 to-onyx/70" />
                </div>

                {/* Animated Lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 py-2 px-4 border border-brand/30 rounded-full bg-brand/5 backdrop-blur-sm mb-8 reveal">
                        <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                        <span className="text-brand text-xs font-bold tracking-[0.2em] uppercase">Available for Consultation</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Let&apos;s Build <br />
                        <span className="italic text-brand font-serif">Together.</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-gray-400 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        Begin a confidential dialogue with our senior partners about your governance and investment objectives.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-16 bg-gradient-to-b from-brand to-transparent" />
                </div>
            </header>

            {/* Quick Contact Bar */}
            <section className="bg-brand py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                            <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="font-medium">+90 553 775 16 48</span>
                            </a>
                            <a href="mailto:info@governvalu.com" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">info@governvalu.com</span>
                            </a>
                        </div>
                        <div className="text-white/80 text-sm">
                            <span className="font-medium text-white">Istanbul, Türkiye</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Form Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Left Side - Info */}
                        <div className="lg:col-span-2 reveal">
                            <span className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Contact Us</span>
                            <h2 className="text-4xl font-serif text-onyx mb-6">Start Your Journey</h2>
                            <p className="text-gray-600 font-light leading-relaxed mb-10">
                                Whether you&apos;re seeking governance optimization, investment advisory, or strategic counsel, our senior partners are ready to listen.
                            </p>

                            {/* Headquarters */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-4">Headquarters</h3>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-lg text-onyx mb-1">Istanbul, Türkiye</h4>
                                        <p className="text-gray-500 text-sm font-light leading-relaxed">
                                            GovernValu Investment and Consulting<br />
                                            Company Limited
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Numbers */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-4">Mob. & WhatsApp</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-brand" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-light">Worldwide</p>
                                            <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="font-serif text-onyx hover:text-brand transition-colors">+90 553 775 16 48</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-light">For Qatar & the Gulf</p>
                                            <a href="tel:+97433787934" className="font-serif text-onyx hover:text-brand transition-colors">+974 3378 7934</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-4">E-mail Us</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-light">General Inquiries</p>
                                            <a href="mailto:info@governvalu.com" className="font-serif text-onyx hover:text-brand transition-colors">info@governvalu.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand/5 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-light">For a Quotation</p>
                                            <a href="mailto:quote@governvalu.com" className="font-serif text-onyx hover:text-brand transition-colors">quote@governvalu.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Promise */}
                            <div className="p-6 bg-gray-50 border-l-4 border-brand">
                                <div className="flex items-center gap-3 mb-3">
                                    <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-bold text-onyx">24-Hour Response</span>
                                </div>
                                <p className="text-sm text-gray-500 font-light">
                                    Our team responds to all inquiries within one business day. Urgent matters are prioritized.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-10 border-t border-gray-100">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-4">Connect With Us</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-brand rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-brand rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:col-span-3 reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="bg-onyx p-10 md:p-12 shadow-2xl relative overflow-hidden">
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-brand/20" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-brand/20" />

                                <h2 className="text-2xl font-serif text-white mb-2">Request a Consultation</h2>
                                <p className="text-gray-500 font-light mb-8">
                                    All communications are treated with strict confidentiality.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">First Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white placeholder-gray-600"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Last Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white placeholder-gray-600"
                                                placeholder="Smith"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white placeholder-gray-600"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white placeholder-gray-600"
                                                placeholder="+90 555 000 0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Company / Organization</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white placeholder-gray-600"
                                            placeholder="Your Company Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Nature of Inquiry *</label>
                                        <select
                                            required
                                            value={formData.inquiry}
                                            onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                                            className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white cursor-pointer"
                                        >
                                            <option className="bg-onyx">Corporate Governance Audit</option>
                                            <option className="bg-onyx">Investment Advisory</option>
                                            <option className="bg-onyx">Risk & Compliance</option>
                                            <option className="bg-onyx">Valuation Services</option>
                                            <option className="bg-onyx">Institutional Development</option>
                                            <option className="bg-onyx">Digital Transformation</option>
                                            <option className="bg-onyx">Speaking Engagement / Media</option>
                                            <option className="bg-onyx">General Inquiry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 block">Message</label>
                                        <textarea
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-gray-700 px-4 py-3 focus:outline-none focus:border-brand transition-colors text-white resize-none placeholder-gray-600"
                                            placeholder="Tell us about your requirements..."
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="privacy"
                                                required
                                                checked={formData.privacy}
                                                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                                                className="accent-brand w-4 h-4 mt-0.5"
                                            />
                                            <label htmlFor="privacy" className="text-xs text-gray-500">
                                                I agree to the <a href="#" className="text-brand hover:underline">Privacy Policy</a> and consent to being contacted.
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-brand text-white uppercase tracking-widest text-sm font-bold hover:bg-brand-dark transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Request
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Common Questions</h2>
                        <h3 className="text-4xl font-serif text-onyx">Frequently Asked</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "What industries do you serve?",
                                answer: "We serve governments, corporates, financial institutions, NGOs, and international organizations across the MENA region and globally."
                            },
                            {
                                question: "What international standards do you follow?",
                                answer: "Our services align with OECD, ISO, COSO, and IFC frameworks, tailored to the regulatory context of each market."
                            },
                            {
                                question: "Are virtual consultations available?",
                                answer: "Yes. We use encrypted, secure channels for all virtual briefings. However, we recommend an initial in-person discovery session."
                            },
                            {
                                question: "How long does a typical engagement last?",
                                answer: "Governance audits typically span 8-12 weeks. Ongoing advisory retainers are structured annually with quarterly reviews."
                            }
                        ].map((faq, index) => (
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

            <Footer />
        </>
    );
}
