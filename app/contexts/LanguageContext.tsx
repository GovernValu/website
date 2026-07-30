"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Language, Direction, DEFAULT_LANGUAGE, LANGUAGE_COOKIE_NAME, getDirection } from "@/lib/i18n";

interface LanguageContextType {
    language: Language;
    direction: Direction;
    isReady: boolean;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Localized article URLs are authoritative so direct/shared links render
        // with matching navigation language even when no cookie exists.
        const savedLang = Cookies.get(LANGUAGE_COOKIE_NAME) as Language;
        const pathname = window.location.pathname;
        const articleRouteLang: Language | null = pathname.startsWith('/ar/blog/')
            ? 'ar'
            : pathname.startsWith('/blog/')
                ? 'en'
                : null;
        const initialLang = articleRouteLang
            || (savedLang && (savedLang === 'en' || savedLang === 'ar') ? savedLang : DEFAULT_LANGUAGE);

        setLanguageState(initialLang);
        Cookies.set(LANGUAGE_COOKIE_NAME, initialLang, { expires: 365 });
        document.documentElement.lang = initialLang;
        document.documentElement.dir = getDirection(initialLang);
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        Cookies.set(LANGUAGE_COOKIE_NAME, lang, { expires: 365 });
        document.documentElement.lang = lang;
        document.documentElement.dir = getDirection(lang);

        const url = new URL(window.location.href);
        if (lang === 'ar' && url.pathname.startsWith('/blog/')) {
            url.pathname = `/ar${url.pathname}`;
            window.location.assign(url.toString());
            return;
        }
        if (lang === 'en' && url.pathname.startsWith('/ar/blog/')) {
            url.pathname = url.pathname.replace(/^\/ar/, '');
            window.location.assign(url.toString());
            return;
        }

        window.location.reload(); // Reload to refresh all content
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                direction: getDirection(language),
                isReady: mounted,
                setLanguage,
                toggleLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
