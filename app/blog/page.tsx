import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog & Insights",
    description: "Latest insights, articles, and industry updates from GovernValu on governance, investment strategies, risk management, and business advisory in Qatar and the GCC.",
    keywords: ["governance blog", "investment insights", "GCC business news", "Qatar advisory articles", "corporate governance updates", "business strategy blog"],
    openGraph: {
        title: "Blog & Insights | GovernValu",
        description: "Latest insights and industry updates on governance and investment from GovernValu.",
        type: "website",
    },
};

export const dynamic = "force-dynamic";

async function getPublishedPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });
        return posts;
    } catch (error) {
        return [];
    }
}

async function getCategories() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: { select: { posts: { where: { published: true } } } },
            },
        });
        return categories;
    } catch (error) {
        return [];
    }
}

interface BlogPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { category: selectedCategory } = await searchParams;
    const [allPosts, categories] = await Promise.all([
        getPublishedPosts(),
        getCategories(),
    ]);

    // Filter posts by category if selected
    const posts = selectedCategory
        ? allPosts.filter((post) => post.category?.slug === selectedCategory)
        : allPosts;

    const totalPosts = allPosts.length;
    const totalCategories = categories.length;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx">
                {/* Hero */}
                <section className="pt-32 pb-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-6">
                            Insights & News
                        </span>
                        <h1 className="text-5xl md:text-6xl font-serif font-medium text-white mb-6">
                            Latest <span className="italic text-brand">Insights</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">
                            Expert perspectives on governance, investment strategy, and advisory services across the GCC region.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-brand font-bold text-2xl">{totalPosts}</span>
                                <span className="text-gray-400">Articles</span>
                            </div>
                            <div className="w-px h-8 bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <span className="text-brand font-bold text-2xl">{totalCategories}</span>
                                <span className="text-gray-400">Categories</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Filters */}
                {categories.length > 0 && (
                    <section className="px-6 pb-8">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Link
                                    href="/blog"
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!selectedCategory
                                        ? "bg-brand text-white"
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                                        }`}
                                >
                                    All Posts
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/blog?category=${cat.slug}`}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.slug
                                            ? "bg-brand text-white"
                                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                                            }`}
                                    >
                                        {cat.name}
                                        <span className="ml-2 text-xs opacity-60">({cat._count.posts})</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Post (first post when no filter) */}
                {!selectedCategory && posts.length > 0 && (
                    <section className="px-6 pb-12">
                        <div className="max-w-6xl mx-auto">
                            <Link
                                href={`/blog/${posts[0].slug}`}
                                className="group block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-brand/50 transition-all duration-500 overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    {posts[0].image && (
                                        <div className="aspect-video md:aspect-auto overflow-hidden">
                                            <img
                                                src={posts[0].image}
                                                alt={posts[0].title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <span className="inline-block px-3 py-1 bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-widest mb-4 w-fit">
                                            Featured
                                        </span>
                                        {posts[0].category && (
                                            <span className="text-brand text-sm font-medium mb-2">
                                                {posts[0].category.name}
                                            </span>
                                        )}
                                        <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-brand transition-colors">
                                            {posts[0].title}
                                        </h2>
                                        {posts[0].excerpt && (
                                            <p className="text-gray-400 mb-6 line-clamp-3">
                                                {posts[0].excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 text-sm">
                                                {new Date(posts[0].createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="text-brand font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read Article
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Posts Grid */}
                <section className="pb-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        {selectedCategory && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif text-white">
                                    {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                                </h2>
                                <p className="text-gray-400 mt-1">
                                    {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
                                </p>
                            </div>
                        )}

                        {posts.length === 0 ? (
                            <div className="text-center py-20">
                                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-400 text-lg">No posts published yet.</p>
                                <p className="text-gray-500 text-sm mt-2">Check back soon for new articles!</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(selectedCategory ? posts : posts.slice(1)).map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                                    >
                                        {post.image && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {post.category && (
                                                <span className="text-brand text-xs font-bold uppercase tracking-widest">
                                                    {post.category.name}
                                                </span>
                                            )}
                                            <h2 className="text-xl font-serif text-white mt-2 mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            {post.excerpt && (
                                                <p className="text-gray-400 text-sm line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-gray-500 text-xs">
                                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                                <span className="text-brand text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                    Read →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="px-6 pb-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/30 rounded-2xl p-8 md:p-12 text-center">
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                                Stay Informed
                            </h3>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                Subscribe to our newsletter for the latest insights on governance, investment strategy, and GCC market trends.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
                            >
                                Get in Touch
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
