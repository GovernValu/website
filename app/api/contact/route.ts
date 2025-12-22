import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public endpoint for contact form submission
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const submission = await prisma.contactSubmission.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                inquiry: data.inquiry,
                message: data.message || null,
            },
        });

        return NextResponse.json({ success: true, id: submission.id });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit contact form" },
            { status: 500 }
        );
    }
}
