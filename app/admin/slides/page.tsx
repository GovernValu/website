"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    image: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export default function AdminSlidesPage() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchSlides();
    }, []);

    async function fetchSlides() {
        try {
            const res = await fetch("/api/slides?all=true");
            if (res.ok) {
                const data = await res.json();
                setSlides(data);
            }
        } catch (error) {
            console.error("Failed to fetch slides:", error);
        } finally {
            setLoading(false);
        }
    }

    async function toggleActive(id: string, isActive: boolean) {
        try {
            const res = await fetch(`/api/slides/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !isActive }),
            });
            if (res.ok) {
                setSlides(slides.map(s => s.id === id ? { ...s, isActive: !isActive } : s));
            }
        } catch (error) {
            console.error("Failed to toggle slide:", error);
        }
    }

    async function deleteSlide(id: string) {
        if (!confirm("Are you sure you want to delete this slide?")) return;

        setDeleting(id);
        try {
            const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
            if (res.ok) {
                setSlides(slides.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete slide:", error);
        } finally {
            setDeleting(null);
        }
    }

    function stripHtml(html: string) {
        return html.replace(/<[^>]*>/g, "");
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white">Hero Slides</h1>
                    <p className="text-gray-400 mt-1">Manage homepage hero slider images and content</p>
                </div>
                <Link
                    href="/admin/slides/new"
                    className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Slide
                </Link>
            </div>

            {/* Slides Grid */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
                            <div className="h-48 bg-gray-700" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-700 rounded w-3/4" />
                                <div className="h-3 bg-gray-700 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : slides.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-xl text-white mb-2">No slides yet</h3>
                    <p className="text-gray-400 mb-6">Create your first hero slide to get started.</p>
                    <Link
                        href="/admin/slides/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create First Slide
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`bg-gray-800 rounded-xl overflow-hidden border transition-all ${slide.isActive ? "border-gray-700" : "border-gray-700/50 opacity-60"
                                }`}
                        >
                            {/* Image Preview */}
                            <div className="relative h-48 bg-gray-900">
                                <Image
                                    src={slide.image}
                                    alt={stripHtml(slide.title)}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                                {/* Order Badge */}
                                <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900/80 rounded text-xs text-gray-300">
                                    #{slide.order + 1}
                                </div>

                                {/* Status Badge */}
                                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${slide.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                                    }`}>
                                    {slide.isActive ? "Active" : "Inactive"}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-white font-medium mb-1 line-clamp-1">
                                    {stripHtml(slide.title)}
                                </h3>
                                {slide.subtitle && (
                                    <p className="text-gray-400 text-sm mb-3">{slide.subtitle}</p>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
                                    <Link
                                        href={`/admin/slides/${slide.id}`}
                                        className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm text-center rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => toggleActive(slide.id, slide.isActive)}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${slide.isActive
                                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                                : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                            }`}
                                    >
                                        {slide.isActive ? "Hide" : "Show"}
                                    </button>
                                    <button
                                        onClick={() => deleteSlide(slide.id)}
                                        disabled={deleting === slide.id}
                                        className="px-3 py-2 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                                    >
                                        {deleting === slide.id ? "..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info Banner */}
            <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-brand/20 rounded-lg">
                        <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1">Hero Slider Tips</h3>
                        <p className="text-gray-400 text-sm">
                            Slides are displayed in order. Use high-quality landscape images (1920x1080 or larger recommended).
                            The title field supports HTML for styling, e.g., <code className="bg-gray-800 px-1 rounded">&lt;span class=&quot;text-brand&quot;&gt;Highlight&lt;/span&gt;</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
