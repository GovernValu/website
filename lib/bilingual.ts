/* eslint-disable @typescript-eslint/no-explicit-any */

// Shared by the public site and the admin portal, so keep this file free of
// server-only imports.

export type ContentLang = "en" | "ar";

export interface SharedList {
    /** Key of the array inside the page content. */
    key: string;
    /** Translatable fields. Each one has an Arabic twin named `${field}Ar`. */
    fields: string[];
    /** Item key holding the single image used for both languages. */
    imageKey?: string;
}

/**
 * Lists stored once for both languages: every item carries its English and
 * Arabic text side by side plus one image, and lives in the English record.
 * The Arabic page reads the same list, so an item added once appears in both
 * languages.
 */
export const SHARED_LISTS: Record<string, SharedList> = {
    clients: { key: "clients", fields: ["name", "country", "field", "services"], imageKey: "logo" },
};

export const arabicKey = (field: string) => `${field}Ar`;

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Project a bilingual item onto one language, falling back to the other when a field is empty. */
export function localizeItem<T extends Record<string, any>>(item: T, fields: string[], lang: ContentLang): T {
    const out: Record<string, any> = { ...item };
    for (const field of fields) {
        const en = clean(item[field]);
        const ar = clean(item[arabicKey(field)]);
        out[field] = lang === "ar" ? ar || en : en || ar;
    }
    return out as T;
}

/** Fields of a bilingual item whose Arabic twin is empty while the English one is filled. */
export function missingArabicFields(item: Record<string, any>, fields: string[]): string[] {
    return fields.filter((field) => clean(item[field]) && !clean(item[arabicKey(field)]));
}

/**
 * Replace the page's shared lists with the bilingual list from the English
 * record, localized for `lang`. Pages without shared lists pass through.
 */
export function applySharedLists<T>(page: string, lang: ContentLang, content: T | null, enContent: any): T | null {
    const shared = SHARED_LISTS[page];
    const source = enContent?.[shared?.key ?? ""];
    if (!shared || !Array.isArray(source)) return content;

    return {
        ...((content ?? enContent) as any),
        [shared.key]: source.map((item: any) => localizeItem(item, shared.fields, lang)),
    } as T;
}

/**
 * Drop the shared list from a non-English record. The editor does this on load:
 * the Arabic record only holds a server-maintained copy, edited via the English list.
 */
export function stripSharedLists<T>(page: string, lang: ContentLang, content: T): T {
    const shared = SHARED_LISTS[page];
    if (!shared || lang === "en" || !content || typeof content !== "object") return content;
    const rest = { ...(content as any) };
    delete rest[shared.key];
    return rest as T;
}
