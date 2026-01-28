"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import ServicesCarousel from "./components/ServicesCarousel";
import HomeContactForm from "./components/HomeContactForm";
import { useContent } from "./hooks/useContent";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image: string;
  // Arabic fields
  titleAr?: string;
  subtitleAr?: string;
  descriptionAr?: string;
  buttonTextAr?: string;
}

// Icon mapping
const ICONS: Record<string, React.ReactNode> = {
  building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  bank: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

// Default slides (keep as fallback)
const defaultSlides: Slide[] = [
  {
    id: "default-1",
    title: "Precision in <br /><span class=\"italic text-brand font-serif\">Governance.</span>",
    subtitle: "Qatar-Based Advisory",
    description: "We architect resilient strategies for sovereign wealth funds, regional corporations, and distinguished family offices across the GCC.",
    buttonText: "Partner With Us",
    buttonLink: "/contact",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function Home() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const { content, loading: contentLoading } = useContent<any>('homepage');
  const { language } = useLanguage();
  const t = LABELS[language];

  // Fetch slides from API
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      }
    }
    fetchSlides();
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    // Delay initial check slightly to allow content render
    setTimeout(revealOnScroll, 100);

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, [content]); // Re-run when content loads

  if (contentLoading || !content) {
    return (
      <div className="flex bg-onyx h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section with Slider */}
      <HeroSlider slides={slides} />

      {/* Metrics Section */}
      <section className="bg-onyx py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {content.metrics?.map((metric: any, index: number) => (
            <div key={index} className="reveal border-r border-gray-800 last:border-r-0" style={{ transitionDelay: `${index * 100}ms` }}>
              <p className="text-4xl font-serif text-white mb-1">{metric.value}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Carousel Section */}
      <ServicesCarousel
        sectionTitle={content.expertise?.sectionTitle}
        headline={content.expertise?.headline}
      />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 bg-onyx-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <img
                src={content.philosophy?.image}
                alt={content.philosophy?.sectionTitle}
                className="grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border-b-4 border-brand w-full object-cover h-[600px]"
              />
            </div>
            <div className="reveal">
              <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase mb-4">{content.philosophy?.sectionTitle}</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                {content.philosophy?.headline}
              </h3>
              <div className="space-y-8">
                {content.philosophy?.points?.map((point: any, index: number) => (
                  <div key={index} className="flex gap-6">
                    <div className="w-12 h-px bg-brand mt-4 shrink-0" />
                    <div>
                      <h4 className="text-xl text-white font-serif mb-2">{point.title}</h4>
                      <p className="text-gray-400 font-light leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={content.philosophy?.link?.url} className="inline-flex items-center gap-2 mt-10 text-brand text-sm uppercase tracking-widest hover:text-white transition-colors">
                {content.philosophy?.link?.text}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-onyx-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
          <svg className="w-12 h-12 text-brand mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-3xl md:text-4xl font-serif text-white leading-relaxed italic mb-10">
            &ldquo;{content.testimonial?.quote}&rdquo;
          </blockquote>
          <a href="/contact" className="inline-block bg-brand text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand/90 transition-colors">
            {t.contactUs}
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="reveal">
            <h2 className="text-6xl font-serif text-onyx mb-6">
              {content.contact?.headline} <span className="text-brand">{content.contact?.headlineHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 max-w-md">
              {content.contact?.subtitle}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <p className="font-semibold text-onyx">{content.contact?.info?.address?.label}</p>
                  <p>{content.contact?.info?.address?.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <p className="font-semibold text-onyx">{content.contact?.info?.phone?.label}</p>
                  <p className="dir-ltr">{content.contact?.info?.phone?.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <p className="font-semibold text-onyx">{content.contact?.info?.email?.label}</p>
                  <p>{content.contact?.info?.email?.value}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 md:p-12 border-t-4 border-brand shadow-xl reveal" style={{ transitionDelay: "200ms" }}>
            <HomeContactForm t={t} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
