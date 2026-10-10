"use client";

import { useState, useEffect, useMemo, useRef, use } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { SHARED_LISTS, stripSharedLists } from "@/lib/bilingual";
import { compareTranslations, summarizeIssues } from "@/lib/content-health";
import { getCmsPage } from "@/lib/cms-pages";

// Import page-specific editors
import HomepageEditor from "../../components/editors/HomepageEditor";
import AboutEditor from "../../components/editors/AboutEditor";
import SettingsEditor from "../../components/editors/SettingsEditor";
import ServicesEditor from "../../components/editors/ServicesEditor";
import ContactEditor from "../../components/editors/ContactEditor";
import IndustriesEditor from "../../components/editors/IndustriesEditor";
import PartnersEditor from "../../components/editors/PartnersEditor";
import PhilosophyEditor from "../../components/editors/PhilosophyEditor";
import ExpertiseEditor from "../../components/editors/ExpertiseEditor";
import TeamsEditor from "../../components/editors/TeamsEditor";
import BoardEditor from "../../components/editors/BoardEditor";
import ClientsEditor from "../../components/editors/ClientsEditor";

interface PageEditorProps {
    params: Promise<{ page: string }>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function PageEditor({ params }: PageEditorProps) {
    const { page } = use(params);
    const [contentEn, setContentEn] = useState<Record<string, any> | null>(null);
    const [contentAr, setContentAr] = useState<Record<string, any> | null>(null);
    const [editorLang, setEditorLang] = useState<"en" | "ar">("en");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
    const [jsonText, setJsonText] = useState("");
    const [savedSnapshots, setSavedSnapshots] = useState({ en: "", ar: "" });

    useEffect(() => {
        async function fetchContent() {
            try {
                const [resEn, resAr] = await Promise.all([
                    fetch(`/api/content/${page}?lang=en&raw=1`, { cache: "no-store" }),
                    fetch(`/api/content/${page}?lang=ar&raw=1`, { cache: "no-store" })
                ]);

                if (resEn.ok && resAr.ok) {
                    const dataEn = await resEn.json();
                    // Shared lists live in the English record only (see lib/bilingual.ts).
                    const dataAr = stripSharedLists(page, "ar", await resAr.json());
                    setContentEn(dataEn);
                    setContentAr(dataAr);
                    setJsonText(JSON.stringify(dataEn, null, 2));
                    setSavedSnapshots({
                        en: JSON.stringify(dataEn),
                        ar: JSON.stringify(dataAr),
                    });
                } else {
                    toast.error("Failed to load content");
                }
            } catch (error) {
                toast.error("Failed to load content");
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [page]);

    const activeContent = editorLang === "en" ? contentEn : contentAr;
    const contentSnapshot = (lang: "en" | "ar") => JSON.stringify(lang === "en" ? contentEn : contentAr);
    const isStoredDraftDirty = (lang: "en" | "ar") => {
        const content = lang === "en" ? contentEn : contentAr;
        return Boolean(content) && contentSnapshot(lang) !== savedSnapshots[lang];
    };
    let activeJsonDirty = false;
    if (viewMode === "json") {
        try {
            activeJsonDirty = JSON.stringify(JSON.parse(jsonText)) !== savedSnapshots[editorLang];
        } catch {
            activeJsonDirty = true;
        }
    }
    const activeDirty = viewMode === "json" ? activeJsonDirty : isStoredDraftDirty(editorLang);
    const hasUnsavedChanges = activeDirty
        || isStoredDraftDirty(editorLang === "en" ? "ar" : "en");

    useEffect(() => {
        if (!hasUnsavedChanges) return;
        const warnBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };
        window.addEventListener("beforeunload", warnBeforeUnload);
        return () => window.removeEventListener("beforeunload", warnBeforeUnload);
    }, [hasUnsavedChanges]);

    // Sync JSON text when content changes (from visual editor) or lang switches
    useEffect(() => {
        if (activeContent && viewMode === "visual") {
            setJsonText(JSON.stringify(activeContent, null, 2));
        }
    }, [activeContent, viewMode]);

    const handleContentChange = (newContent: any) => {
        if (editorLang === "en") {
            setContentEn(newContent);
        } else {
            setContentAr(newContent);
        }
    };

    // Sync content when switching from JSON to visual
    const handleModeSwitch = (mode: "visual" | "json") => {
        if (mode === "visual" && viewMode === "json") {
            try {
                const parsed = JSON.parse(jsonText);
                handleContentChange(parsed);
            } catch (error) {
                toast.error("Invalid JSON - fix before switching to visual mode");
                return;
            }
        }
        setViewMode(mode);
    };

    const handleLanguageSwitch = (nextLang: "en" | "ar") => {
        if (nextLang === editorLang) return;

        if (viewMode === "json") {
            try {
                const parsed = JSON.parse(jsonText);
                handleContentChange(parsed);
            } catch {
                toast.error("Fix the invalid JSON before switching languages");
                return;
            }
        }

        const nextContent = nextLang === "en" ? contentEn : contentAr;
        setEditorLang(nextLang);
        setJsonText(JSON.stringify(nextContent, null, 2));
    };

    const handleSave = async () => {
        let drafts = { en: contentEn, ar: contentAr };

        if (viewMode === "json") {
            try {
                const parsed = JSON.parse(jsonText);
                handleContentChange(parsed);
                drafts = { ...drafts, [editorLang]: parsed };
            } catch {
                toast.error("Invalid JSON format");
                return;
            }
        }

        // Save every language with changes, so nothing is left behind in the other tab.
        const pending = (["en", "ar"] as const).filter(
            (lang) => drafts[lang] && JSON.stringify(drafts[lang]) !== savedSnapshots[lang]
        );
        if (pending.length === 0) {
            toast.success("Everything is already saved");
            return;
        }

        setSaving(true);
        try {
            // English first: the Arabic save copies shared lists from the saved English record.
            const results: { lang: "en" | "ar"; ok: boolean; status: number; snapshot: string }[] = [];
            for (const lang of pending) {
                const res = await fetch(`/api/content/${page}?lang=${lang}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(drafts[lang]),
                });
                results.push({ lang, ok: res.ok, status: res.status, snapshot: JSON.stringify(drafts[lang]) });
            }

            const saved = results.filter((result) => result.ok);
            setSavedSnapshots((current) => ({
                ...current,
                ...Object.fromEntries(saved.map((result) => [result.lang, result.snapshot])),
            }));
            if (viewMode === "json") {
                setJsonText(JSON.stringify(drafts[editorLang], null, 2));
            }

            const names = { en: "English", ar: "Arabic" };
            if (saved.length > 0) {
                toast.success(`${saved.map((result) => names[result.lang]).join(" and ")} saved. The website is updated.`);
            }
            const failed = results.filter((result) => !result.ok);
            if (failed.some((result) => result.status === 401)) {
                toast.error("Your session has expired. Sign in again in a new tab, then save.");
            } else if (failed.length > 0) {
                toast.error(`Failed to save ${failed.map((result) => names[result.lang]).join(" and ")}`);
            }
        } catch {
            toast.error("Failed to save content");
        } finally {
            setSaving(false);
        }
    };

    // Ctrl/⌘+S saves, like a desktop editor.
    const saveRef = useRef(handleSave);
    useEffect(() => {
        saveRef.current = handleSave;
    });
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
                event.preventDefault();
                saveRef.current();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const translationIssues = useMemo(
        () => (contentEn && contentAr ? compareTranslations(page, contentEn, contentAr) : []),
        [page, contentEn, contentAr]
    );
    const issueSummary = summarizeIssues(translationIssues);
    const [showIssues, setShowIssues] = useState(false);

    const formatJson = () => {
        try {
            const parsed = JSON.parse(jsonText);
            setJsonText(JSON.stringify(parsed, null, 2));
            toast.success("JSON formatted");
        } catch (error) {
            toast.error("Invalid JSON format");
        }
    };

    const cmsPage = getCmsPage(page);
    const sharedList = SHARED_LISTS[page];

    // Render the appropriate editor based on page
    const renderEditor = () => {
        if (!activeContent) return null;

        switch (page) {
            case "homepage":
                return <HomepageEditor content={activeContent as any} onChange={handleContentChange} />;
            case "about":
                return <AboutEditor content={activeContent as any} onChange={handleContentChange} />;
            case "settings":
                return <SettingsEditor content={activeContent as any} onChange={handleContentChange} />;
            case "services":
                return <ServicesEditor content={activeContent as any} onChange={handleContentChange} />;
            case "contact":
                return <ContactEditor content={activeContent as any} onChange={handleContentChange} />;
            case "industries":
                return <IndustriesEditor content={activeContent as any} onChange={handleContentChange} />;
            case "partners":
                return <PartnersEditor content={activeContent as any} onChange={handleContentChange} />;
            case "board":
                return <BoardEditor content={activeContent as any} onChange={handleContentChange} />;
            case "clients":
                return (
                    <ClientsEditor
                        content={activeContent as any}
                        onChange={handleContentChange}
                        lang={editorLang}
                        clients={(contentEn?.[sharedList?.key ?? "clients"] as any[]) || []}
                        onClientsChange={(clients) =>
                            setContentEn((current) => ({ ...(current || {}), [sharedList?.key ?? "clients"]: clients }))
                        }
                    />
                );
            case "philosophy":
                return <PhilosophyEditor content={activeContent as any} onChange={handleContentChange} />;
            case "expertise":
                return <ExpertiseEditor content={activeContent as any} onChange={handleContentChange} />;
            case "teams":
                return <TeamsEditor content={activeContent as any} onChange={handleContentChange} />;
            default:
                return (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-400">
                            Visual editor not available for this page. Use JSON mode.
                        </p>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="sticky top-[57px] z-30 -mx-2 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-900/95 px-2 py-3 backdrop-blur">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/pages"
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-serif text-white">{cmsPage?.name || page}</h1>
                            {hasUnsavedChanges && (
                                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                                    Unsaved changes
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400 mt-1">
                            {sharedList
                                ? "Shared lists apply to both languages; page texts are edited per language."
                                : "Edit English and Arabic content. Save stores both languages."}
                            <span className="ml-2 hidden text-xs text-gray-500 md:inline">Ctrl/⌘ + S to save</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {cmsPage?.previewPath && (
                        <Link
                            href={cmsPage.previewPath}
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                        >
                            Preview page
                            <span aria-hidden="true">↗</span>
                        </Link>
                    )}
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => handleModeSwitch("visual")}
                            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "visual"
                                ? "bg-gray-700 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Visual
                        </button>
                        <button
                            onClick={() => handleModeSwitch("json")}
                            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "json"
                                ? "bg-gray-700 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            JSON
                        </button>
                    </div>

                    {viewMode === "json" && (
                        <button
                            onClick={formatJson}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            Format
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? "Saving..." : hasUnsavedChanges ? "Save changes" : "Saved"}
                    </button>
                </div>
            </div>

            {/* Language Tabs */}
            <div className="border-b border-gray-700 flex gap-6">
                <button
                    onClick={() => handleLanguageSwitch("en")}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${editorLang === "en"
                        ? "border-brand text-white"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                        }`}
                >
                    English (EN)
                    {isStoredDraftDirty("en") && <span className="ml-2 text-amber-400">●</span>}
                </button>
                <button
                    onClick={() => handleLanguageSwitch("ar")}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${editorLang === "ar"
                        ? "border-brand text-white"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                        }`}
                >
                    Arabic (AR)
                    {isStoredDraftDirty("ar") && <span className="ml-2 text-amber-400">●</span>}
                </button>
            </div>

            {/* English / Arabic parity check, updated as you type */}
            {contentEn && contentAr && (
                <div
                    className={`rounded-xl border px-4 py-3 ${issueSummary.total === 0
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-amber-500/20 bg-amber-500/5"
                        }`}
                >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className={`text-sm ${issueSummary.total === 0 ? "text-emerald-300" : "text-amber-200"}`}>
                            {issueSummary.total === 0
                                ? "Arabic version is complete and matches the English structure."
                                : [
                                    issueSummary.count > 0 && `${issueSummary.count} list${issueSummary.count > 1 ? "s have" : " has"} a different number of items in Arabic`,
                                    issueSummary.missing > 0 && `${issueSummary.missing} Arabic field${issueSummary.missing > 1 ? "s" : ""} empty`,
                                    issueSummary.same > 0 && `${issueSummary.same} still in English`,
                                ].filter(Boolean).join(" · ")}
                        </p>
                        {issueSummary.total > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowIssues(!showIssues)}
                                className="text-sm text-amber-300 hover:text-amber-200"
                            >
                                {showIssues ? "Hide details" : "Show details"}
                            </button>
                        )}
                    </div>
                    {showIssues && issueSummary.total > 0 && (
                        <ul className="mt-3 max-h-64 space-y-1.5 overflow-y-auto border-t border-amber-500/10 pt-3">
                            {translationIssues.slice(0, 50).map((issue) => (
                                <li key={`${issue.kind}-${issue.path}`} className="flex gap-3 text-xs">
                                    <span className="w-24 shrink-0 font-medium text-amber-300">
                                        {issue.kind === "count" ? "Item count" : issue.kind === "missing" ? "Empty in AR" : "Not translated"}
                                    </span>
                                    <code className="shrink-0 text-gray-400">{issue.path}</code>
                                    <span className="truncate text-gray-500">{issue.detail}</span>
                                </li>
                            ))}
                            {translationIssues.length > 50 && (
                                <li className="text-xs text-gray-500">…and {translationIssues.length - 50} more</li>
                            )}
                        </ul>
                    )}
                </div>
            )}

            {/* Content Editor */}
            <div dir={editorLang === 'ar' ? 'rtl' : 'ltr'}>
                {viewMode === "visual" ? (
                    renderEditor()
                ) : (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                            <span className="text-sm text-gray-400">content/{editorLang}/{page}.json</span>
                            <span className="text-xs text-gray-500">JSON Editor</span>
                        </div>
                        <textarea
                            value={jsonText}
                            onChange={(e) => setJsonText(e.target.value)}
                            className="w-full h-[600px] bg-gray-900 text-gray-200 p-6 font-mono text-sm focus:outline-none resize-none"
                            spellCheck={false}
                            dir="ltr"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
