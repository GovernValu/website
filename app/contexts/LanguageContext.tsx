"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Language, Direction, DEFAULT_LANGUAGE, LANGUAGE_COOKIE_NAME, getDirection } from "@/lib/i18n";

interface LanguageContextType {
    language: Language;
    direction: Direction;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Initialize from cookie or browser preference
        const savedLang = Cookies.get(LANGUAGE_COOKIE_NAME) as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang);
            document.documentElement.lang = savedLang;
            document.documentElement.dir = getDirection(savedLang);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        Cookies.set(LANGUAGE_COOKIE_NAME, lang, { expires: 365 });
        document.documentElement.lang = lang;
        document.documentElement.dir = getDirection(lang);
        window.location.reload(); // Reload to refresh all content
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                direction: getDirection(language),
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
