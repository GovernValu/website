import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-onyx border-t border-gray-800 pt-20 pb-10 text-gray-400 text-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-brand flex items-center justify-center text-white font-serif text-lg font-bold rounded-sm">G</div>
                            <span className="text-white font-serif text-xl tracking-wide">Govern<span className="text-brand">Valu</span></span>
                        </Link>
                        <p className="max-w-sm font-light leading-relaxed mb-6">
                            Strategic Governance for Sustainable Investments. A governance-driven investment and consulting firm serving the MENA region and beyond.
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
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Contact</h5>
                        <ul className="space-y-3 font-light">
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <div>
                                    <span className="text-gray-500 text-xs">Worldwide</span><br />
                                    <a href="https://wa.me/905537751648" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">+90 553 775 16 48</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <span className="text-gray-500 text-xs">Qatar & Gulf</span><br />
                                    <a href="tel:+97433787934" className="hover:text-brand transition-colors">+974 3378 7934</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@governvalu.com" className="hover:text-brand transition-colors">info@governvalu.com</a>
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
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">About</h5>
                        <ul className="space-y-3 font-light">
                            <li><Link href="/about/board" className="hover:text-brand transition-colors">Board & Directors</Link></li>
                            <li><Link href="/about" className="hover:text-brand transition-colors">Who We Are</Link></li>
                            <li><Link href="/about/philosophy" className="hover:text-brand transition-colors">Philosophy</Link></li>
                            <li><Link href="/about/expertise" className="hover:text-brand transition-colors">Expertise</Link></li>
                            <li><Link href="/about/teams" className="hover:text-brand transition-colors">Teams</Link></li>
                        </ul>
                    </div>

                    {/* Services & Legal Links */}
                    <div>
                        <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Services</h5>
                        <ul className="space-y-3 font-light">
                            <li><Link href="/services" className="hover:text-brand transition-colors">Corporate Governance</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">Investment Relations</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">Valuation Services</Link></li>
                            <li><Link href="/services" className="hover:text-brand transition-colors">Risk Management</Link></li>
                            <li><Link href="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} GovernValu Investment and Consulting. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-brand transition-colors" aria-label="X (Twitter)">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
