/* eslint-disable @typescript-eslint/no-explicit-any */
import { arabicKey, missingArabicFields, SHARED_LISTS } from "./bilingual";

// Shared by the admin editor (live check) and the content-status API.

export type TranslationIssueKind = "missing" | "count" | "same";

export interface TranslationIssue {
    path: string;
    kind: TranslationIssueKind;
    /** English text, or the item counts for a "count" issue. */
    detail: string;
}

// Keys holding links, media and identifiers rather than translatable text.
const NON_TEXT_KEY = /^(id|slug|icon|image|logo|src|video|email|phone|whatsapp|href|url|link)$/i;
const NON_TEXT_SUFFIX = /(Link|Url|Href|Image|Logo|Icon|Slug|Email|Phone|Order)$/;
const NON_TEXT_VALUE = /^(\/|https?:|mailto:|tel:|#)/i;

const omitKey = (record: any, key?: string) => {
    if (!key || !record || typeof record !== "object") return record;
    const rest = { ...record };
    delete rest[key];
    return rest;
};

const isTextKey = (key: string) => !NON_TEXT_KEY.test(key) && !NON_TEXT_SUFFIX.test(key);
const plain = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

function walk(en: unknown, ar: unknown, path: string, issues: TranslationIssue[]) {
    if (typeof en === "string") {
        const enText = plain(en);
        if (!enText || NON_TEXT_VALUE.test(en.trim())) return;
        const arText = typeof ar === "string" ? plain(ar) : "";
        if (!arText) {
            issues.push({ path, kind: "missing", detail: enText });
        } else if (arText === enText && /[A-Za-z]{3,}/.test(enText) && enText.split(" ").length >= 3) {
            issues.push({ path, kind: "same", detail: enText });
        }
        return;
    }

    if (Array.isArray(en)) {
        const arList = Array.isArray(ar) ? ar : [];
        if (arList.length !== en.length) {
            issues.push({ path, kind: "count", detail: `English ${en.length} · Arabic ${arList.length}` });
        }
        const shared = Math.min(en.length, arList.length);
        for (let i = 0; i < shared; i++) walk(en[i], arList[i], `${path}[${i}]`, issues);
        return;
    }

    if (en && typeof en === "object") {
        for (const [key, value] of Object.entries(en)) {
            // `fooAr` twins are checked through the shared-list rules instead.
            if (!isTextKey(key) || /[a-z]Ar$/.test(key)) continue;
            walk(value, (ar as any)?.[key], path ? `${path}.${key}` : key, issues);
        }
    }
}

/** Compare a page's English and Arabic records and list what the Arabic side is missing. */
export function compareTranslations(page: string, en: any, ar: any): TranslationIssue[] {
    const issues: TranslationIssue[] = [];
    const shared = SHARED_LISTS[page];

    if (shared && Array.isArray(en?.[shared.key])) {
        en[shared.key].forEach((item: any, index: number) => {
            for (const field of missingArabicFields(item, shared.fields)) {
                issues.push({
                    path: `${shared.key}[${index}].${arabicKey(field)}`,
                    kind: "missing",
                    detail: String(item[field]).trim(),
                });
            }
        });
    }

    // The shared list was checked above; Arabic records no longer carry it.
    walk(omitKey(en, shared?.key), omitKey(ar, shared?.key), "", issues);
    return issues;
}

export function summarizeIssues(issues: TranslationIssue[]) {
    return {
        total: issues.length,
        missing: issues.filter((issue) => issue.kind === "missing").length,
        count: issues.filter((issue) => issue.kind === "count").length,
        same: issues.filter((issue) => issue.kind === "same").length,
    };
}
