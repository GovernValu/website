"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { LABELS } from "@/lib/i18n";

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-brand rounded-md transition-all duration-300 font-serif"
            aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
        >
            <span className="uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
            <span className="w-px h-3 bg-gray-600"></span>
            <span className="text-xs">{LABELS[language].switchLanguage}</span>
        </button>
    );
}
