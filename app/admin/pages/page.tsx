"use client";

import { useState } from "react";
import Link from "next/link";
import { CMS_PAGES } from "@/lib/cms-pages";
import { SHARED_LISTS } from "@/lib/bilingual";
import { timeAgo, useContentStatus } from "../lib/useContentStatus";
import TranslationBadge from "../components/TranslationBadge";

export default function PagesListPage() {
    const { pages: status, loading } = useContentStatus();
    const [query, setQuery] = useState("");
    const search = query.trim().toLowerCase();
    const visible = CMS_PAGES.filter(
        (page) => !search || `${page.name} ${page.description}`.toLowerCase().includes(search)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">Pages</h1>
                    <p className="text-gray-400 mt-1">Manage content for all website pages in English and Arabic</p>
                </div>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search pages…"
                    className="w-full max-w-xs rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
                />
            </div>

            {/* Pages Grid */}
            <div className="grid gap-3 md:grid-cols-2">
                {visible.map((page) => {
                    const pageStatus = status[page.id];
                    const shared = SHARED_LISTS[page.id];
                    return (
                        <Link
                            key={page.id}
                            href={`/admin/pages/${page.id}`}
                            className="group flex items-center justify-between gap-4 rounded-xl border border-gray-700 bg-gray-800 p-5 transition-colors hover:border-gray-500"
                        >
                            <div className="min-w-0">
                                <h3 className="text-base font-medium text-white group-hover:text-brand transition-colors">{page.name}</h3>
                                <p className="mt-0.5 truncate text-sm text-gray-400">{page.description}</p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {loading ? (
                                        <span className="h-5 w-28 animate-pulse rounded-full bg-gray-700" />
                                    ) : (
                                        <>
                                            <TranslationBadge status={pageStatus} />
                                            {shared && pageStatus?.sharedItems != null && (
                                                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-300">
                                                    {pageStatus.sharedItems} shared {shared.key}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-500">
                                                Updated {timeAgo(pageStatus?.updatedAt ?? null)}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <svg className="w-5 h-5 shrink-0 text-gray-500 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    );
                })}
            </div>

            {/* Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-medium mb-2">How it works</h3>
                <p className="text-gray-400 text-sm">
                    Page content is stored in the database in English and Arabic. Saving updates the live website
                    immediately. Lists such as client logos are shared, so each item is added once with both languages.
                    The badges show where the Arabic version is missing text or items compared to English.
                </p>
            </div>
        </div>
    );
}
