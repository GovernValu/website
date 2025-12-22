import { NextResponse } from "next/server";
import { getContent, saveContent, getAllContentPages } from "@/lib/content";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ page: string }> }
) {
    const { page } = await params;

    try {
        const content = getContent(page);

        if (!content) {
            return NextResponse.json(
                { error: "Content not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ page: string }> }
) {
    const { page } = await params;

    try {
        const content = await request.json();
        saveContent(page, content);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to save content" },
            { status: 500 }
        );
    }
}
