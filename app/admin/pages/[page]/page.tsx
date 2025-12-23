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
    const [content, setContent] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
    const [jsonText, setJsonText] = useState("");

    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch(`/api/content/${page}`);
                if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                    setJsonText(JSON.stringify(data, null, 2));
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

    // Sync JSON text when content changes (from visual editor)
    useEffect(() => {
        if (content && viewMode === "visual") {
            setJsonText(JSON.stringify(content, null, 2));
        }
    }, [content, viewMode]);

    // Sync content when switching from JSON to visual
    const handleModeSwitch = (mode: "visual" | "json") => {
        if (mode === "visual" && viewMode === "json") {
            try {
                const parsed = JSON.parse(jsonText);
                setContent(parsed);
            } catch (error) {
                toast.error("Invalid JSON - fix before switching to visual mode");
                return;
            }
        }
        setViewMode(mode);
    };

    const handleSave = async () => {
        try {
            let dataToSave = content;

            if (viewMode === "json") {
                try {
                    dataToSave = JSON.parse(jsonText);
                    setContent(dataToSave);
                } catch (error) {
                    toast.error("Invalid JSON format");
                    return;
                }
            }

            setSaving(true);

            const res = await fetch(`/api/content/${page}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });

            if (res.ok) {
                toast.success("Content saved successfully!");
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

    const pageDescriptions: Record<string, string> = {
        homepage: "Edit hero, metrics, expertise, philosophy, and contact sections",
        services: "Manage service offerings and engagement model",
        industries: "Configure industry sectors and statistics",
        partners: "Update partner categories and alliances",
        about: "Edit company info, vision, mission, and values",
        contact: "Manage contact form, FAQ, and office information",
        settings: "Global settings, SEO, footer, and social links",
    };

    // Render the appropriate editor based on page
    const renderEditor = () => {
        if (!content) return null;

        switch (page) {
            case "homepage":
                return (
                    <HomepageEditor
                        content={content as any}
                        onChange={setContent}
                    />
                );
            case "about":
                return (
                    <AboutEditor
                        content={content as any}
                        onChange={setContent}
                    />
                );
            case "settings":
                return (
                    <SettingsEditor
                        content={content as any}
                        onChange={setContent}
                    />
                );
            case "services":
                return (
                    <ServicesEditor
                        content={content}
                        onChange={setContent}
                    />
                );
            case "contact":
                return (
                    <ContactEditor
                        content={content}
                        onChange={setContent}
                    />
                );
            case "industries":
                return (
                    <IndustriesEditor
                        content={content}
                        onChange={setContent}
                    />
                );
            case "partners":
                return (
                    <PartnersEditor
                        content={content}
                        onChange={setContent}
                    />
                );
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
                        <p className="text-gray-400 mt-1">{pageDescriptions[page] || "Edit page content"}</p>
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
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                                Visual
                            </span>
                        </button>
                        <button
                            onClick={() => handleModeSwitch("json")}
                            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "json"
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                JSON
                            </span>
                        </button>
                    </div>

                    {viewMode === "json" && (
                        <button
                            onClick={formatJson}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            Format JSON
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Editor */}
            {viewMode === "visual" ? (
                renderEditor()
            ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                        <span className="text-sm text-gray-400">content/{page}.json</span>
                        <span className="text-xs text-gray-500">JSON Editor (Advanced)</span>
                    </div>
                    <textarea
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        className="w-full h-[600px] bg-gray-900 text-gray-200 p-6 font-mono text-sm focus:outline-none resize-none"
                        spellCheck={false}
                    />
                </div>
            )}

            {/* Help */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-medium mb-3">Tips</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Click section headers to expand/collapse for easier navigation
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Use the arrows to reorder list items (metrics, cards, etc.)
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Switch to JSON mode for advanced edits or bulk changes
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Changes are saved immediately and reflected on the live site
                    </li>
                </ul>
            </div>
        </div>
    );
}
