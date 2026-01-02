import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.metaTitle || `${post.title} | GovernValu`,
        description: post.metaDesc || post.excerpt || undefined,
    };
}

async function getPost(slug: string) {
    try {
        return await prisma.blogPost.findUnique({
            where: { slug, published: true },
            include: { category: true },
        });
    } catch (error) {
        return null;
    }
}

async function getRelatedPosts(categoryId: string | null, currentSlug: string) {
    if (!categoryId) return [];

    try {
        return await prisma.blogPost.findMany({
            where: {
                categoryId,
                published: true,
                NOT: { slug: currentSlug },
            },
            include: { category: true },
            orderBy: { createdAt: "desc" },
            take: 3,
        });
    } catch (error) {
        return [];
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.categoryId, slug);

    // Calculate read time (average 200 words per minute)
    const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <>
            <Header />
            <main className="min-h-screen bg-onyx">
                {/* Hero */}
                <section className="pt-32 pb-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Link href="/" className="hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-gray-300 transition-colors">
                                Blog
                            </Link>
                            {post.category && (
                                <>
                                    <span>/</span>
                                    <Link
                                        href={`/blog?category=${post.category.slug}`}
                                        className="text-brand hover:text-brand-light transition-colors"
                                    >
                                        {post.category.name}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Category */}
                        {post.category && (
                            <Link
                                href={`/blog?category=${post.category.slug}`}
                                className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-4 hover:bg-brand/20 transition-colors"
                            >
                                {post.category.name}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                {post.image && (
                    <section className="px-6 pb-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                            </div>
                        </div>
                    </section>
                )}

                {/* Content */}
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto">
                        <article
                            className="prose prose-lg prose-invert prose-headings:font-serif prose-headings:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-gray-300 prose-li:text-gray-300 prose-li:marker:text-brand max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </section>

                {/* Share Section */}
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="border-t border-b border-gray-800 py-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <span className="text-gray-400 text-sm">Share this article</span>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://governvalu.com/blog/${post.slug}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400 hover:bg-brand hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://governvalu.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400 hover:bg-[#0077B5] hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`https://governvalu.com/blog/${post.slug}`);
                                        }}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                                        title="Copy link"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back to Blog */}
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors group"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="px-6 pb-24">
                        <div className="max-w-6xl mx-auto">
                            <div className="border-t border-gray-800 pt-16">
                                <div className="text-center mb-12">
                                    <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                        Related Articles
                                    </span>
                                    <h2 className="text-3xl font-serif text-white">
                                        Continue Reading
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="group bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                                        >
                                            {relatedPost.image && (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={relatedPost.image}
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                {relatedPost.category && (
                                                    <span className="text-brand text-xs font-bold uppercase tracking-widest">
                                                        {relatedPost.category.name}
                                                    </span>
                                                )}
                                                <h3 className="text-lg font-serif text-white mt-2 mb-3 group-hover:text-brand transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <span className="text-gray-500 text-xs">
                                                    {new Date(relatedPost.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
