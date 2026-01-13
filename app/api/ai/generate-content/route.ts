import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    try {
        const { title, category, categoryName } = await request.json();

        // If category is provided but no title, generate based on category
        const topicForGeneration = title || `Latest insights in ${categoryName || category || 'governance'}`;

        const categoryContext = categoryName
            ? `This article belongs to the "${categoryName}" category. Focus on topics relevant to this category.`
            : category
                ? `This article belongs to the "${category}" category. Focus on topics relevant to this category.`
                : "";

        const completion = await openai.chat.completions.create({
            model: "gpt-5-nano-2025-08-07",
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

IMPORTANT FORMATTING RULES:
- Do NOT use asterisks (**) for bold text
- Do NOT use markdown formatting
- Use proper HTML tags for formatting
- Write in clean, well-structured paragraphs
- Use <h2> and <h3> for headings
- Use <p> tags for paragraphs
- Use <ul> and <li> for lists when needed
- Make the content SEO-optimized with relevant keywords naturally integrated
- Structure content with clear sections and subheadings

Your writing style should be:
- Professional yet accessible
- Data-informed and evidence-based where appropriate
- Strategic and forward-looking
- Relevant to C-suite executives, board members, family business owners, and institutional investors`
                },
                {
                    role: "user",
                    content: `Write a comprehensive blog article based on: "${topicForGeneration}"

${categoryContext}

Generate the article in the following JSON format:
{
    "title": "A compelling, SEO-optimized article title (60-80 characters)",
    "excerpt": "A compelling 2-3 sentence summary that hooks the reader (150-200 characters)",
    "content": "The full article content in clean HTML format with proper headings (h2, h3), paragraphs (<p> tags), and lists where appropriate. NO asterisks or markdown. The article should be 800-1200 words, well-organized with clear sections.",
    "metaTitle": "SEO-optimized title for search engines (50-60 characters)",
    "metaDesc": "SEO meta description with call-to-action (150-160 characters)"
}

Remember: NO asterisks, NO markdown formatting. Use ONLY HTML tags.`
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

        // Additional cleanup to remove any asterisks that might have slipped through
        if (article.content) {
            article.content = article.content
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<)/, '<p>')
                .replace(/(?!>)$/, '</p>');
        }

        return NextResponse.json(article);

    } catch (error: any) {
        console.error("Content generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate content" },
            { status: 500 }
        );
    }
}
