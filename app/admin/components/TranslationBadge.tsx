"use client";

import type { PageStatus } from "../lib/useContentStatus";

/** "EN + AR in sync" or "N Arabic gaps" for a CMS page. */
export default function TranslationBadge({ status }: { status?: PageStatus }) {
    if (!status) return null;
    const { total } = status.summary;
    if (total === 0) {
        return (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                EN + AR in sync
            </span>
        );
    }
    return (
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
            {total} Arabic {total === 1 ? "gap" : "gaps"}
        </span>
    );
}
