import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || null,
                content: data.content,
                image: data.image || null,
                categoryId: data.categoryId || null,
                metaTitle: data.metaTitle || null,
                metaDesc: data.metaDesc || null,
                published: data.published || false,
            },
        });

        return NextResponse.json(post);
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "A post with this slug already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
