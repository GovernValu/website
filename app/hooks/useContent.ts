"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

// Content fetched once per page load and reused across client-side navigation,
// so shared pieces like the footer don't refetch (and flash a spinner) on every click.
// Switching language reloads the page, which starts a fresh cache.
const cache = new Map<string, unknown>();
const pending = new Map<string, Promise<unknown>>();

function loadContent(key: string, url: string): Promise<unknown> {
    let request = pending.get(key);
    if (!request) {
        request = fetch(url, { cache: 'no-store' })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load ${key}`);
                return res.json();
            })
            .then((data) => {
                cache.set(key, data);
                return data;
            })
            .finally(() => pending.delete(key));
        pending.set(key, request);
    }
    return request;
}

export function useContent<T>(pageName: string) {
    const { language, isReady } = useLanguage();
    const key = `${pageName}:${language}`;
    const [result, setResult] = useState<{ key: string; content: T | null; error: boolean } | null>(() =>
        isReady && cache.has(key) ? { key, content: cache.get(key) as T, error: false } : null
    );

    useEffect(() => {
        // Don't fetch until language context is ready (initialized from cookies)
        if (!isReady) {
            return;
        }
        if (cache.has(key)) {
            setResult({ key, content: cache.get(key) as T, error: false });
            return;
        }

        let cancelled = false;
        loadContent(key, `/api/content/${pageName}?lang=${language}`)
            .then((data) => {
                if (!cancelled) setResult({ key, content: data as T, error: false });
            })
            .catch(() => {
                if (!cancelled) setResult({ key, content: null, error: true });
            });
        return () => {
            cancelled = true;
        };
    }, [key, pageName, language, isReady]);

    const current = result?.key === key ? result : null;
    return { content: current?.content ?? null, loading: !current, error: current?.error ?? false };
}
