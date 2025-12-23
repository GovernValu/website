"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
    posts: number;
    publishedPosts: number;
    categories: number;
    contacts: number;
    unreadContacts: number;
    mediaAssets: number;
    heroSlides: number;
    activeHeroSlides: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        posts: 0,
        publishedPosts: 0,
        categories: 0,
        contacts: 0,
        unreadContacts: 0,
        mediaAssets: 0,
        heroSlides: 0,
        activeHeroSlides: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
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
            title: "Total Posts",
            value: stats.posts,
            subtitle: `${stats.publishedPosts} published`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: "bg-blue-500/10 text-blue-500",
            link: "/admin/blog",
        },
        {
            title: "Categories",
            value: stats.categories,
            subtitle: "blog categories",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            ),
            color: "bg-purple-500/10 text-purple-500",
            link: "/admin/categories",
        },
        {
            title: "Contact Submissions",
            value: stats.contacts,
            subtitle: `${stats.unreadContacts} unread`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-green-500/10 text-green-500",
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
            color: "bg-orange-500/10 text-orange-500",
            link: "/admin/media",
        },
    ];

    const quickActions = [
        { name: "New Hero Slide", href: "/admin/slides/new", icon: "🖼️" },
        { name: "New Blog Post", href: "/admin/blog/new", icon: "+" },
        { name: "Upload Media", href: "/admin/media", icon: "📷" },
        { name: "View Contacts", href: "/admin/contacts", icon: "📧" },
    ];

    const pages = [
        { name: "Homepage", href: "/admin/pages/homepage" },
        { name: "Services", href: "/admin/pages/services" },
        { name: "Industries", href: "/admin/pages/industries" },
        { name: "Partners", href: "/admin/pages/partners" },
        { name: "About", href: "/admin/pages/about" },
        { name: "Contact", href: "/admin/pages/contact" },
        { name: "Settings", href: "/admin/pages/settings" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome to the GovernValu admin portal</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.title}
                        href={stat.link}
                        className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors border border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div>
                            {loading ? (
                                <div className="h-8 w-16 bg-gray-700 animate-pulse rounded" />
                            ) : (
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            )}
                            <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
                            <p className="text-xs text-gray-500">{stat.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions & Pages */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-serif text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {quickActions.map((action) => (
                            <Link
                                key={action.name}
                                href={action.href}
                                className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700"
                            >
                                <span className="text-2xl">{action.icon}</span>
                                <span className="text-sm text-gray-300">{action.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Content Pages */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-serif text-white mb-4">Content Pages</h2>
                    <div className="space-y-2">
                        {pages.map((page) => (
                            <Link
                                key={page.name}
                                href={page.href}
                                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700"
                            >
                                <span className="text-sm text-gray-300">{page.name}</span>
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-brand/20 rounded-lg">
                        <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1">Content Management System</h3>
                        <p className="text-gray-400 text-sm">
                            Use this portal to manage all website content. Changes to pages are saved to JSON files and will be
                            reflected on the live site immediately. Blog posts and categories are stored in the database.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
