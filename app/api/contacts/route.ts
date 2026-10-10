import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Admin endpoint for listing contact submissions
export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;

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
