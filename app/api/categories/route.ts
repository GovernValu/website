import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: { select: { posts: true } },
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const category = await prisma.blogCategory.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description || null,
            },
        });

        return NextResponse.json(category);
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "A category with this name or slug already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}
