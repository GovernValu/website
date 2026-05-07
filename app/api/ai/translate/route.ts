import { NextResponse } from "next/server";
import openai from "@/lib/openai";

interface TranslatePayload {
    direction: "en-ar" | "ar-en";
    title?: string;
    excerpt?: string;
    content?: string;
    metaTitle?: string;
    metaDesc?: string;
}

export async function POST(request: Request) {
    try {
        const data = (await request.json()) as TranslatePayload;
        const { direction } = data;

        if (direction !== "en-ar" && direction !== "ar-en") {
            return NextResponse.json(
                { error: "direction must be 'en-ar' or 'ar-en'" },
                { status: 400 }
            );
        }

        const sourceLang = direction === "en-ar" ? "English" : "Arabic";
        const targetLang = direction === "en-ar" ? "Arabic" : "English";

        const fields = {
            title: data.title || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            metaTitle: data.metaTitle || "",
            metaDesc: data.metaDesc || "",
        };

        const hasAnything = Object.values(fields).some((v) => v.trim().length > 0);
        if (!hasAnything) {
            return NextResponse.json(
                { error: "Nothing to translate" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-5-mini-2025-08-07",
            messages: [
                {
                    role: "system",
                    content: `You are a professional ${sourceLang}-to-${targetLang} translator for GovernValu, a governance and investment advisory firm in Qatar serving the GCC.

Translation rules:
- Translate naturally and idiomatically, not word-for-word.
- Use formal, professional ${targetLang} suitable for C-suite executives, board members, and institutional investors.
- Preserve domain terminology (corporate governance, family office, Vision 2030, ESG, etc.) using the conventional ${targetLang} equivalents.
- The "content" field is HTML. You MUST preserve every HTML tag (<p>, <h2>, <h3>, <ul>, <li>, <strong>, <em>, <a>, <blockquote>, etc.) and every attribute (href, class, etc.) exactly as they appear. Only translate the visible text inside the tags.
- Do not add, remove, reorder, or merge tags. Do not wrap the result in extra tags.
- Do not include markdown. Do not include explanations.
- Return STRICT JSON only.`,
                },
                {
                    role: "user",
                    content: `Translate the following blog post fields from ${sourceLang} to ${targetLang}.

Return JSON with exactly these keys: "title", "excerpt", "content", "metaTitle", "metaDesc".
If a source field is empty, return an empty string for that key.

Source fields (${sourceLang}):
${JSON.stringify(fields, null, 2)}`,
                },
            ],
            max_completion_tokens: 6000,
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0]?.message?.content;
        if (!raw) throw new Error("No translation returned");

        const translated = JSON.parse(raw) as {
            title?: string;
            excerpt?: string;
            content?: string;
            metaTitle?: string;
            metaDesc?: string;
        };

        return NextResponse.json({
            title: translated.title ?? "",
            excerpt: translated.excerpt ?? "",
            content: translated.content ?? "",
            metaTitle: translated.metaTitle ?? "",
            metaDesc: translated.metaDesc ?? "",
        });
    } catch (error: any) {
        console.error("Translation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to translate" },
            { status: 500 }
        );
    }
}
