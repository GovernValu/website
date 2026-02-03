"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { useContent } from "../hooks/useContent";
import { LABELS } from "@/lib/i18n";

export default function Footer() {
    const { language, direction } = useLanguage();
    const { content } = useContent<any>('settings');
    const t = LABELS[language];

    // Fallback if content isn't loaded yet
    const contact = content?.contact || {
        phone: "+974 4412 3456",
        email: "info@governvalu.com",
        address: { line1: "West Bay, Doha, Qatar" }
    };

    return (
        <footer className="bg-onyx border-t border-gray-800 pt-20 pb-10 text-gray-400 text-sm" dir={direction}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-brand flex items-center justify-center text-white font-serif text-lg font-bold rounded-sm">G</div>
                            <span className="text-white font-serif text-xl tracking-wide">Govern<span className="text-brand">Valu</span></span>
                        </Link>
                        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">GOVERNVALU YÖNETİM DANIŞMANLIĞI TİCARET LİMİTED ŞİRKETİ</p>
                        <p className="max-w-sm font-light leading-relaxed mb-6">
                            {content?.footerBlurb || "Strategic Governance for Sustainable Investments."}
                        </p>
                        <div className="flex items-center gap-4 text-gray-500 mb-3">
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Istanbul, Türkiye</span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.contact}</h5>
                        <ul className="space-y-3 font-light">
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <div>
                                    <span className="text-gray-500 text-xs">Türkiye</span><br />
                                    <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors dir-ltr block" dir="ltr">+90 553 775 16 48</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <span className="text-gray-500 text-xs">Qatar & Gulf</span><br />
                                    <a href="tel:+97433787934" className="hover:text-brand transition-colors dir-ltr block" dir="ltr">+974 3378 7934</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contact.email}`} className="hover:text-brand transition-colors">{contact.email}</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div>
                                    <span className="text-gray-500 text-xs">Quotations</span><br />
                                    <a href="mailto:quote@governvalu.com" className="hover:text-brand transition-colors">quote@governvalu.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.about}</h5>
                        <ul className="space-y-3 font-light">
                            <li><Link href="/about/chairman" className="hover:text-brand transition-colors">{t.chairmanMessage}</Link></li>
                            <li><Link href="/about" className="hover:text-brand transition-colors">{t.whoWeAre}</Link></li>
                            <li><Link href="/about/strategic-concept" className="hover:text-brand transition-colors">{t.strategicConcept}</Link></li>
                            <li><Link href="/about/board" className="hover:text-brand transition-colors">{t.board}</Link></li>
                        </ul>
                    </div>

                    {/* Services & Legal Links */}
                    <div>
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">{t.services}</h5>
                        <ul className="space-y-3 font-light">
                            <li><Link href="/services" className="hover:text-brand transition-colors">{t.corpGov}</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">{t.invRel}</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">{t.valuation}</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">{t.riskMgmt}</Link></li>
                            <li><Link href="/contact" className="hover:text-brand transition-colors">{t.contact}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} GovernValu. {t.copyright}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="https://www.linkedin.com/company/governvalu/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="https://x.com/governvalu" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="X (Twitter)">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/governvalu/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/governvalu" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="WhatsApp">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
