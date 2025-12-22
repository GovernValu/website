"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface PageEditorProps {
    params: Promise<{ page: string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
    const { page } = use(params);
    const router = useRouter();
    const [content, setContent] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    const handleSave = async () => {
        try {
            const parsed = JSON.parse(jsonText);
            setSaving(true);

            const res = await fetch(`/api/content/${page}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed),
            });

            if (res.ok) {
                toast.success("Content saved successfully!");
                setContent(parsed);
            } else {
                toast.error("Failed to save content");
            }
        } catch (error) {
            toast.error("Invalid JSON format");
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
                        <p className="text-gray-400 mt-1">Edit page content</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={formatJson}
                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                        Format JSON
                    </button>
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

            {/* Editor */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <span className="text-sm text-gray-400">content/{page}.json</span>
                    <span className="text-xs text-gray-500">JSON Editor</span>
                </div>
                <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    className="w-full h-[600px] bg-gray-900 text-gray-200 p-6 font-mono text-sm focus:outline-none resize-none"
                    spellCheck={false}
                />
            </div>

            {/* Help */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-medium mb-3">Tips</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Use the &quot;Format JSON&quot; button to auto-format and validate your changes
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Image URLs can be from Cloudinary or any external source
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
