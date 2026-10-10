import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const [
            posts,
            publishedPosts,
            categories,
            contacts,
            unreadContacts,
            mediaAssets,
            heroSlides,
            activeHeroSlides,
            recentContacts,
        ] = await Promise.all([
            prisma.blogPost.count(),
            prisma.blogPost.count({ where: { published: true } }),
            prisma.blogCategory.count(),
            prisma.contactSubmission.count(),
            prisma.contactSubmission.count({ where: { isRead: false } }),
            prisma.mediaAsset.count(),
            prisma.heroSlide.count(),
            prisma.heroSlide.count({ where: { isActive: true } }),
            prisma.contactSubmission.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
                select: { id: true, firstName: true, lastName: true, company: true, inquiry: true, isRead: true, createdAt: true },
            }),
        ]);

        return NextResponse.json({
            posts,
            publishedPosts,
            categories,
            contacts,
            unreadContacts,
            mediaAssets,
            heroSlides,
            activeHeroSlides,
            recentContacts,
        });
    } catch (error) {
        return NextResponse.json({
            posts: 0,
            publishedPosts: 0,
            categories: 0,
            contacts: 0,
            unreadContacts: 0,
            mediaAssets: 0,
            heroSlides: 0,
            activeHeroSlides: 0,
            recentContacts: [],
        });
    }
}
