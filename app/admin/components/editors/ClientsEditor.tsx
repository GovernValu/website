"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    TextField,
    TextArea,
    SectionCard,
    useImageUpload,
    CHECKERBOARD,
} from "../ContentFields";
import { arabicKey, missingArabicFields, SHARED_LISTS } from "@/lib/bilingual";
import { optimizedImage } from "@/lib/image";
import { translateFields } from "../../lib/translate";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ClientItem {
    name: string;
    nameAr: string;
    country: string;
    countryAr: string;
    field: string;
    fieldAr: string;
    services: string;
    servicesAr: string;
    logo: string;
    [key: string]: unknown;
}

interface ClientsEditorProps {
    /** Page texts (hero, intro, call to action) for the language being edited. */
    content: any;
    onChange: (content: any) => void;
    lang: "en" | "ar";
    /** The shared bilingual client list, stored once for both languages. */
    clients: ClientItem[];
    onClientsChange: (clients: ClientItem[]) => void;
}

const CLIENT_FIELDS = SHARED_LISTS.clients.fields;

const FIELD_LABELS: Record<string, { en: string; ar: string; placeholder: string }> = {
    name: { en: "Client name", ar: "اسم العميل", placeholder: "e.g. Tam Holding Group" },
    country: { en: "Country / Region", ar: "البلد / المنطقة", placeholder: "e.g. State of Qatar" },
    field: { en: "Field / Industry", ar: "المجال / الصناعة", placeholder: "e.g. Real Estate" },
    services: { en: "Services provided", ar: "الخدمات المقدمة", placeholder: "e.g. Governance & Investment" },
};

const emptyClient = (): ClientItem => ({
    name: "",
    nameAr: "",
    country: "",
    countryAr: "",
    field: "",
    fieldAr: "",
    services: "",
    servicesAr: "",
    logo: "",
});

