"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import slugify from "slugify";
import dynamic from "next/dynamic";

// Dynamic import for the WYSIWYG editor (avoid SSR issues)
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

interface BlogIdea {
    title: string;
    description: string;
}

function NewBlogPostForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [generatingIdeas, setGeneratingIdeas] = useState(false);
    const [showIdeasPanel, setShowIdeasPanel] = useState(false);
    const [aiIdeas, setAiIdeas] = useState<BlogIdea[]>([]);
    const [ideaPrompt, setIdeaPrompt] = useState("");
    const [uploading, setUploading] = useState(false);
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
        fetchCategories();

        // Check for pre-filled title from URL params (from AI suggestions)
        const titleParam = searchParams.get("title");
        if (titleParam) {
            handleTitleChange(titleParam);
        }
    }, [searchParams]);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories");
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
                    title: article.title || form.title,
                    slug: slugify(article.title || form.title, { lower: true, strict: true }),
                    excerpt: article.excerpt || "",
                    content: article.content || "",
                    metaTitle: article.metaTitle || "",
                    metaDesc: article.metaDesc || "",
                });
                toast.success("Content generated successfully!");
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

    const handleGenerateIdeas = async () => {
        setGeneratingIdeas(true);
        setShowIdeasPanel(true);

        try {
            const selectedCategory = categories.find(c => c.id === form.categoryId);

            const res = await fetch("/api/ai/generate-ideas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: selectedCategory?.name || "",
                    topic: ideaPrompt.trim() || "",
                    count: 6,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setAiIdeas(data.ideas || []);
                toast.success("Ideas generated!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to generate ideas");
            }
        } catch (error) {
            toast.error("Failed to generate ideas");
        } finally {
            setGeneratingIdeas(false);
        }
    };

    const handleSelectIdea = (idea: BlogIdea) => {
        handleTitleChange(idea.title);
        setShowIdeasPanel(false);
        toast.success("Idea selected! Click 'Generate with AI' to create the full article.");
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
                setForm({ ...form, image: data.secure_url });
                toast.success("Image uploaded successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to upload image");
            }
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                const post = await res.json();
                toast.success("Post created successfully!");
                router.push(`/admin/blog/${post.id}`);
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to create post");
            }
        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setSaving(false);
        }
    };

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
                        <h1 className="text-3xl font-serif text-white">New Post</h1>
                        <p className="text-gray-400 mt-1">Create a new blog article</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title with AI Generate Buttons */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400">
                                    Title
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleGenerateIdeas}
                                        disabled={generatingIdeas}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {generatingIdeas ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Getting Ideas...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                                Get Ideas
                                            </>
                                        )}
                                    </button>
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
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Generate Article
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-brand"
                                placeholder="Enter post title or click 'Get Ideas' for AI suggestions..."
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                Slug: <span className="text-gray-400">/blog/{form.slug || "..."}</span>
                            </div>
                        </div>

                        {/* AI Ideas Panel */}
                        {showIdeasPanel && (
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/30">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <h3 className="text-white font-medium">AI-Suggested Blog Ideas</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowIdeasPanel(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {generatingIdeas ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <svg className="animate-spin h-8 w-8 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="text-gray-400">Generating creative ideas...</p>
                                    </div>
                                ) : aiIdeas.length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {aiIdeas.map((idea, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleSelectIdea(idea)}
                                                className="text-left p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-800 transition-all duration-200 group"
                                            >
                                                <h4 className="text-white font-medium text-sm mb-2 group-hover:text-purple-300 transition-colors">
                                                    {idea.title}
                                                </h4>
                                                <p className="text-gray-400 text-xs line-clamp-2">
                                                    {idea.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center py-8">No ideas generated yet. Click &apos;Get Ideas&apos; to start.</p>
                                )}

                                {aiIdeas.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={ideaPrompt}
                                                onChange={(e) => setIdeaPrompt(e.target.value)}
                                                placeholder="Enter a topic for more specific ideas..."
                                                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleGenerateIdeas}
                                                disabled={generatingIdeas}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                {ideaPrompt.trim() ? "Generate" : "More Ideas"}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            💡 Type a specific topic to get targeted ideas, or leave empty for general ideas
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

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


                        {/* WYSIWYG Content Editor */}
                        <RichTextEditor
                            content={form.content}
                            onChange={(html) => setForm({ ...form, content: html })}
                            placeholder="Start writing your blog post content..."
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
                                    "Create Post"
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
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">
                                Featured Image
                            </label>

                            {form.image ? (
                                <div className="relative group">
                                    <img
                                        src={form.image}
                                        alt="Featured image preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                                        <label className="cursor-pointer p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, image: "" })}
                                            className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
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
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand text-sm"
                                    placeholder="https://..."
                                />
                            </div>
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

export default function NewBlogPostPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
            </div>
        }>
            <NewBlogPostForm />
        </Suspense>
    );
}
