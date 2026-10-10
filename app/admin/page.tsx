"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CMS_PAGES } from "@/lib/cms-pages";
import { timeAgo, useContentStatus } from "./lib/useContentStatus";
import TranslationBadge from "./components/TranslationBadge";

interface RecentContact {
    id: string;
    firstName: string;
    lastName: string;
    company: string | null;
    inquiry: string;
    isRead: boolean;
    createdAt: string;
}

interface Stats {
    posts: number;
    publishedPosts: number;
    categories: number;
    contacts: number;
    unreadContacts: number;
    mediaAssets: number;
    heroSlides: number;
    activeHeroSlides: number;
    recentContacts: RecentContact[];
}

const EMPTY_STATS: Stats = {
    posts: 0,
    publishedPosts: 0,
    categories: 0,
    contacts: 0,
    unreadContacts: 0,
    mediaAssets: 0,
    heroSlides: 0,
    activeHeroSlides: 0,
    recentContacts: [],
};

function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stats>(EMPTY_STATS);
    const [loading, setLoading] = useState(true);
    const { pages: contentStatus, loading: statusLoading } = useContentStatus();

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/stats", { cache: "no-store" });
                if (res.ok) {
                    const data = await res.json();
                    setStats({ ...EMPTY_STATS, ...data });
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Hero Slides",
            value: stats.heroSlides,
            subtitle: `${stats.activeHeroSlides} active`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-brand/10 text-brand",
            link: "/admin/slides",
        },
        {
            title: "Blog Posts",
            value: stats.posts,
            subtitle: `${stats.publishedPosts} published`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: "bg-blue-500/10 text-blue-400",
            link: "/admin/blog",
        },
        {
            title: "Client Logos",
            value: contentStatus.clients?.sharedItems ?? 0,
            subtitle: "shared EN + AR",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: "bg-sky-500/10 text-sky-400",
            link: "/admin/pages/clients",
            pending: statusLoading,
        },
        {
            title: "Contact Messages",
            value: stats.contacts,
            subtitle: `${stats.unreadContacts} unread`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-green-500/10 text-green-400",
            link: "/admin/contacts",
        },
        {
            title: "Media Assets",
            value: stats.mediaAssets,
            subtitle: "uploaded images",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-orange-500/10 text-orange-400",
            link: "/admin/media",
        },
    ];

    const quickActions = [
        { name: "Add client logo", href: "/admin/pages/clients" },
        { name: "New blog post", href: "/admin/blog/new" },
        { name: "New hero slide", href: "/admin/slides/new" },
        { name: "Manage services", href: "/admin/services" },
        { name: "Upload media", href: "/admin/media" },
        { name: "View website", href: "/", external: true },
    ];

    const pagesWithGaps = CMS_PAGES
        .map((page) => ({ page, status: contentStatus[page.id] }))
        .filter(({ status }) => status && status.summary.total > 0)
        .sort((a, b) => b.status.summary.total - a.status.summary.total);
    const recentlyEdited = CMS_PAGES
        .map((page) => ({ page, status: contentStatus[page.id] }))
        .filter(({ status }) => status?.updatedAt)
        .sort((a, b) => (b.status.updatedAt ?? "").localeCompare(a.status.updatedAt ?? ""))
        .slice(0, 5);

    const firstName = session?.user?.name?.split(" ")[0];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">
                        {greeting()}{firstName ? `, ${firstName}` : ""}
                    </h1>
                    <p className="text-gray-400 mt-1">Here is what is happening on the GovernValu website.</p>
                </div>
                {stats.unreadContacts > 0 && (
                    <Link
                        href="/admin/contacts"
                        className="inline-flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300 transition-colors hover:bg-green-500/20"
                    >
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        {stats.unreadContacts} unread {stats.unreadContacts === 1 ? "message" : "messages"}
                    </Link>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {statCards.map((stat) => (
                    <Link
                        key={stat.title}
                        href={stat.link}
                        className="group bg-gray-800 rounded-xl p-5 transition-colors border border-gray-700 hover:border-gray-500"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <svg className="w-5 h-5 text-gray-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        {loading || stat.pending ? (
                            <div className="h-8 w-16 bg-gray-700 animate-pulse rounded" />
                        ) : (
                            <p className="text-3xl font-bold text-white tabular-nums">{stat.value}</p>
                        )}
                        <p className="text-sm text-gray-300 mt-1">{stat.title}</p>
                        <p className="text-xs text-gray-500">{stat.subtitle}</p>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Content health */}
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-serif text-white">English / Arabic health</h2>
                            <p className="text-sm text-gray-400">Pages where the Arabic version is missing text or items.</p>
                        </div>
                        <Link href="/admin/pages" className="text-sm text-gray-400 hover:text-white">All pages →</Link>
                    </div>
                    {statusLoading ? (
                        <div className="space-y-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-700/60" />
                            ))}
                        </div>
                    ) : pagesWithGaps.length === 0 ? (
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">
                            Every page has a complete Arabic version.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {pagesWithGaps.map(({ page, status }) => (
                                <li key={page.id}>
                                    <Link
                                        href={`/admin/pages/${page.id}`}
                                        className="flex items-center justify-between gap-4 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 transition-colors hover:border-gray-500"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm text-white">{page.name}</p>
                                            <p className="truncate text-xs text-gray-500">
                                                {[
                                                    status.summary.count > 0 && `${status.summary.count} list count mismatch`,
                                                    status.summary.missing > 0 && `${status.summary.missing} empty`,
                                                    status.summary.same > 0 && `${status.summary.same} untranslated`,
                                                ].filter(Boolean).join(" · ")}
                                            </p>
                                        </div>
                                        <TranslationBadge status={status} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Recent messages */}
                <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-serif text-white">Recent messages</h2>
                        <Link href="/admin/contacts" className="text-sm text-gray-400 hover:text-white">View all →</Link>
                    </div>
                    {loading ? (
                        <div className="space-y-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-700/60" />
                            ))}
                        </div>
                    ) : stats.recentContacts.length === 0 ? (
                        <p className="text-sm text-gray-500">No messages yet.</p>
                    ) : (
                        <ul className="divide-y divide-gray-700">
                            {stats.recentContacts.map((contact) => (
                                <li key={contact.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${contact.isRead ? "bg-gray-600" : "bg-green-400"}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className={`truncate text-sm ${contact.isRead ? "text-gray-300" : "font-medium text-white"}`}>
                                            {contact.firstName} {contact.lastName}
                                            {contact.company && <span className="text-gray-500"> · {contact.company}</span>}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            {contact.inquiry} · {timeAgo(contact.createdAt)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-serif text-white mb-4">Quick actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.name}
                                href={action.href}
                                target={action.external ? "_blank" : undefined}
                                className="flex items-center justify-between gap-2 rounded-lg border border-gray-700 bg-gray-900 p-4 text-sm text-gray-300 transition-colors hover:border-brand hover:text-white"
                            >
                                {action.name}
                                <span aria-hidden="true" className="text-gray-500">{action.external ? "↗" : "→"}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recently edited pages */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-serif text-white mb-4">Recently edited pages</h2>
                    {statusLoading ? (
                        <div className="space-y-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-11 animate-pulse rounded-lg bg-gray-700/60" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentlyEdited.map(({ page, status }) => (
                                <Link
                                    key={page.id}
                                    href={`/admin/pages/${page.id}`}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-700 bg-gray-900 p-3 transition-colors hover:border-gray-500"
                                >
                                    <span className="truncate text-sm text-gray-300">{page.name}</span>
                                    <span className="shrink-0 text-xs text-gray-500">{timeAgo(status.updatedAt)}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
