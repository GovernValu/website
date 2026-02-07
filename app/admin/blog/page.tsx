"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    published: boolean;
    category: { name: string } | null;
    createdAt: string;
    updatedAt: string;
}

interface TopicSuggestion {
    title: string;
    description: string;
    audience: string;
}

export default function BlogListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

    // AI Topic Suggestions
    const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
    const [suggestedTopics, setSuggestedTopics] = useState<TopicSuggestion[]>([]);
    const [loadingTopics, setLoadingTopics] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            toast.error("Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Post deleted");
                fetchPosts();
            } else {
                toast.error("Failed to delete post");
            }
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    const handleGetTopicIdeas = async () => {
        setLoadingTopics(true);
        setShowTopicSuggestions(true);
        setSuggestedTopics([]);

        try {
            const res = await fetch("/api/ai/generate-ideas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count: 5 }),
            });

            if (res.ok) {
                const data = await res.json();
                // Map the ideas to the expected format
                const topics = (data.ideas || []).map((idea: any) => ({
                    title: idea.title,
                    description: idea.description,
                    audience: "Business Leaders"
                }));
                setSuggestedTopics(topics);
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to get topic ideas");
            }
        } catch (error) {
            toast.error("Failed to get topic ideas");
        } finally {
            setLoadingTopics(false);
        }
    };

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === "all" ||
            (filter === "published" && post.published) ||
            (filter === "draft" && !post.published);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white">Blog Posts</h1>
                    <p className="text-gray-400 mt-1">Create and manage blog articles</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleGetTopicIdeas}
                        disabled={loadingTopics}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {loadingTopics ? "Thinking..." : "AI Topic Ideas"}
                    </button>
                    <Link
                        href="/admin/blog/new"
                        className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Post
                    </Link>
                </div>
            </div>

            {/* AI Topic Suggestions Panel */}
            {showTopicSuggestions && (
                <div className="bg-gradient-to-br from-purple-900/30 to-brand/20 rounded-xl p-6 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">AI Topic Suggestions</h3>
                                <p className="text-gray-400 text-sm">Click a topic to create a new post</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowTopicSuggestions(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {loadingTopics ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
                                <span className="text-gray-300">Generating topic ideas...</span>
                            </div>
                        </div>
                    ) : suggestedTopics.length > 0 ? (
                        <div className="grid gap-3">
                            {suggestedTopics.map((topic, index) => (
                                <Link
                                    key={index}
                                    href={`/admin/blog/new?title=${encodeURIComponent(topic.title)}`}
                                    className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-gray-800 transition-all group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                {topic.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm mt-1">{topic.description}</p>
                                            <span className="inline-block mt-2 text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                                                {topic.audience}
                                            </span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">No topics generated yet.</p>
                    )}

                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleGetTopicIdeas}
                            disabled={loadingTopics}
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Generate More Ideas
                        </button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "published", "draft"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${filter === f
                                ? "bg-brand text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts List */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-white font-medium mb-2">No posts found</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        {searchTerm ? "Try a different search term" : "Create your first blog post"}
                    </p>
                    <Link
                        href="/admin/blog/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Post
                    </Link>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Title
                                </th>
                                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Category
                                </th>
                                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Status
                                </th>
                                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Date
                                </th>
                                <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/blog/${post.id}`} className="text-white hover:text-brand transition-colors">
                                            {post.title}
                                        </Link>
                                        {post.excerpt && (
                                            <p className="text-gray-500 text-sm truncate max-w-md">{post.excerpt}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-400 text-sm">
                                            {post.category?.name || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded text-xs font-medium ${post.published
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-yellow-500/10 text-yellow-500"
                                                }`}
                                        >
                                            {post.published ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/blog/${post.id}`}
                                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
