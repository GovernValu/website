export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export const LANGUAGES: Language[] = ['en', 'ar'];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_COOKIE_NAME = 'governvalu_lang';

export function getDirection(lang: Language): Direction {
    return lang === 'ar' ? 'rtl' : 'ltr';
}

export function isValidLanguage(lang: string): lang is Language {
    return LANGUAGES.includes(lang as Language);
}

export const LABELS = {
    en: {
        dir: 'ltr',
        switchLanguage: 'العربية',
        copyright: 'All rights reserved.',
        contact: 'Contact',
        about: 'About',
        services: 'Services',
        industries: 'Industries',
        partners: 'Partners',
        news: 'News',
        board: 'Board & Directors',
        whoWeAre: 'Who We Are',
        philosophy: 'Philosophy',
        expertise: 'Expertise',
        teams: 'Teams',
        corpGov: 'Corporate Governance',
        invRel: 'Investment Relations',
        valuation: 'Valuation Services',
        riskMgmt: 'Risk Management',
    },
    ar: {
        dir: 'rtl',
        switchLanguage: 'English',
        copyright: 'جميع الحقوق محفوظة.',
        contact: 'اتصل بنا',
        about: 'عن الشركة',
        services: 'خدماتنا',
        industries: 'القطاعات',
        partners: 'الشركاء',
        news: 'الأخبار',
        board: 'مجلس الإدارة',
        whoWeAre: 'من نحن',
        philosophy: 'فلسفتنا',
        expertise: 'خبراتنا',
        teams: 'فرق العمل',
        corpGov: 'حوقمة الشركات',
        invRel: 'علاقات المستثمرين',
        valuation: 'خدمات التقييم',
        riskMgmt: 'إدارة المخاطر',
    }
} as const;
