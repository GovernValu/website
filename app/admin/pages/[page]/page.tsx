"use client";

import { useState, useEffect, use } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

// Import page-specific editors
import HomepageEditor from "../../components/editors/HomepageEditor";
import AboutEditor from "../../components/editors/AboutEditor";
import SettingsEditor from "../../components/editors/SettingsEditor";
import ServicesEditor from "../../components/editors/ServicesEditor";
import ContactEditor from "../../components/editors/ContactEditor";
import IndustriesEditor from "../../components/editors/IndustriesEditor";
import PartnersEditor from "../../components/editors/PartnersEditor";

interface PageEditorProps {
    params: Promise<{ page: string }>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function PageEditor({ params }: PageEditorProps) {
    const { page } = use(params);
    const [contentEn, setContentEn] = useState<Record<string, any> | null>(null);
    const [contentAr, setContentAr] = useState<Record<string, any> | null>(null);
    const [editorLang, setEditorLang] = useState<"en" | "ar">("en");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
    const [jsonText, setJsonText] = useState("");

    useEffect(() => {
        async function fetchContent() {
            try {
                const [resEn, resAr] = await Promise.all([
                    fetch(`/api/content/${page}?lang=en`),
                    fetch(`/api/content/${page}?lang=ar`)
                ]);

                if (resEn.ok && resAr.ok) {
                    const dataEn = await resEn.json();
                    const dataAr = await resAr.json();
                    setContentEn(dataEn);
                    setContentAr(dataAr);
                    setJsonText(JSON.stringify(dataEn, null, 2));
                } else {
                    toast.error("Failed to load content");
                }
            } catch (error) {
                toast.error("Failed to load content");
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [page]);

    const activeContent = editorLang === "en" ? contentEn : contentAr;

    // Sync JSON text when content changes (from visual editor) or lang switches
    useEffect(() => {
        if (activeContent && viewMode === "visual") {
            setJsonText(JSON.stringify(activeContent, null, 2));
        }
    }, [activeContent, viewMode]);

    const handleContentChange = (newContent: any) => {
        if (editorLang === "en") {
            setContentEn(newContent);
        } else {
            setContentAr(newContent);
        }
    };

    // Sync content when switching from JSON to visual
    const handleModeSwitch = (mode: "visual" | "json") => {
        if (mode === "visual" && viewMode === "json") {
            try {
                const parsed = JSON.parse(jsonText);
                handleContentChange(parsed);
            } catch (error) {
                toast.error("Invalid JSON - fix before switching to visual mode");
                return;
            }
        }
        setViewMode(mode);
    };

    const handleSave = async () => {
        try {
            let dataToSave = activeContent;

            if (viewMode === "json") {
                try {
                    dataToSave = JSON.parse(jsonText);
                    handleContentChange(dataToSave);
                } catch (error) {
                    toast.error("Invalid JSON format");
                    return;
                }
            }

            setSaving(true);

            const res = await fetch(`/api/content/${page}?lang=${editorLang}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });

            if (res.ok) {
                toast.success(`${editorLang === "en" ? "English" : "Arabic"} content saved successfully!`);
            } else {
                toast.error("Failed to save content");
            }
        } catch (error) {
            toast.error("Failed to save content");
        } finally {
            setSaving(false);
        }
    };

    const formatJson = () => {
        try {
            const parsed = JSON.parse(jsonText);
            setJsonText(JSON.stringify(parsed, null, 2));
            toast.success("JSON formatted");
        } catch (error) {
            toast.error("Invalid JSON format");
        }
    };

    const pageNames: Record<string, string> = {
        homepage: "Homepage",
        services: "Services",
        industries: "Industries",
        partners: "Partners",
        about: "About",
        contact: "Contact",
        settings: "Site Settings",
    };

    // Render the appropriate editor based on page
    const renderEditor = () => {
        if (!activeContent) return null;

        switch (page) {
            case "homepage":
                return <HomepageEditor content={activeContent as any} onChange={handleContentChange} />;
            case "about":
                return <AboutEditor content={activeContent as any} onChange={handleContentChange} />;
            case "settings":
                return <SettingsEditor content={activeContent as any} onChange={handleContentChange} />;
            case "services":
                return <ServicesEditor content={activeContent as any} onChange={handleContentChange} />;
            case "contact":
                return <ContactEditor content={activeContent as any} onChange={handleContentChange} />;
            case "industries":
                return <IndustriesEditor content={activeContent as any} onChange={handleContentChange} />;
            case "partners":
                return <PartnersEditor content={activeContent as any} onChange={handleContentChange} />;
            default:
                return (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-400">
                            Visual editor not available for this page. Use JSON mode.
                        </p>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/pages"
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif text-white">{pageNames[page] || page}</h1>
                        <p className="text-gray-400 mt-1">Edit content for both languages</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => handleModeSwitch("visual")}
                            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "visual"
                                ? "bg-gray-700 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Visual
                        </button>
                        <button
                            onClick={() => handleModeSwitch("json")}
                            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "json"
                                ? "bg-gray-700 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            JSON
                        </button>
                    </div>

                    {viewMode === "json" && (
                        <button
                            onClick={formatJson}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            Format
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Language Tabs */}
            <div className="border-b border-gray-700 flex gap-6">
                <button
                    onClick={() => setEditorLang("en")}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${editorLang === "en"
                        ? "border-brand text-white"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                        }`}
                >
                    English (EN)
                </button>
                <button
                    onClick={() => setEditorLang("ar")}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${editorLang === "ar"
                        ? "border-brand text-white"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                        }`}
                >
                    Arabic (AR)
                </button>
            </div>

            {/* Content Editor */}
            <div dir={editorLang === 'ar' ? 'rtl' : 'ltr'}>
                {viewMode === "visual" ? (
                    renderEditor()
                ) : (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                            <span className="text-sm text-gray-400">content/{editorLang}/{page}.json</span>
                            <span className="text-xs text-gray-500">JSON Editor</span>
                        </div>
                        <textarea
                            value={jsonText}
                            onChange={(e) => setJsonText(e.target.value)}
                            className="w-full h-[600px] bg-gray-900 text-gray-200 p-6 font-mono text-sm focus:outline-none resize-none"
                            spellCheck={false}
                            dir="ltr"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
