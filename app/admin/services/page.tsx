"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

function SortableServiceCard({
    service,
    index,
    onDelete,
}: {
    service: any;
    index: number;
    onDelete: (index: number) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: service.slug });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-200 ${
                isDragging
                    ? "shadow-2xl shadow-brand/20 border-brand/50 scale-[1.02] z-50 opacity-90"
                    : "hover:border-gray-600 hover:shadow-lg hover:shadow-black/20"
            }`}
        >
            <div className="flex items-center gap-4 p-4">
                {/* Drag Handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-300 cursor-grab active:cursor-grabbing rounded-lg hover:bg-gray-700/50 transition-colors"
                    title="Drag to reorder"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="9" cy="5" r="1.5" />
                        <circle cx="15" cy="5" r="1.5" />
                        <circle cx="9" cy="12" r="1.5" />
                        <circle cx="15" cy="12" r="1.5" />
                        <circle cx="9" cy="19" r="1.5" />
                        <circle cx="15" cy="19" r="1.5" />
                    </svg>
                </button>

                {/* Order Number */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                    {ICONS[service.icon] || ICONS["building"]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{service.title}</h3>
                    <p className="text-gray-400 text-sm truncate mt-0.5">
                        {service.shortDescription}
                    </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-xs font-medium text-blue-400">
                            {service.details?.keyPoints?.length || 0} points
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="text-xs font-medium text-purple-400">
                            {service.details?.process?.length || 0} steps
                        </span>
                    </div>
                </div>

                {/* Slug Badge */}
                <div className="hidden lg:block flex-shrink-0">
                    <code className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded-md border border-gray-700">
                        /{service.slug}
                    </code>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                        href={`/admin/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-brand/90 rounded-lg hover:bg-brand transition-colors"
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
                        className="inline-flex items-center p-2 text-gray-400 hover:text-white bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                        title="Preview"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <button
                        onClick={() => onDelete(index)}
                        className="inline-flex items-center p-2 text-gray-500 hover:text-red-400 bg-gray-700/50 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminServicesPage() {
    const router = useRouter();
    const [contentEn, setContentEn] = useState<any>(null);
    const [contentAr, setContentAr] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        async function fetchContent() {
            try {
                const [resEn, resAr] = await Promise.all([
                    fetch("/api/content/services?lang=en", { cache: "no-store" }),
                    fetch("/api/content/services?lang=ar", { cache: "no-store" }),
                ]);

                if (resEn.ok && resAr.ok) {
                    const dataEn = await resEn.json();
                    const dataAr = await resAr.json();
                    setContentEn(dataEn);
                    setContentAr(dataAr);
                } else {
                    toast.error("Failed to load services content");
                }
            } catch {
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
            const [resEn, resAr] = await Promise.all([
                fetch("/api/content/services?lang=en", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contentEn),
                }),
                fetch("/api/content/services?lang=ar", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contentAr),
                }),
            ]);

            if (resEn.ok && resAr.ok) {
                toast.success("All services saved!");
            } else {
                toast.error("Failed to save services");
            }
        } catch {
            toast.error("Failed to save services");
        } finally {
            setSaving(false);
        }
    };

    const handleAddService = async () => {
        const newSlug = `new-service-${Date.now()}`;
        const newService = {
            slug: newSlug,
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
                toast.success("New service created! Redirecting to editor...");
                // Navigate to the editor after save completes
                router.push(`/admin/services/${newSlug}`);
            } else {
                toast.error("Failed to save new service");
            }
        } catch {
            toast.error("Failed to save new service");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteService = async (index: number) => {
        if (!confirm("Are you sure you want to delete this service? This will remove it from both English and Arabic.")) return;

        const deletedSlug = (activeTab === "en" ? contentEn : contentAr)?.services?.[index]?.slug;

        // Remove from both languages by slug
        const updatedEn = {
            ...contentEn,
            services: (contentEn?.services || []).filter((s: any) => s.slug !== deletedSlug),
        };
        const updatedAr = {
            ...contentAr,
            services: (contentAr?.services || []).filter((s: any) => s.slug !== deletedSlug),
        };

        setContentEn(updatedEn);
        setContentAr(updatedAr);

        // Auto-save deletion
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
                toast.success("Service deleted!");
            } else {
                toast.error("Failed to delete service");
            }
        } catch {
            toast.error("Failed to delete service");
        } finally {
            setSaving(false);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const currentServices = activeTab === "en" ? contentEn?.services : contentAr?.services;
        if (!currentServices) return;

        const oldIndex = currentServices.findIndex((s: any) => s.slug === active.id);
        const newIndex = currentServices.findIndex((s: any) => s.slug === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        // Reorder in both languages to keep them in sync
        const reorderedEn = arrayMove([...(contentEn?.services || [])], oldIndex, newIndex);
        const reorderedAr = arrayMove([...(contentAr?.services || [])], oldIndex, newIndex);

        setContentEn({ ...contentEn, services: reorderedEn });
        setContentAr({ ...contentAr, services: reorderedAr });

        toast.success("Services reordered! Don\u2019t forget to save.");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
                    <p className="text-sm text-gray-400">Loading services...</p>
                </div>
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
                        Drag to reorder &middot; {services?.length || 0} service{services?.length !== 1 ? "s" : ""}
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
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
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
                                Save All
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Services List with Drag & Drop */}
            <div className="space-y-3">
                {services && services.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={services.map((s: any) => s.slug)}
                            strategy={verticalListSortingStrategy}
                        >
                            {services.map((service: any, index: number) => (
                                <SortableServiceCard
                                    key={service.slug}
                                    service={service}
                                    index={index}
                                    onDelete={handleDeleteService}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700/50 border-dashed">
                        <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-white mb-2">No services yet</h3>
                        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                            Get started by adding your first service. It will appear on both the English and Arabic versions of your site.
                        </p>
                        <button
                            onClick={handleAddService}
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Your First Service
                        </button>
                    </div>
                )}
            </div>

            {/* Info Banner */}
            {services && services.length > 1 && (
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                        Drag services to reorder them. The order here determines how they appear on your website.
                        Click <strong>Save All</strong> to persist changes.
                    </p>
                </div>
            )}
        </div>
    );
}
