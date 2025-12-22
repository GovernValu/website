"use client";

import { useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BoardPage() {
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

    const boardMembers = [
        {
            name: "Prof. Dr. Samir Abdelaziz, PhD",
            role: "Board Chairman",
            specialty: "Governance & Investment",
            image: "/board/chairman.jpg",
            isChairman: true
        },
        {
            name: "Prof. Dr. Ehab El Shamy, PhD",
            role: "Board Member",
            specialty: "Banking & Finance",
            image: "/board/ehab-el-shamy.jpeg",
            isChairman: false
        },
        {
            name: "Mr. Ahmed Al Bana",
            role: "Board Member",
            specialty: "Investment & Valuation",
            image: "/board/ahmed-al-bana.jpeg",
            isChairman: false
        },
        {
            name: "Dr. Saad Azm, PhD",
            role: "Board Member",
            specialty: "Accreditation & Quality",
            image: "/board/saad-azm.jpg",
            isChairman: false
        },
        {
            name: "Prof. Dr. Habib Hamam, PhD",
            role: "Board Member",
            specialty: "Digital Transformation",
            image: "/board/habib-hamam.jpg",
            isChairman: false
        },
        {
            name: "Dr. Yasser Fathy, PhD",
            role: "Board Member",
            specialty: "Analysis, Reputation Management, and Development",
            image: "/board/yasser-fathy.jpg",
            isChairman: false
        },
        {
            name: "Mr. Saleh Ghalayeni",
            role: "Board Member",
            specialty: "Business Development",
            image: "/board/saleh-ghalayeni.jpg",
            isChairman: false
        }
    ];

    const chairman = boardMembers[0];
    const otherMembers = boardMembers.slice(1);

    return (
        <>
            <Header />

            {/* Hero Section */}
            <header className="relative h-[60vh] flex items-center justify-center bg-onyx">
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-800 to-onyx" />
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6 reveal">
                        Leadership
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight reveal" style={{ transitionDelay: "100ms" }}>
                        Board of<br />
                        <span className="italic text-brand font-serif">Directors.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed reveal" style={{ transitionDelay: "200ms" }}>
                        Meet the distinguished leadership team driving our commitment to governance excellence.
                    </p>
                </div>
            </header>

            {/* Chairman's Message Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-16 items-start">
                        {/* Chairman Image */}
                        <div className="lg:col-span-2 reveal">
                            <div className="relative">
                                <div className="absolute top-4 -left-4 w-full h-full border border-brand/20 z-0" />
                                <div className="relative z-10 bg-gray-100 shadow-2xl overflow-hidden">
                                    <Image
                                        src={chairman.image}
                                        alt={chairman.name}
                                        width={500}
                                        height={600}
                                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-serif text-onyx">{chairman.name}</h3>
                                    <p className="text-brand text-sm font-bold tracking-widest uppercase mt-2">{chairman.role}</p>
                                    <p className="text-gray-500 text-sm mt-1">{chairman.specialty}</p>
                                </div>
                            </div>
                        </div>

                        {/* Chairman's Message */}
                        <div className="lg:col-span-3 reveal" style={{ transitionDelay: "100ms" }}>
                            <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Chairman&apos;s Message</h2>
                            <h3 className="text-4xl font-serif text-onyx mb-8 leading-tight">
                                A Word from Our Chairman
                            </h3>

                            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    Firstly, I would like to express my sincere gratitude to all our current and future clients, and I am honored to introduce our company according to the following concepts:
                                </p>

                                <blockquote className="border-l-4 border-brand pl-6 py-2 my-8 bg-gray-50">
                                    <p className="text-xl font-serif text-onyx italic">
                                        &ldquo;At GovernValu, we believe that governance is not a regulatory burden, but a strategic enabler of value, trust, and sustainability.&rdquo;
                                    </p>
                                </blockquote>

                                <p>
                                    We believe that we are a governance-first investment advisory firm, not just a consulting provider.
                                </p>

                                <p>
                                    Our firm was established to bridge the gap between international best practices and regional realities, offering advisory solutions that are practical, credible, and impact-driven.
                                </p>

                                <p>
                                    We are committed to working with our clients as trusted advisors, supporting them in navigating complexity, managing risk, and unlocking sustainable growth.
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-1 bg-brand"></div>
                                    <div>
                                        <p className="font-serif text-onyx text-lg">{chairman.name}</p>
                                        <p className="text-gray-500 text-sm">{chairman.role}, GovernValu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-onyx-800">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <svg className="w-10 h-10 text-brand mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed italic mb-6">
                        &ldquo;Governance is not a regulatory burden, but a strategic enabler of value, trust, and sustainability.&rdquo;
                    </blockquote>
                    <div className="text-brand text-sm font-bold tracking-widest uppercase">{chairman.name}</div>
                </div>
            </section>

            {/* Board Members Section */}
            <section className="py-24 bg-white text-onyx">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Board of Directors</h2>
                        <h3 className="text-4xl font-serif text-onyx">Our Distinguished Board Members</h3>
                        <div className="w-24 h-1 bg-brand mx-auto mt-6"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {otherMembers.map((member, index) => (
                            <div key={index} className="group reveal text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                                {/* Member Image */}
                                <div className="relative mx-auto w-48 h-48 mb-8">
                                    <div className="absolute inset-0 border-2 border-brand/20 rounded-full transform rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100 shadow-xl">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    {/* Decorative accent */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Member Info */}
                                <div className="space-y-2">
                                    <h4 className="text-xl font-serif text-onyx group-hover:text-brand transition-colors duration-300">{member.name}</h4>
                                    <p className="text-brand text-xs font-bold tracking-[0.15em] uppercase">{member.role}</p>
                                    <div className="w-8 h-px bg-gray-300 mx-auto my-3"></div>
                                    <p className="text-gray-500 text-sm font-light">{member.specialty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Principles Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Commitment</h2>
                        <h3 className="text-4xl font-serif text-onyx">Leadership Principles</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 border-t-4 border-brand shadow-lg reveal">
                            <div className="w-14 h-14 bg-brand/5 rounded-full flex items-center justify-center mb-8">
                                <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-serif text-onyx mb-4">Governance-First Approach</h4>
                            <p className="text-gray-600 font-light leading-relaxed">We are a governance-first investment advisory firm, placing governance at the center of all our advisory work.</p>
                        </div>

                        <div className="bg-white p-10 border-t-4 border-brand shadow-lg reveal" style={{ transitionDelay: "100ms" }}>
                            <div className="w-14 h-14 bg-brand/5 rounded-full flex items-center justify-center mb-8">
                                <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-serif text-onyx mb-4">Bridging Best Practices</h4>
                            <p className="text-gray-600 font-light leading-relaxed">We bridge international best practices with regional realities, offering practical and credible solutions.</p>
                        </div>

                        <div className="bg-white p-10 border-t-4 border-brand shadow-lg reveal" style={{ transitionDelay: "200ms" }}>
                            <div className="w-14 h-14 bg-brand/5 rounded-full flex items-center justify-center mb-8">
                                <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-serif text-onyx mb-4">Trusted Partnership</h4>
                            <p className="text-gray-600 font-light leading-relaxed">We are committed to working as trusted advisors, supporting clients through complexity toward sustainable growth.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-onyx">
                <div className="max-w-4xl mx-auto px-6 text-center reveal">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Ready to partner with <span className="text-brand">us</span>?
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-10">
                        Let us support you in navigating complexity and unlocking sustainable growth.
                    </p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-brand text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-dark transition-colors">
                        Contact Us
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
