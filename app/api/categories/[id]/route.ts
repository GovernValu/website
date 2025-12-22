import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const data = await request.json();

        const category = await prisma.blogCategory.update({
            where: { id },
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
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.blogCategory.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}
