import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Admin endpoint for listing contact submissions
export async function GET() {
    try {
        const contacts = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch contacts" },
            { status: 500 }
        );
    }
}
