import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    try {
        const { category } = await request.json();

        const categoryPrompt = category
            ? `for the "${category}" category`
            : "across corporate governance, investment strategy, risk management, and GCC regional insights";

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a content strategist for GovernValu, a premier governance and investment advisory firm based in Qatar serving the GCC region. 
                    
Your expertise includes:
- Corporate governance best practices
- Investment strategy and portfolio management
- Risk management and mitigation
- GCC market insights and regional business dynamics
- Family office services
- Sovereign wealth fund investments

Generate blog topic ideas that would interest C-suite executives, board members, family business owners, and institutional investors in the Middle East.`
                },
                {
                    role: "user",
                    content: `Generate 5 compelling blog post topic ideas ${categoryPrompt}. 

For each topic, provide:
1. A compelling title (50-70 characters)
2. A brief description (1-2 sentences about what the article would cover)
3. The target audience

Format your response as a JSON array with objects containing: title, description, audience`
                }
            ],
            temperature: 0.8,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content generated");
        }

        const parsed = JSON.parse(content);
        return NextResponse.json(parsed.topics || parsed);

    } catch (error: any) {
        console.error("Topic suggestion error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate topics" },
            { status: 500 }
        );
    }
}
