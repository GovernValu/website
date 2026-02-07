import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    try {
        const { category, count = 5 } = await request.json();

        const categoryContext = category
            ? `Generate blog post ideas specifically for the "${category}" category.`
            : "Generate diverse blog post ideas across governance, investment, risk management, and GCC market insights.";

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a strategic content planner for GovernValu, a premier governance and investment advisory firm based in the GCC region.

You generate high-value blog post ideas that would appeal to:
- C-suite executives and board members
- Family business owners and next-generation leaders
- Institutional investors and sovereign wealth fund managers
- Governance and compliance professionals

Focus on topics that demonstrate expertise in:
- Corporate governance best practices
- Investment strategy and portfolio management
- Risk management and enterprise risk frameworks
- GCC market insights, Vision 2030, and regional dynamics
- Family office services and wealth preservation
- Sustainable investing and ESG considerations`
                },
                {
                    role: "user",
                    content: `${categoryContext}

Generate ${count} compelling blog post ideas. For each idea, provide:
1. A catchy, SEO-optimized title (60-80 characters)
2. A brief description of what the article would cover (1-2 sentences)

Return the response in this JSON format:
{
    "ideas": [
        {
            "title": "Blog post title here",
            "description": "Brief description of what this article would cover"
        }
    ]
}`
                }
            ],
            max_completion_tokens: 2000,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No ideas generated");
        }

        const result = JSON.parse(content);
        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Ideas generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate ideas" },
            { status: 500 }
        );
    }
}
