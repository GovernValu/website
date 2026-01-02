import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    try {
        const { title, category } = await request.json();

        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        const categoryContext = category
            ? `This article belongs to the "${category}" category.`
            : "";

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an expert content writer for GovernValu, a premier governance and investment advisory firm based in Qatar serving the GCC region.

Write professional, insightful articles that demonstrate deep expertise in:
- Corporate governance best practices and board dynamics
- Investment strategy and portfolio management
- Risk management and enterprise risk frameworks
- GCC market insights, Vision 2030 initiatives, and regional business dynamics
- Family office services and wealth preservation
- Sovereign wealth fund investments and institutional investing

Your writing style should be:
- Professional yet accessible
- Data-informed and evidence-based where appropriate
- Strategic and forward-looking
- Relevant to C-suite executives, board members, family business owners, and institutional investors`
                },
                {
                    role: "user",
                    content: `Write a comprehensive blog article with the title: "${title}"

${categoryContext}

Generate the article in the following JSON format:
{
    "title": "The exact title or a slightly refined version",
    "excerpt": "A compelling 2-3 sentence summary (150-200 characters)",
    "content": "The full article content in HTML format with proper headings (h2, h3), paragraphs, lists where appropriate. The article should be 800-1200 words.",
    "metaTitle": "SEO-optimized title (50-60 characters)",
    "metaDesc": "SEO meta description (150-160 characters)"
}`
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content generated");
        }

        const article = JSON.parse(content);
        return NextResponse.json(article);

    } catch (error: any) {
        console.error("Content generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate content" },
            { status: 500 }
        );
    }
}
