import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

// Route segment config for App Router - use dynamic runtime
export const dynamic = 'force-dynamic';
// Note: For body size limits in Vercel, use vercel.json
// Next.js App Router doesn't have built-in bodyParser config like Pages Router

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64, {
            folder: "governvalu",
            resource_type: "auto",
        });

        // Save to database
        await prisma.mediaAsset.create({
            data: {
                publicId: result.public_id,
                url: result.url,
                secureUrl: result.secure_url,
                format: result.format,
                width: result.width,
                height: result.height,
                bytes: result.bytes,
                resourceType: result.resource_type,
            },
        });

        return NextResponse.json({
            public_id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
