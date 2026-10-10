"use client";

import { useEffect, useState } from "react";

export interface PageStatus {
    id: string;
    updatedAt: string | null;
    inDatabase: boolean;
    sharedItems: number | null;
    summary: { total: number; missing: number; count: number; same: number };
    issues: { path: string; kind: "missing" | "count" | "same"; detail: string }[];
}

/** Last-edit time and English/Arabic parity for every CMS page. */
export function useContentStatus() {
    const [pages, setPages] = useState<Record<string, PageStatus>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/admin/content-status", { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : { pages: [] }))
            .then((data: { pages: PageStatus[] }) => {
                if (cancelled) return;
                setPages(Object.fromEntries(data.pages.map((page) => [page.id, page])));
            })
            .catch(() => undefined)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { pages, loading };
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 365 * 24 * 3600],
    ["month", 30 * 24 * 3600],
    ["week", 7 * 24 * 3600],
    ["day", 24 * 3600],
    ["hour", 3600],
    ["minute", 60],
];

/** "3 days ago", "just now". */
export function timeAgo(iso: string | null): string {
    if (!iso) return "Never edited";
    const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
    const format = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const [unit, size] of UNITS) {
        if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    }
    return "just now";
}
