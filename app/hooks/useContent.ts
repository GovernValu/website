"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

export function useContent<T>(pageName: string) {
    const { language, isReady } = useLanguage();
    const [content, setContent] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Don't fetch until language context is ready (initialized from cookies)
        if (!isReady) {
            return;
        }

        async function fetchContent() {
            try {
                setLoading(true);
                const res = await fetch(`/api/content/${pageName}?lang=${language}`, { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [pageName, language, isReady]);

    return { content, loading, error };
}
