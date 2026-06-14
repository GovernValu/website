"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { translateBlogFields } from "@/lib/blog-translate";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="animate-pulse flex flex-col gap-4">
                <div className="h-10 bg-gray-700 rounded"></div>
                <div className="h-64 bg-gray-700 rounded"></div>
            </div>
        </div>
    ),
});

interface Category {
    id: string;
    name: string;
}

interface BlogEditorProps {
    params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: BlogEditorProps) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [activeLang, setActiveLang] = useState<"en" | "ar">("en");
    const [translating, setTranslating] = useState(false);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        imageAr: "",
        categoryId: "",
        metaTitle: "",
        metaDesc: "",
        titleAr: "",
        excerptAr: "",
        contentAr: "",
        metaTitleAr: "",
        metaDescAr: "",
        published: false,
    });

    const isAr = activeLang === "ar";
    const dirAttr = isAr ? "rtl" : "ltr";
    const imageField = isAr ? "imageAr" : "image";
    const currentImage = isAr ? form.imageAr : form.image;

    const handleTranslate = async () => {
        const direction = isAr ? "en-ar" : "ar-en";
        const source = isAr
            ? {
                title: form.title,
                excerpt: form.excerpt,
                content: form.content,
                metaTitle: form.metaTitle,
                metaDesc: form.metaDesc,
            }
            : {
                title: form.titleAr,
                excerpt: form.excerptAr,
                content: form.contentAr,
                metaTitle: form.metaTitleAr,
                metaDesc: form.metaDescAr,
            };

        const hasSource = Object.values(source).some((v) => v.trim().length > 0);
        if (!hasSource) {
            toast.error(`Fill in the ${isAr ? "English" : "Arabic"} side first.`);
            return;
        }

        setTranslating(true);
        try {
            const t = await translateBlogFields(direction, source);
            if (isAr) {
                setForm((f) => ({
                    ...f,
                    titleAr: t.title || f.titleAr,
                    excerptAr: t.excerpt || f.excerptAr,
                    contentAr: t.content || f.contentAr,
                    metaTitleAr: t.metaTitle || f.metaTitleAr,
                    metaDescAr: t.metaDesc || f.metaDescAr,
                }));
            } else {
                setForm((f) => ({
                    ...f,
                    title: t.title || f.title,
                    slug: t.title ? slugify(t.title, { lower: true, strict: true }) : f.slug,
                    excerpt: t.excerpt || f.excerpt,
                    content: t.content || f.content,
                    metaTitle: t.metaTitle || f.metaTitle,
                    metaDesc: t.metaDesc || f.metaDesc,
                }));
            }
            toast.success("Translated!");
        } catch (e: any) {
            toast.error(e.message || "Translation failed");
        } finally {
            setTranslating(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [postRes, catRes] = await Promise.all([
                fetch(`/api/blog/${id}`),
                fetch("/api/categories"),
            ]);

            if (postRes.ok) {
                const post = await postRes.json();
                setForm({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt || "",
                    content: post.content,
                    image: post.image || "",
                    imageAr: post.imageAr || "",
                    categoryId: post.categoryId || "",
                    metaTitle: post.metaTitle || "",
                    metaDesc: post.metaDesc || "",
                    titleAr: post.titleAr || "",
                    excerptAr: post.excerptAr || "",
                    contentAr: post.contentAr || "",
                    metaTitleAr: post.metaTitleAr || "",
                    metaDescAr: post.metaDescAr || "",
                    published: post.published,
                });
            } else {
                toast.error("Post not found");
                router.push("/admin/blog");
            }

            if (catRes.ok) {
                const cats = await catRes.json();
                setCategories(cats);
            }
        } catch (error) {
            toast.error("Failed to load post");
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (title: string) => {
        setForm({
            ...form,
            title,
            slug: slugify(title, { lower: true, strict: true }),
        });
    };

    const handleGenerateWithAI = async () => {
        if (!form.title.trim()) {
            toast.error("Please enter a title first");
            return;
        }

        if (!confirm("This will replace the current content. Are you sure?")) {
            return;
        }

        setGenerating(true);

        try {
            const selectedCategory = categories.find(c => c.id === form.categoryId);

            const res = await fetch("/api/ai/generate-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    category: selectedCategory?.name || "",
                }),
            });

            if (res.ok) {
                const article = await res.json();
                setForm({
                    ...form,
                    excerpt: article.excerpt || "",
                    content: article.content || "",
                    metaTitle: article.metaTitle || "",
                    metaDesc: article.metaDesc || "",
                });
                toast.success("Content regenerated successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to generate content");
            }
        } catch (error) {
            toast.error("Failed to generate content");
        } finally {
            setGenerating(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                const field = activeLang === "ar" ? "imageAr" : "image";
                setForm((f) => ({ ...f, [field]: data.secure_url }));
                toast.success("Image uploaded successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to upload image");
            }
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
            // Reset the input so the same file can be re-selected if needed
            e.target.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success("Post updated successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to update post");
            }
        } catch (error) {
            toast.error("Failed to update post");
        } finally {
            setSaving(false);
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
                        href="/admin/blog"
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif text-white">Edit Post</h1>
                        <p className="text-gray-400 mt-1">Update blog article</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex rounded-lg overflow-hidden border border-gray-700">
                        <button
                            type="button"
                            onClick={() => setActiveLang("en")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeLang === "en" ? "bg-brand text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
                        >
                            English
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveLang("ar")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeLang === "ar" ? "bg-brand text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
                        >
                            العربية
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleTranslate}
                        disabled={translating}
                        title={`Translate from ${isAr ? "English" : "Arabic"} into the current tab`}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {translating ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Translating...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                Translate from {isAr ? "EN" : "AR"}
                            </>
                        )}
                    </button>
                    {form.published && (
                        <Link
                            href={`/blog/${form.slug}`}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Post
                        </Link>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title with AI Generate Button */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400">
                                    Title
                                </label>
                                <button
                                    type="button"
                                    onClick={handleGenerateWithAI}
                                    disabled={generating || !form.title.trim()}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {generating ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Regenerating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Regenerate with AI
                                        </>
                                    )}
                                </button>
                            </div>
                            <input
                                type="text"
                                dir={dirAttr}
                                value={isAr ? form.titleAr : form.title}
                                onChange={(e) => {
                                    if (isAr) {
                                        setForm({ ...form, titleAr: e.target.value });
                                    } else {
                                        handleTitleChange(e.target.value);
                                    }
                                }}
                                required={!isAr}
                                className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-brand ${isAr ? "text-right" : ""}`}
                                placeholder={isAr ? "أدخل عنوان المقال..." : "Enter post title..."}
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                Slug: <span className="text-gray-400">/blog/{form.slug || "..."}</span>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Excerpt ({isAr ? "العربية" : "English"})
                            </label>
                            <textarea
                                dir={dirAttr}
                                value={isAr ? form.excerptAr : form.excerpt}
                                onChange={(e) => setForm({
                                    ...form,
                                    [isAr ? "excerptAr" : "excerpt"]: e.target.value,
                                })}
                                rows={3}
                                className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none ${isAr ? "text-right" : ""}`}
                                placeholder={isAr ? "ملخص قصير للمقال..." : "Brief summary of the post..."}
                            />
                        </div>

                        {/* WYSIWYG Content Editor */}
                        <RichTextEditor
                            key={activeLang}
                            content={isAr ? form.contentAr : form.content}
                            onChange={(html) => setForm({
                                ...form,
                                [isAr ? "contentAr" : "content"]: html,
                            })}
                            placeholder={isAr ? "اكتب محتوى المقال هنا..." : "Write your post content here..."}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-white font-medium mb-4">Publish</h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-400 text-sm">Status</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.published}
                                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                                    <span className="ml-3 text-sm text-gray-400">
                                        {form.published ? "Published" : "Draft"}
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
                                    "Update Post"
                                )}
                            </button>
                        </div>

                        {/* Category */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Category
                            </label>
                            <select
                                value={form.categoryId}
                                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
                                Featured Image ({isAr ? "العربية" : "English"})
                            </label>
                            <p className="text-xs text-gray-500 mb-3">
                                {isAr
                                    ? "صورة الغلاف الخاصة بالنسخة العربية"
                                    : "Cover image for the English version. Switch to العربية to set a separate Arabic cover."}
                            </p>

                            {currentImage ? (
                                <div className="relative group">
                                    <img
                                        src={currentImage}
                                        alt="Featured image preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                        onError={(e) => (e.currentTarget.style.opacity = "0.3")}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                                        <label className="cursor-pointer p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors" title="Replace image">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, [imageField]: "" })}
                                            className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600 transition-colors"
                                            title="Remove image"
                                        >
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center">
                                            <svg className="animate-spin h-8 w-8 text-brand mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-white text-sm">Uploading...</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploading ? 'border-brand bg-brand/10' : 'border-gray-600 hover:border-gray-500 bg-gray-900/50 hover:bg-gray-900'}`}>
                                    {uploading ? (
                                        <div className="flex flex-col items-center">
                                            <svg className="animate-spin h-8 w-8 text-brand mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-gray-400 text-sm">Uploading...</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <svg className="w-10 h-10 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-400 text-sm font-medium">Click to upload image</span>
                                            <span className="text-gray-500 text-xs mt-1">PNG, JPG, WEBP up to 5MB</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                </label>
                            )}

                            {/* Optional URL input */}
                            <div className="mt-3">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <div className="flex-1 border-t border-gray-700"></div>
                                    <span>or paste URL</span>
                                    <div className="flex-1 border-t border-gray-700"></div>
                                </div>
                                <input
                                    type="url"
                                    value={currentImage}
                                    onChange={(e) => setForm({ ...form, [imageField]: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-white font-medium mb-4">SEO ({isAr ? "العربية" : "English"})</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        dir={dirAttr}
                                        value={isAr ? form.metaTitleAr : form.metaTitle}
                                        onChange={(e) => setForm({
                                            ...form,
                                            [isAr ? "metaTitleAr" : "metaTitle"]: e.target.value,
                                        })}
                                        className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand text-sm ${isAr ? "text-right" : ""}`}
                                        placeholder={isAr ? "عنوان SEO..." : "SEO title..."}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                        Meta Description
                                    </label>
                                    <textarea
                                        dir={dirAttr}
                                        value={isAr ? form.metaDescAr : form.metaDesc}
                                        onChange={(e) => setForm({
                                            ...form,
                                            [isAr ? "metaDescAr" : "metaDesc"]: e.target.value,
                                        })}
                                        rows={3}
                                        className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none text-sm ${isAr ? "text-right" : ""}`}
                                        placeholder={isAr ? "وصف SEO..." : "SEO description..."}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
