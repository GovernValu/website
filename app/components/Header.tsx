"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-onyx/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-brand flex items-center justify-center text-white font-serif text-xl font-bold rounded-sm">
                            G
                        </div>
                        <span className="text-white font-serif text-xl tracking-wide font-semibold">
                            Govern<span className="text-brand">Valu</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-10">
                            {/* About Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                            >
                                <button className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1.5">
                                    About
                                    <svg className={`w-3 h-3 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className={`absolute top-full left-0 mt-2 w-56 bg-onyx-800 border border-gray-800 shadow-2xl transition-all duration-200 ${aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                    <div className="py-2">
                                        <Link href="/about/board" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors border-l-2 border-transparent hover:border-brand">
                                            Board & Directors
                                        </Link>
                                        <Link href="/about" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors border-l-2 border-transparent hover:border-brand">
                                            Who We Are
                                        </Link>
                                        <Link href="/about/philosophy" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors border-l-2 border-transparent hover:border-brand">
                                            Philosophy
                                        </Link>
                                        <Link href="/about/expertise" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors border-l-2 border-transparent hover:border-brand">
                                            Expertise
                                        </Link>
                                        <Link href="/about/teams" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-brand/10 transition-colors border-l-2 border-transparent hover:border-brand">
                                            Teams
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/services" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                Services
                            </Link>
                            <Link href="/industries" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                Industries
                            </Link>
                            <Link href="/partners" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                Partners
                            </Link>
                            <Link href="/news" className="hover-underline-animation text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors">
                                News
                            </Link>
                            <Link href="/contact" className="px-6 py-2.5 border border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 text-sm font-medium uppercase tracking-wider">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex lg:hidden">
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
                            About
                            <svg className={`w-5 h-5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${aboutDropdownOpen ? 'max-h-80' : 'max-h-0'}`}>
                            <Link href="/about/board" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">Board & Directors</Link>
                            <Link href="/about" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">Who We Are</Link>
                            <Link href="/about/philosophy" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">Philosophy</Link>
                            <Link href="/about/expertise" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">Expertise</Link>
                            <Link href="/about/teams" className="block px-6 py-3 text-sm text-gray-400 hover:text-brand">Teams</Link>
                        </div>
                    </div>

                    <Link href="/services" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">Services</Link>
                    <Link href="/industries" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">Industries</Link>
                    <Link href="/partners" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">Partners</Link>
                    <Link href="/news" className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-brand border-b border-gray-800">News</Link>
                    <Link href="/contact" className="block px-3 py-4 text-base font-medium text-brand font-bold">Contact</Link>
                </div>
            </div>
        </nav>
    );
}
