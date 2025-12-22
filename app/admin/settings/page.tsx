"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await fetch("/api/content/settings");
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);

        try {
            const res = await fetch("/api/content/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                toast.success("Settings saved!");
            } else {
                toast.error("Failed to save settings");
            }
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (path: string, value: unknown) => {
        if (!settings) return;

        const keys = path.split(".");
        const newSettings = { ...settings };
        let current: Record<string, unknown> = newSettings;

        for (let i = 0; i < keys.length - 1; i++) {
            current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
            current = current[keys[i]] as Record<string, unknown>;
        }

        current[keys[keys.length - 1]] = value;
        setSettings(newSettings);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    // Type cast settings for easier access
    const s = settings as {
        companyName: string;
        tagline: string;
        contact: {
            phone: string;
            email: string;
            address: { line1: string; line2: string; line3: string };
            officeHours: string;
        };
        socialMedia: { linkedin: string; twitter: string };
        seo: { defaultTitle: string; defaultDescription: string; keywords: string };
        footer: { copyright: string; tagline: string };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Global site settings and configuration</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Company Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">Company Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={s?.companyName || ""}
                                onChange={(e) => updateSetting("companyName", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={s?.tagline || ""}
                                onChange={(e) => updateSetting("tagline", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">Contact Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={s?.contact?.phone || ""}
                                onChange={(e) => updateSetting("contact.phone", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={s?.contact?.email || ""}
                                onChange={(e) => updateSetting("contact.email", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Office Hours
                            </label>
                            <input
                                type="text"
                                value={s?.contact?.officeHours || ""}
                                onChange={(e) => updateSetting("contact.officeHours", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">Social Media</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                value={s?.socialMedia?.linkedin || ""}
                                onChange={(e) => updateSetting("socialMedia.linkedin", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                                placeholder="https://linkedin.com/company/..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Twitter / X
                            </label>
                            <input
                                type="url"
                                value={s?.socialMedia?.twitter || ""}
                                onChange={(e) => updateSetting("socialMedia.twitter", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">SEO Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Default Title
                            </label>
                            <input
                                type="text"
                                value={s?.seo?.defaultTitle || ""}
                                onChange={(e) => updateSetting("seo.defaultTitle", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Default Description
                            </label>
                            <textarea
                                value={s?.seo?.defaultDescription || ""}
                                onChange={(e) => updateSetting("seo.defaultDescription", e.target.value)}
                                rows={3}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Keywords
                            </label>
                            <input
                                type="text"
                                value={s?.seo?.keywords || ""}
                                onChange={(e) => updateSetting("seo.keywords", e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                                placeholder="governance, investment, qatar..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-medium text-white mb-4">Advanced</h2>
                <p className="text-gray-400 text-sm mb-4">
                    For full control over site settings, you can edit the JSON file directly.
                </p>
                <Link
                    href="/admin/pages/settings"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Edit JSON
                </Link>
            </div>
        </div>
    );
}
