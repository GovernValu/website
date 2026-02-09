"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    TextField,
    TextArea,
    ImageField,
    SectionCard,
    ArrayEditor,
} from "../../components/ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ServiceEditorPageProps {
    params: Promise<{ slug: string }>;
}

export default function ServiceEditorPage({ params }: ServiceEditorPageProps) {
    const { slug } = use(params);
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

    const content = activeTab === "en" ? contentEn : contentAr;
    const setContent = activeTab === "en" ? setContentEn : setContentAr;
    const serviceIndex = content?.services?.findIndex((s: any) => s.slug === slug);
    const service = serviceIndex >= 0 ? content?.services[serviceIndex] : null;

    const updateService = (updates: any) => {
        if (serviceIndex < 0) return;
        const updatedServices = [...content.services];
        updatedServices[serviceIndex] = { ...service, ...updates };
        setContent({ ...content, services: updatedServices });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/content/services?lang=${activeTab}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });

            if (res.ok) {
                toast.success(`${activeTab === "en" ? "English" : "Arabic"} service saved!`);
            } else {
                toast.error("Failed to save service");
            }
        } catch (error) {
            toast.error("Failed to save service");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading service...</div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="p-6">
                <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="text-lg font-medium text-red-900 mb-2">Service not found</h3>
                    <p className="text-red-600 mb-4">The service "{slug}" could not be found.</p>
                    <Link
                        href="/admin/services"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/services"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Editing service: <code className="bg-gray-100 px-2 py-0.5 rounded">{slug}</code>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        <button
                            onClick={() => setActiveTab("en")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "en"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setActiveTab("ar")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "ar"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            العربية
                        </button>
                    </div>

                    <a
                        href={`/services/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Preview
                    </a>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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

            {/* Editor Sections */}
            <div className="space-y-4">
                {/* Basic Info */}
                <SectionCard title="Basic Information" defaultOpen={true}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="Slug (URL)"
                            value={service.slug}
                            onChange={(v) => updateService({ slug: v })}
                            helpText="URL-friendly identifier"
                        />
                        <TextField
                            label="Icon"
                            value={service.icon}
                            onChange={(v) => updateService({ icon: v })}
                            helpText="building, chart, shield, bank, globe, users"
                        />
                    </div>
                    <TextField
                        label="Title"
                        value={service.title}
                        onChange={(v) => updateService({ title: v })}
                    />
                    <TextArea
                        label="Short Description"
                        value={service.shortDescription}
                        onChange={(v) => updateService({ shortDescription: v })}
                        rows={2}
                    />
                    <TextArea
                        label="Full Description"
                        value={service.fullDescription || ""}
                        onChange={(v) => updateService({ fullDescription: v })}
                        rows={3}
                    />
                    <ImageField
                        label="Hero Image"
                        value={service.image || ""}
                        onChange={(v) => updateService({ image: v })}
                    />
                </SectionCard>

                {/* Feature Cards */}
                <SectionCard title="Feature Cards" defaultOpen={false}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-700">Feature Card 1</h4>
                            <TextField
                                label="Title"
                                value={service.details?.featureCard1?.title || ""}
                                onChange={(v) => updateService({
                                    details: { ...service.details, featureCard1: { ...service.details?.featureCard1, title: v } }
                                })}
                            />
                            <TextArea
                                label="Description"
                                value={service.details?.featureCard1?.description || ""}
                                onChange={(v) => updateService({
                                    details: { ...service.details, featureCard1: { ...service.details?.featureCard1, description: v } }
                                })}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-700">Feature Card 2</h4>
                            <TextField
                                label="Title"
                                value={service.details?.featureCard2?.title || ""}
                                onChange={(v) => updateService({
                                    details: { ...service.details, featureCard2: { ...service.details?.featureCard2, title: v } }
                                })}
                            />
                            <TextArea
                                label="Description"
                                value={service.details?.featureCard2?.description || ""}
                                onChange={(v) => updateService({
                                    details: { ...service.details, featureCard2: { ...service.details?.featureCard2, description: v } }
                                })}
                                rows={2}
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* Key Points */}
                <SectionCard title="Key Points / What We Offer" defaultOpen={false}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextField
                            label="Section Title"
                            value={service.details?.keyPointsTitle || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, keyPointsTitle: v }
                            })}
                        />
                        <TextField
                            label="Section Headline"
                            value={service.details?.keyPointsHeadline || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, keyPointsHeadline: v }
                            })}
                        />
                    </div>
                    <ArrayEditor
                        label="Key Points"
                        items={service.details?.keyPoints || []}
                        onChange={(keyPoints) => updateService({
                            details: { ...service.details, keyPoints }
                        })}
                        createNew={() => ({ title: "", description: "" })}
                        itemLabel={(kp) => kp.title || "New Key Point"}
                        renderItem={(kp, _, updateKp) => (
                            <div className="space-y-2">
                                <TextField
                                    label="Title"
                                    value={kp.title}
                                    onChange={(v) => updateKp({ title: v })}
                                />
                                <TextArea
                                    label="Description"
                                    value={kp.description}
                                    onChange={(v) => updateKp({ description: v })}
                                    rows={2}
                                />
                            </div>
                        )}
                    />
                </SectionCard>

                {/* Process */}
                <SectionCard title="Process / How We Deliver" defaultOpen={false}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextField
                            label="Section Title"
                            value={service.details?.processTitle || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, processTitle: v }
                            })}
                        />
                        <TextField
                            label="Section Headline"
                            value={service.details?.processHeadline || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, processHeadline: v }
                            })}
                        />
                    </div>
                    <ArrayEditor
                        label="Process Steps"
                        items={service.details?.process || []}
                        onChange={(process) => updateService({
                            details: { ...service.details, process }
                        })}
                        createNew={() => ({ title: "", description: "" })}
                        itemLabel={(step) => step.title || "New Step"}
                        renderItem={(step, _, updateStep) => (
                            <div className="space-y-2">
                                <TextField
                                    label="Title"
                                    value={step.title}
                                    onChange={(v) => updateStep({ title: v })}
                                />
                                <TextArea
                                    label="Description"
                                    value={step.description}
                                    onChange={(v) => updateStep({ description: v })}
                                    rows={2}
                                />
                            </div>
                        )}
                    />
                </SectionCard>

                {/* Why Choose Us */}
                <SectionCard title="Why Choose Us" defaultOpen={false}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextField
                            label="Section Title"
                            value={service.details?.whyChooseUsTitle || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, whyChooseUsTitle: v }
                            })}
                        />
                        <TextField
                            label="Section Headline"
                            value={service.details?.whyChooseUsHeadline || ""}
                            onChange={(v) => updateService({
                                details: { ...service.details, whyChooseUsHeadline: v }
                            })}
                        />
                    </div>
                    <ArrayEditor
                        label="Reasons"
                        items={service.details?.whyChooseUs || []}
                        onChange={(whyChooseUs) => updateService({
                            details: { ...service.details, whyChooseUs }
                        })}
                        createNew={() => ({ title: "", description: "" })}
                        itemLabel={(reason) => reason.title || "New Reason"}
                        renderItem={(reason, _, updateReason) => (
                            <div className="space-y-2">
                                <TextField
                                    label="Title"
                                    value={reason.title}
                                    onChange={(v) => updateReason({ title: v })}
                                />
                                <TextArea
                                    label="Description"
                                    value={reason.description}
                                    onChange={(v) => updateReason({ description: v })}
                                    rows={2}
                                />
                            </div>
                        )}
                    />
                </SectionCard>

                {/* Sidebar & CTA */}
                <SectionCard title="Sidebar & CTA Banner" defaultOpen={false}>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                            <h4 className="font-medium text-gray-700">Sidebar Contact Box</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    label="Title"
                                    value={service.details?.sidebar?.title || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, sidebar: { ...service.details?.sidebar, title: v } }
                                    })}
                                />
                                <TextField
                                    label="Description"
                                    value={service.details?.sidebar?.description || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, sidebar: { ...service.details?.sidebar, description: v } }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                            <h4 className="font-medium text-blue-700">Bottom CTA Banner</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    label="Headline"
                                    value={service.details?.ctaBanner?.headline || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, ctaBanner: { ...service.details?.ctaBanner, headline: v } }
                                    })}
                                />
                                <TextField
                                    label="Subtext"
                                    value={service.details?.ctaBanner?.subtext || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, ctaBanner: { ...service.details?.ctaBanner, subtext: v } }
                                    })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    label="Button 1 Text"
                                    value={service.details?.ctaBanner?.button1Text || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, ctaBanner: { ...service.details?.ctaBanner, button1Text: v } }
                                    })}
                                />
                                <TextField
                                    label="Button 2 Text"
                                    value={service.details?.ctaBanner?.button2Text || ""}
                                    onChange={(v) => updateService({
                                        details: { ...service.details, ctaBanner: { ...service.details?.ctaBanner, button2Text: v } }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}
