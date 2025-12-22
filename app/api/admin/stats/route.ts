import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const [
            posts,
            publishedPosts,
            categories,
            contacts,
            unreadContacts,
            mediaAssets,
        ] = await Promise.all([
            prisma.blogPost.count(),
            prisma.blogPost.count({ where: { published: true } }),
            prisma.blogCategory.count(),
            prisma.contactSubmission.count(),
            prisma.contactSubmission.count({ where: { isRead: false } }),
            prisma.mediaAsset.count(),
        ]);

        return NextResponse.json({
            posts,
            publishedPosts,
            categories,
            contacts,
            unreadContacts,
            mediaAssets,
        });
    } catch (error) {
        return NextResponse.json({
            posts: 0,
            publishedPosts: 0,
            categories: 0,
            contacts: 0,
            unreadContacts: 0,
            mediaAssets: 0,
        });
    }
}
