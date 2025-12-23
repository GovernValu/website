import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all slides (public - filter by isActive, or all for admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get("all") === "true";

        const slides = await prisma.heroSlide.findMany({
            where: all ? {} : { isActive: true },
            orderBy: { order: "asc" },
        });

        return NextResponse.json(slides);
    } catch (error) {
        console.error("Failed to fetch slides:", error);
        return NextResponse.json(
            { error: "Failed to fetch slides" },
            { status: 500 }
        );
    }
}

// POST - Create new slide (admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, subtitle, description, buttonText, buttonLink, image, order, isActive } = body;

        if (!title || !image) {
            return NextResponse.json(
                { error: "Title and image are required" },
                { status: 400 }
            );
        }

        // Get the highest order if not specified
        let slideOrder = order;
        if (slideOrder === undefined) {
            const lastSlide = await prisma.heroSlide.findFirst({
                orderBy: { order: "desc" },
            });
            slideOrder = lastSlide ? lastSlide.order + 1 : 0;
        }

        const slide = await prisma.heroSlide.create({
            data: {
                title,
                subtitle: subtitle || null,
                description: description || null,
                buttonText: buttonText || null,
                buttonLink: buttonLink || null,
                image,
                order: slideOrder,
                isActive: isActive !== undefined ? isActive : true,
            },
        });

        return NextResponse.json(slide, { status: 201 });
    } catch (error) {
        console.error("Failed to create slide:", error);
        return NextResponse.json(
            { error: "Failed to create slide" },
            { status: 500 }
        );
    }
}
