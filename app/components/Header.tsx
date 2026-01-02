"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    const { language, direction } = useLanguage();
    const t = LABELS[language];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-onyx/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`} dir={direction}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <Image
                            src="/logonew.png"
                            alt="GovernValu"
                            width={240}
                            height={72}
                            className="h-12 w-auto object-contain"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-center space-x-10 rtl:space-x-reverse">
                            {/* About Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                            >
                                <button className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1.5 h-full">
                                    {t.about}
                                    <svg className={`w-3 h-3 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className={`absolute top-full ${direction === 'rtl' ? 'right-0' : 'left-0'} mt-0 w-56 bg-onyx-800 border border-gray-800 shadow-2xl transition-all duration-200 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}>
                                    <div className="py-2">
                                        <Link href="/about/chairman" className={`block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors ${direction === 'rtl' ? 'border-r-2 text-right' : 'border-l-2 text-left'} border-transparent hover:border-brand`}>
                                            {t.chairmanMessage}
                                        </Link>
                                        <Link href="/about" className={`block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors ${direction === 'rtl' ? 'border-r-2 text-right' : 'border-l-2 text-left'} border-transparent hover:border-brand`}>
                                            {t.whoWeAre}
                                        </Link>
                                        <Link href="/about/strategic-concept" className={`block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors ${direction === 'rtl' ? 'border-r-2 text-right' : 'border-l-2 text-left'} border-transparent hover:border-brand`}>
                                            {t.strategicConcept}
                                        </Link>
                                        <Link href="/about/board" className={`block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors ${direction === 'rtl' ? 'border-r-2 text-right' : 'border-l-2 text-left'} border-transparent hover:border-brand`}>
                                            {t.board}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/services" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                {t.services}
                            </Link>
                            <Link href="/partners" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                {t.partnerships}
                            </Link>
                            <Link href="/clients" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                {t.ourClients}
                            </Link>
                            <Link href="/blog" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                {t.news}
                            </Link>
                            <Link href="/contact" className="px-6 py-2.5 border border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 text-sm font-medium uppercase tracking-wider">
                                {t.contact}
                            </Link>

                            {/* Language Switcher - with explicit RTL spacing */}
                            <div className="ms-2">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex lg:hidden items-center gap-4">
                        <LanguageSwitcher />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden bg-onyx-900 absolute w-full border-b border-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {/* About Section */}
                    <div className="border-b border-gray-800">
                        <button
                            onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                            className="flex items-center justify-between w-full px-3 py-4 text-base font-medium text-gray-300"
                        >
                            {t.about}
                            <svg className={`w-5 h-5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${aboutDropdownOpen ? 'max-h-80' : 'max-h-0'}`}>
                            <Link href="/about/chairman" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">
                                {t.chairmanMessage}
                            </Link>
                            <Link href="/about" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">
                                {t.whoWeAre}
                            </Link>
                            <Link href="/about/strategic-concept" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">
                                {t.strategicConcept}
                            </Link>
                            <Link href="/about/board" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">
                                {t.board}
                            </Link>
                        </div>
                    </div>

                    <Link href="/services" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">{t.services}</Link>
                    <Link href="/partners" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">{t.partnerships}</Link>
                    <Link href="/clients" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">{t.ourClients}</Link>
                    <Link href="/blog" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">{t.news}</Link>
                    <Link href="/contact" className="block px-3 py-4 text-base font-medium text-brand font-bold">{t.contact}</Link>
                </div>
            </div>
        </nav>
    );
}
