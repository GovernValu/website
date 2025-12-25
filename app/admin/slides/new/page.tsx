"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NewSlidePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        buttonText: "",
        buttonLink: "",
        // Arabic Content
        titleAr: "",
        subtitleAr: "",
        descriptionAr: "",
        buttonTextAr: "",

        image: "",
        isActive: true,
    });

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, image: data.secure_url || data.url });
            }
        } catch (error) {
            console.error("Failed to upload image:", error);
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.title || !formData.image) {
            alert("Title and image are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/slides");
            } else {
                const error = await res.json();
                alert(error.error || "Failed to create slide");
            }
        } catch (error) {
            console.error("Failed to create slide:", error);
            alert("Failed to create slide");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/slides" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-serif text-white">Create New Slide</h1>
                    <p className="text-gray-400 mt-1">Add a new slide to the homepage hero</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                        Slide Image *
                    </label>

                    {formData.image ? (
                        <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-4">
                            <Image
                                src={formData.image}
                                alt="Slide preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, image: "" })}
                                className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-brand transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                            {uploading ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mb-4" />
                                    <span className="text-gray-400">Uploading...</span>
                                </div>
                            ) : (
                                <>
                                    <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-400 mb-1">Click to upload image</span>
                                    <span className="text-gray-500 text-sm">Recommended: 1920x1080 or larger</span>
                                </>
                            )}
                        </label>
                    )}
                </div>

                {/* English Content Fields */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <h2 className="text-lg font-medium text-white mb-4">English Content</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title * <span className="text-gray-500">(HTML supported)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder='Precision in <br /><span class="text-brand">Governance.</span>'
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Subtitle <span className="text-gray-500">(badge above title)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder="Qatar-Based Advisory"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="We architect resilient strategies for sovereign wealth funds..."
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Button Text
                            </label>
                            <input
                                type="text"
                                value={formData.buttonText}
                                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                placeholder="Partner With Us"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Button Link
                            </label>
                            <input
                                type="text"
                                value={formData.buttonLink}
                                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                placeholder="/contact"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                            />
                        </div>
                    </div>
                </div>

                {/* Arabic Content Fields */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <h2 className="text-lg font-medium text-white mb-4">Arabic Content</h2>

                    <div dir="rtl">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            العنوان (Title) <span className="text-gray-500">(HTML supported)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.titleAr}
                            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                            placeholder='دقة في <br /><span class="text-brand">الحوكمة.</span>'
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                        />
                    </div>

                    <div dir="rtl">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            العنوان الفرعي (Subtitle)
                        </label>
                        <input
                            type="text"
                            value={formData.subtitleAr}
                            onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                            placeholder="استشارات مقرها قطر"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                        />
                    </div>

                    <div dir="rtl">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            الوصف (Description)
                        </label>
                        <textarea
                            value={formData.descriptionAr}
                            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                            placeholder="نحن نصمم استراتيجيات مرنة..."
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none"
                        />
                    </div>

                    <div dir="rtl">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            نص الزر (Button Text)
                        </label>
                        <input
                            type="text"
                            value={formData.buttonTextAr}
                            onChange={(e) => setFormData({ ...formData, buttonTextAr: e.target.value })}
                            placeholder="شاركنا النجاح"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                        />
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">Settings</h2>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 bg-gray-900 border-gray-700 rounded text-brand focus:ring-brand"
                        />
                        <span className="text-gray-300">Active (visible on homepage)</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading || !formData.title || !formData.image}
                        className="flex-1 px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Slide"}
                    </button>
                    <Link
                        href="/admin/slides"
                        className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
