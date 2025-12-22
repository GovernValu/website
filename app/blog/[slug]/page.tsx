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

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

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
                                    <span className="text-brand">{post.category.name}</span>
                                </>
                            )}
                        </div>

                        {/* Category */}
                        {post.category && (
                            <span className="inline-block py-1 px-3 border border-brand/50 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                {post.category.name}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            {post.excerpt && (
                                <>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                    <span className="text-gray-500">{post.excerpt.split(" ").length} min read</span>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                {post.image && (
                    <section className="px-6 pb-12">
                        <div className="max-w-4xl mx-auto">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    </section>
                )}

                {/* Content */}
                <section className="px-6 pb-24">
                    <div className="max-w-3xl mx-auto">
                        <article
                            className="prose prose-lg prose-invert prose-headings:font-serif prose-headings:text-white prose-p:text-gray-300 prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-gray-300 prose-li:text-gray-300 max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </section>

                {/* Back to Blog */}
                <section className="px-6 pb-24">
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
