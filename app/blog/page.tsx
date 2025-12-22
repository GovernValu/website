import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | GovernValu",
    description: "Latest insights, news, and updates from GovernValu on governance, investment, and advisory services in the GCC.",
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

export default async function BlogPage() {
    const posts = await getPublishedPosts();

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
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                            Expert perspectives on governance, investment strategy, and advisory services across the GCC region.
                        </p>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="pb-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        {posts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-400">No posts published yet. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
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
                                            <h2 className="text-xl font-serif text-white mt-2 mb-3 group-hover:text-brand transition-colors">
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
            </main>
            <Footer />
        </>
    );
}
