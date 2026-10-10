/** Translate short CMS fields (names, labels, sentences) with the AI translator. Returns the translated map. */
export async function translateFields(
    fields: Record<string, string>,
    direction: "en-ar" | "ar-en" = "en-ar"
): Promise<Record<string, string>> {
    const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction, fields }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.error || "Translation failed");
    }
    return (data.fields || {}) as Record<string, string>;
}
