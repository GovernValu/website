"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import slugify from "slugify";

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
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        categoryId: "",
        metaTitle: "",
        metaDesc: "",
        published: false,
    });

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
                    categoryId: post.categoryId || "",
                    metaTitle: post.metaTitle || "",
                    metaDesc: post.metaDesc || "",
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
                                value={form.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-brand"
                                placeholder="Enter post title..."
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                Slug: <span className="text-gray-400">/blog/{form.slug || "..."}</span>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                value={form.excerpt}
                                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                rows={3}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none"
                                placeholder="Brief summary of the post..."
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Content
                            </label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                required
                                rows={15}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none font-mono text-sm"
                                placeholder="Write your post content here... (HTML supported)"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                HTML formatting is supported. Use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.
                            </p>
                        </div>
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
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Featured Image URL
                            </label>
                            <input
                                type="url"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                                placeholder="https://..."
                            />
                            {form.image && (
                                <div className="mt-4">
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
                                </div>
                            )}
                        </div>

                        {/* SEO */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-white font-medium mb-4">SEO</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        value={form.metaTitle}
                                        onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand text-sm"
                                        placeholder="SEO title..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                        Meta Description
                                    </label>
                                    <textarea
                                        value={form.metaDesc}
                                        onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
                                        rows={3}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand resize-none text-sm"
                                        placeholder="SEO description..."
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
