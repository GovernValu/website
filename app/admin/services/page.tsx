"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ICONS: Record<string, React.ReactNode> = {
    building: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    chart: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    shield: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    bank: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
    ),
    globe: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    ),
    users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
    ),
};

export default function AdminServicesPage() {
    const [contentEn, setContentEn] = useState<any>(null);
    const [contentAr, setContentAr] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    useEffect(() => {
        async function fetchContent() {
            try {
                const [resEn, resAr] = await Promise.all([
                    fetch("/api/content/services?lang=en"),
                    fetch("/api/content/services?lang=ar"),
                ]);

                if (resEn.ok && resAr.ok) {
                    const dataEn = await resEn.json();
                    const dataAr = await resAr.json();
                    setContentEn(dataEn);
                    setContentAr(dataAr);
                } else {
                    toast.error("Failed to load services content");
                }
            } catch (error) {
                toast.error("Failed to load services content");
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, []);

    const services = activeTab === "en" ? contentEn?.services : contentAr?.services;

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/content/services?lang=${activeTab}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(activeTab === "en" ? contentEn : contentAr),
            });

            if (res.ok) {
                toast.success(`${activeTab === "en" ? "English" : "Arabic"} services saved!`);
            } else {
                toast.error("Failed to save services");
            }
        } catch (error) {
            toast.error("Failed to save services");
        } finally {
            setSaving(false);
        }
    };

    const handleAddService = async () => {
        const newService = {
            slug: `new-service-${Date.now()}`,
            title: "New Service",
            shortDescription: "Enter a short description...",
            icon: "building",
            image: "",
            fullDescription: "",
            details: {
                featureCard1: { title: "", description: "" },
                featureCard2: { title: "", description: "" },
                keyPointsTitle: "",
                keyPointsHeadline: "",
                keyPoints: [] as { title: string; description: string }[],
                processTitle: "",
                processHeadline: "",
                process: [] as { title: string; description: string }[],
                whyChooseUsTitle: "",
                whyChooseUsHeadline: "",
                whyChooseUs: [] as { title: string; description: string }[],
                sidebar: { title: "", description: "" },
                ctaBanner: { headline: "", subtext: "", button1Text: "", button2Text: "" },
            },
        };

        // Add to both English and Arabic content
        const updatedEn = {
            ...contentEn,
            services: [...(contentEn?.services || []), newService],
        };
        const updatedAr = {
            ...contentAr,
            services: [...(contentAr?.services || []), { ...newService, title: "خدمة جديدة", shortDescription: "أدخل وصفًا قصيرًا..." }],
        };

        setContentEn(updatedEn);
        setContentAr(updatedAr);

        // Auto-save both languages
        setSaving(true);
        try {
            const [resEn, resAr] = await Promise.all([
                fetch("/api/content/services?lang=en", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedEn),
                }),
                fetch("/api/content/services?lang=ar", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedAr),
                }),
            ]);

            if (resEn.ok && resAr.ok) {
                toast.success("New service created! Click Edit to add content.");
            } else {
                toast.error("Failed to save new service");
            }
        } catch (error) {
            toast.error("Failed to save new service");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteService = (index: number) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        if (activeTab === "en") {
            const updated = [...(contentEn?.services || [])];
            updated.splice(index, 1);
            setContentEn({ ...contentEn, services: updated });
        } else {
            const updated = [...(contentAr?.services || [])];
            updated.splice(index, 1);
            setContentAr({ ...contentAr, services: updated });
        }
        toast.success("Service deleted! Don't forget to save.");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Services Management</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage all services and their landing page content
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-700">
                        <button
                            onClick={() => setActiveTab("en")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "en"
                                ? "bg-brand text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setActiveTab("ar")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "ar"
                                ? "bg-brand text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            العربية
                        </button>
                    </div>

                    {/* Add New Service Button */}
                    <button
                        onClick={handleAddService}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Service
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Service
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Key Points
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Process Steps
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {services?.map((service: any, index: number) => (
                            <tr key={service.slug} className="hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-brand">
                                            {ICONS[service.icon] || ICONS["building"]}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{service.title}</p>
                                            <p className="text-gray-400 text-sm line-clamp-1 max-w-xs">
                                                {service.shortDescription}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="text-gray-300 text-sm bg-gray-900 px-2 py-1 rounded">
                                        /{service.slug}
                                    </code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                                        {service.details?.keyPoints?.length || 0} points
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                                        {service.details?.process?.length || 0} steps
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/services/${service.slug}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand/80 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <a
                                            href={`/services/${service.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Preview
                                        </a>
                                        <button
                                            onClick={() => handleDeleteService(index)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {(!services || services.length === 0) && (
                    <div className="text-center py-12">
                        <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-medium text-white mb-1">No services found</h3>
                        <p className="text-gray-400 mb-4">Get started by adding your first service.</p>
                        <button
                            onClick={handleAddService}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Service
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