// Stable ids for drag and drop, kept out of the saved content.
const clientIds = new WeakMap<object, string>();
let nextClientId = 0;
function clientId(client: object): string {
    let id = clientIds.get(client);
    if (!id) {
        id = `client-${++nextClientId}`;
        clientIds.set(client, id);
    }
    return id;
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function clientStatus(client: ClientItem) {
    if (!text(client.logo)) return { tone: "red", label: "No logo" } as const;
    const missing = missingArabicFields(client, CLIENT_FIELDS).length;
    if (missing > 0) return { tone: "amber", label: `Arabic: ${missing} missing` } as const;
    return { tone: "green", label: "EN + AR ready" } as const;
}

const TONE_CLASSES = {
    red: "border-red-500/30 bg-red-500/10 text-red-300",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

export default function ClientsEditor({ content, onChange, lang, clients, onClientsChange }: ClientsEditorProps) {
    const [query, setQuery] = useState("");
    const [onlyIncomplete, setOnlyIncomplete] = useState(false);
    const [editing, setEditing] = useState<{ index: number | null; client: ClientItem } | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const updateField = (key: string, value: any) => {
        onChange({ ...content, [key]: value });
    };

    const needsAttention = clients.filter((client) => clientStatus(client).tone !== "green").length;
    const search = query.trim().toLowerCase();
    const visible = clients
        .map((client, index) => ({ client, index }))
        .filter(({ client }) => {
            if (onlyIncomplete && clientStatus(client).tone === "green") return false;
            if (!search) return true;
            return CLIENT_FIELDS.some((field) =>
                [client[field], client[arabicKey(field)]].some((value) => text(value).toLowerCase().includes(search))
            );
        });
    // Reordering a filtered view would be ambiguous, so drag only works on the full list.
    const canReorder = !search && !onlyIncomplete;

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        const from = clients.findIndex((client) => clientId(client) === active.id);
        const to = clients.findIndex((client) => clientId(client) === over.id);
        if (from < 0 || to < 0) return;
        onClientsChange(arrayMove(clients, from, to));
    };

    const applyEdit = (client: ClientItem) => {
        if (!editing) return;
        if (editing.index === null) {
            onClientsChange([...clients, client]);
            toast.success("Client added. Click Save to publish it.");
        } else {
            const next = [...clients];
            next[editing.index] = client;
            onClientsChange(next);
        }
        setEditing(null);
    };

    const removeClient = (index: number) => {
        onClientsChange(clients.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Shared client list */}
            <section dir="ltr" className="rounded-xl border border-gray-700 bg-gray-800">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-700 px-5 py-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-medium text-white">Client logos</h3>
                            <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">{clients.length}</span>
                            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-300">
                                Shared by English &amp; Arabic
                            </span>
                        </div>
                        <p className="mt-1 max-w-2xl text-sm text-gray-400">
                            Each client is one entry with one logo and its English and Arabic details, so it always appears on
                            both versions of the site.{lang === "ar" && " Edits here also change the English page."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setEditing({ index: null, client: emptyClient() })}
                        className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add client
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 px-5 py-3">
                    <div className="relative min-w-[220px] flex-1">
                        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search clients in English or Arabic…"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setOnlyIncomplete(!onlyIncomplete)}
                        aria-pressed={onlyIncomplete}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${onlyIncomplete
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                            }`}
                    >
                        Needs attention ({needsAttention})
                    </button>
                    <p className="text-xs text-gray-500">
                        {canReorder ? "Drag the handle on a logo to reorder." : "Clear the search and filter to reorder."}
                    </p>
                </div>

                <div className="px-5 pb-5">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={visible.map(({ client }) => clientId(client))} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {visible.map(({ client, index }) => (
                                    <ClientCard
                                        key={clientId(client)}
                                        client={client}
                                        position={index + 1}
                                        draggable={canReorder}
                                        onEdit={() => setEditing({ index, client })}
                                        onRemove={() => removeClient(index)}
                                    />
                                ))}
                                {!search && !onlyIncomplete && (
                                    <button
                                        type="button"
                                        onClick={() => setEditing({ index: null, client: emptyClient() })}
                                        className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-600 text-sm text-gray-400 transition-colors hover:border-brand hover:text-white"
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add client
                                    </button>
                                )}
                            </div>
                        </SortableContext>
                    </DndContext>
                    {visible.length === 0 && (search || onlyIncomplete) && (
                        <p className="py-10 text-center text-sm text-gray-500">No clients match this view.</p>
                    )}
                </div>
            </section>

            {/* Page texts for the language being edited */}
            <SectionCard
                title="Hero Section"
                description={lang === "ar" ? "Arabic page text" : "English page text"}
                defaultOpen={false}
            >
                <TextField
                    label="Badge Text"
                    value={content.hero?.badge || ""}
                    onChange={(v) => updateField("hero", { ...content.hero, badge: v })}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Title"
                        value={content.hero?.title || ""}
                        onChange={(v) => updateField("hero", { ...content.hero, title: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content.hero?.titleHighlight || ""}
                        onChange={(v) => updateField("hero", { ...content.hero, titleHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.hero?.subtitle || ""}
                    onChange={(v) => updateField("hero", { ...content.hero, subtitle: v })}
                    rows={3}
                />
            </SectionCard>

            <SectionCard title="Introduction" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.intro?.sectionTitle || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.intro?.headline || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, headline: v })}
                />
            </SectionCard>

            <SectionCard title="Call to Action" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Headline"
                        value={content.cta?.headline || ""}
                        onChange={(v) => updateField("cta", { ...content.cta, headline: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content.cta?.headlineHighlight || ""}
                        onChange={(v) => updateField("cta", { ...content.cta, headlineHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.cta?.subtitle || ""}
                    onChange={(v) => updateField("cta", { ...content.cta, subtitle: v })}
                    rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Button Text"
                        value={content.cta?.buttonText || ""}
                        onChange={(v) => updateField("cta", { ...content.cta, buttonText: v })}
                    />
                    <TextField
                        label="Button Link"
                        value={content.cta?.buttonLink || ""}
                        onChange={(v) => updateField("cta", { ...content.cta, buttonLink: v })}
                    />
                </div>
            </SectionCard>

            {editing && (
                <ClientDialog
                    initial={editing.client}
                    isNew={editing.index === null}
                    onCancel={() => setEditing(null)}
                    onApply={applyEdit}
                />
            )}
        </div>
    );
}

interface ClientCardProps {
    client: ClientItem;
    position: number;
    draggable: boolean;
    onEdit: () => void;
    onRemove: () => void;
}

function ClientCard({ client, position, draggable, onEdit, onRemove }: ClientCardProps) {
    const [confirming, setConfirming] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: clientId(client),
        disabled: !draggable,
    });
    const status = clientStatus(client);

    useEffect(() => {
        if (!confirming) return;
        const timer = setTimeout(() => setConfirming(false), 3000);
        return () => clearTimeout(timer);
    }, [confirming]);

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`group relative flex flex-col overflow-hidden rounded-xl border bg-gray-900/60 transition-colors ${isDragging ? "z-10 border-brand shadow-2xl shadow-black/50" : "border-gray-700 hover:border-gray-500"}`}
        >
            <button
                type="button"
                onClick={onEdit}
                className="relative flex h-36 items-center justify-center bg-white p-5"
                aria-label={`Edit ${text(client.name) || "client"}`}
            >
                {text(client.logo) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={optimizedImage(client.logo, 320)}
                        alt={text(client.name)}
                        loading="lazy"
                        className="max-h-24 max-w-full object-contain"
                    />
                ) : (
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">No logo yet</span>
                )}
                <span className="absolute right-2 top-2 rounded-full bg-gray-900/70 px-2 py-0.5 text-[11px] tabular-nums text-white">
                    #{position}
                </span>
            </button>
            {draggable && (
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="absolute left-2 top-2 cursor-grab touch-none rounded-md bg-gray-900/70 p-1.5 text-white opacity-100 transition-opacity active:cursor-grabbing sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                    aria-label="Drag to reorder"
                >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM7 11.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM7 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>
                </button>
            )}

            <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="truncate text-sm font-medium text-white" title={text(client.name)}>
                    {text(client.name) || <span className="italic text-gray-500">No English name</span>}
                </p>
                <p dir="rtl" className="truncate text-sm text-gray-300" title={text(client.nameAr)}>
                    {text(client.nameAr) || <span className="italic text-gray-500">لا يوجد اسم عربي</span>}
                </p>
                <p className="truncate text-xs text-gray-500">
                    {[text(client.country), text(client.field)].filter(Boolean).join(" · ") || "No details yet"}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${TONE_CLASSES[status.tone]}`}>
                        {status.label}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-md px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => (confirming ? onRemove() : setConfirming(true))}
                            className={`rounded-md px-2 py-1 text-xs transition-colors ${confirming ? "bg-red-500/20 font-medium text-red-300" : "text-red-400 hover:bg-red-500/10"}`}
                        >
                            {confirming ? "Confirm delete" : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ClientDialogProps {
    initial: ClientItem;
    isNew: boolean;
    onCancel: () => void;
    onApply: (client: ClientItem) => void;
}

function ClientDialog({ initial, isNew, onCancel, onApply }: ClientDialogProps) {
    const [draft, setDraft] = useState<ClientItem>({ ...emptyClient(), ...initial });
    const [translating, setTranslating] = useState(false);
    const { uploading, dragActive, upload, dropProps } = useImageUpload((url) =>
        setDraft((current) => ({ ...current, logo: url }))
    );

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onCancel]);

    const update = (key: string, value: string) => setDraft((current) => ({ ...current, [key]: value }));
    const missingArabic = missingArabicFields(draft, CLIENT_FIELDS);
    const canApply = Boolean(text(draft.name) || text(draft.nameAr)) && !uploading;

    const fillArabic = async () => {
        if (missingArabic.length === 0) return;
        setTranslating(true);
        try {
            const source = Object.fromEntries(missingArabic.map((field) => [field, text(draft[field])]));
            const translated = await translateFields(source, "en-ar");
            setDraft((current) => {
                const next = { ...current };
                for (const [field, value] of Object.entries(translated)) {
                    // Never overwrite Arabic typed while the request was running.
                    if (value && !text(next[arabicKey(field)])) next[arabicKey(field)] = value;
                }
                return next;
            });
            toast.success("Arabic filled in. Please review it before saving.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Translation failed");
        } finally {
            setTranslating(false);
        }
    };

    return (
        <div
            dir="ltr"
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onCancel();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-dialog-title"
                className="w-full max-w-4xl rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-gray-800 px-6 py-4">
                    <div>
                        <h2 id="client-dialog-title" className="text-xl font-serif text-white">
                            {isNew ? "Add client" : "Edit client"}
                        </h2>
                        <p className="mt-0.5 text-sm text-gray-400">One logo, shown on both the English and Arabic pages.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        aria-label="Close"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-[240px_1fr]">
                    {/* Logo */}
                    <div className="space-y-2" {...dropProps}>
                        <p className="text-sm font-medium text-gray-300">Logo</p>
                        <label
                            className={`relative flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${dragActive ? "border-brand" : "border-gray-600 hover:border-gray-500"}`}
                            style={text(draft.logo) ? undefined : CHECKERBOARD}
                        >
                            {text(draft.logo) ? (
                                <span className="flex h-full w-full items-center justify-center bg-white p-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={draft.logo} alt="" className="max-h-full max-w-full object-contain" />
                                </span>
                            ) : (
                                <span className="px-4 text-center text-sm text-gray-300">
                                    Drop the logo here
                                    <br />
                                    <span className="text-xs text-gray-400">or click to upload (PNG, JPG, SVG)</span>
                                </span>
                            )}
                            {uploading && (
                                <span className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-sm text-white">
                                    Uploading…
                                </span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploading}
                                onChange={(e) => upload(e.target.files?.[0])}
                            />
                        </label>
                        <input
                            type="text"
                            value={draft.logo}
                            onChange={(e) => update("logo", e.target.value)}
                            placeholder="…or paste a logo URL"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                        {text(draft.logo) && (
                            <button
                                type="button"
                                onClick={() => update("logo", "")}
                                className="text-xs text-red-400 hover:text-red-300"
                            >
                                Remove logo
                            </button>
                        )}
                    </div>

                    {/* English / Arabic details */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            <span>English</span>
                            <span dir="rtl">العربية</span>
                        </div>
                        {CLIENT_FIELDS.map((field) => {
                            const labels = FIELD_LABELS[field];
                            const arMissing = missingArabic.includes(field);
                            return (
                                <div key={field} className="grid grid-cols-2 gap-3">
                                    <label className="space-y-1">
                                        <span className="block text-sm text-gray-300">{labels.en}</span>
                                        <input
                                            type="text"
                                            value={String(draft[field] ?? "")}
                                            onChange={(e) => update(field, e.target.value)}
                                            placeholder={labels.placeholder}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand"
                                        />
                                    </label>
                                    <label className="space-y-1" dir="rtl">
                                        <span className="block text-sm text-gray-300">{labels.ar}</span>
                                        <input
                                            type="text"
                                            value={String(draft[arabicKey(field)] ?? "")}
                                            onChange={(e) => update(arabicKey(field), e.target.value)}
                                            className={`w-full rounded-lg border bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand ${arMissing ? "border-amber-500/50" : "border-gray-600"}`}
                                        />
                                    </label>
                                </div>
                            );
                        })}

                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-800 bg-gray-800/60 px-4 py-3">
                            <p className="text-sm text-gray-400">
                                {missingArabic.length > 0
                                    ? `${missingArabic.length} Arabic field${missingArabic.length > 1 ? "s" : ""} empty. The Arabic page will show the English text until filled.`
                                    : "English and Arabic are both complete."}
                            </p>
                            <button
                                type="button"
                                onClick={fillArabic}
                                disabled={missingArabic.length === 0 || translating}
                                className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {translating ? "Translating…" : "Fill Arabic with AI"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-800 px-6 py-4">
                    <p className="text-xs text-gray-500">Changes go live when you click Save at the top of the page.</p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-lg px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => onApply(draft)}
                            disabled={!canApply}
                            className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isNew ? "Add client" : "Apply changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
