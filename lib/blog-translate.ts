export type TranslateDirection = "en-ar" | "ar-en";

export interface TranslatableFields {
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDesc: string;
}

export async function translateBlogFields(
    direction: TranslateDirection,
    source: TranslatableFields
): Promise<TranslatableFields> {
    const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction, ...source }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Translation failed");
    }

    return res.json();
}
