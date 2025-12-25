import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch single slide
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const slide = await prisma.heroSlide.findUnique({
            where: { id },
        });

        if (!slide) {
            return NextResponse.json(
                { error: "Slide not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(slide);
    } catch (error) {
        console.error("Failed to fetch slide:", error);
        return NextResponse.json(
            { error: "Failed to fetch slide" },
            { status: 500 }
        );
    }
}

// PUT - Update slide
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            title, subtitle, description, buttonText, buttonLink,
            titleAr, subtitleAr, descriptionAr, buttonTextAr,
            image, order, isActive
        } = body;

        const slide = await prisma.heroSlide.update({
            where: { id },
            data: {
                title,
                subtitle,
                description,
                buttonText,
                buttonLink,
                // Arabic Content
                titleAr,
                subtitleAr,
                descriptionAr,
                buttonTextAr,

                image,
                order,
                isActive,
            },
        });

        return NextResponse.json(slide);
    } catch (error) {
        console.error("Failed to update slide:", error);
        return NextResponse.json(
            { error: "Failed to update slide" },
            { status: 500 }
        );
    }
}

// DELETE - Delete slide
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.heroSlide.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete slide:", error);
        return NextResponse.json(
            { error: "Failed to delete slide" },
            { status: 500 }
        );
    }
}
