"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../lib/upload";

const inputClass =
    "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent";

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    helpText?: string;
    dir?: "ltr" | "rtl";
}

export function TextField({ label, value, onChange, placeholder, helpText, dir }: TextFieldProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                dir={dir}
                className={inputClass}
            />
            {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        </div>
    );
}

interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    helpText?: string;
    dir?: "ltr" | "rtl";
}

export function TextArea({ label, value, onChange, placeholder, rows = 3, helpText, dir }: TextAreaProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                dir={dir}
                className={`${inputClass} resize-none`}
            />
            {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        </div>
    );
}

/** Drag-and-drop + click-to-pick image upload. Shared by ImageField and the clients manager. */
export function useImageUpload(onUploaded: (url: string) => void) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const upload = async (file: File | undefined) => {
        if (!file) return;
        setUploading(true);
        try {
            onUploaded(await uploadImage(file));
            toast.success("Image uploaded");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const dropProps = {
        onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            setDragActive(true);
        },
        onDragLeave: () => setDragActive(false),
        onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            setDragActive(false);
            upload(e.dataTransfer.files?.[0]);
        },
    };

    return { uploading, dragActive, upload, dropProps };
}

const UploadIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

// Checkerboard behind previews so transparent logos stay visible.
export const CHECKERBOARD: React.CSSProperties = {
    backgroundImage: "repeating-conic-gradient(#374151 0% 25%, #2d3748 0% 50%)",
    backgroundSize: "16px 16px",
};

interface ImageFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    helpText?: string;
}

export function ImageField({ label, value, onChange, helpText }: ImageFieldProps) {
    const [error, setError] = useState(false);
    const { uploading, dragActive, upload, dropProps } = useImageUpload((url) => {
        onChange(url);
        setError(false);
    });

    return (
        <div className="space-y-2" {...dropProps}>
            <label className="block text-sm font-medium text-gray-300">{label}</label>

            {value ? (
                <div
                    className={`group relative h-40 w-full overflow-hidden rounded-lg border ${dragActive ? "border-brand ring-2 ring-brand/40" : "border-gray-600"}`}
                    style={CHECKERBOARD}
                >
                    {!error ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={value}
                            alt="Preview"
                            className="h-full w-full object-contain p-3"
                            onError={() => setError(true)}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                            Image could not be loaded. Check the URL.
                        </div>
                    )}
                    <div className="absolute right-2 top-2 flex gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                        <label className="cursor-pointer rounded-lg bg-gray-900/80 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-gray-900">
                            Replace
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploading}
                                onChange={(e) => upload(e.target.files?.[0])}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="rounded-lg bg-red-500/80 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-500"
                            title="Remove image"
                        >
                            Remove
                        </button>
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 text-sm text-white">
                            Uploading…
                        </div>
                    )}
                </div>
            ) : (
                <label
                    className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-sm transition-colors ${dragActive
                        ? "border-brand bg-brand/10 text-white"
                        : "border-gray-600 bg-gray-800/60 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                        }`}
                >
                    {uploading ? (
                        <span>Uploading…</span>
                    ) : (
                        <>
                            <UploadIcon className="w-6 h-6" />
                            <span>Drop an image here, or click to upload</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => upload(e.target.files?.[0])}
                    />
                </label>
            )}

            <input
                type="text"
                value={value || ""}
                onChange={(e) => {
                    onChange(e.target.value);
                    setError(false);
                }}
                placeholder="…or paste an image URL / path (e.g. /clients/logo.png)"
                className={`${inputClass} text-sm`}
                disabled={uploading}
            />
            {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        </div>
    );
}

interface LinkFieldProps {
    label: string;
    textValue: string;
    urlValue: string;
    onTextChange: (value: string) => void;
    onUrlChange: (value: string) => void;
}

export function LinkField({ label, textValue, urlValue, onTextChange, onUrlChange }: LinkFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <div className="grid grid-cols-2 gap-3">
                <input
                    type="text"
                    value={textValue || ""}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder="Link text"
                    className={inputClass}
                />
                <input
                    type="text"
                    value={urlValue || ""}
                    onChange={(e) => onUrlChange(e.target.value)}
                    placeholder="/page-url"
                    className={inputClass}
                />
            </div>
        </div>
    );
}

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    description?: string;
}

export function SectionCard({ title, children, defaultOpen = true, description }: SectionCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-750 transition-colors"
            >
                <div>
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    {description && <p className="mt-0.5 text-sm text-gray-400">{description}</p>}
                </div>
                <svg
                    className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-700 pt-4">
                    {children}
                </div>
            )}
        </div>
    );
}

interface ArrayItem {
    [key: string]: unknown;
}

interface ArrayEditorProps<T extends ArrayItem> {
    label: string;
    items: T[];
    onChange: (items: T[]) => void;
    renderItem: (item: T, index: number, updateItem: (updates: Partial<T>) => void) => React.ReactNode;
    createNew: () => T;
    itemLabel?: (item: T, index: number) => string;
}

const THUMBNAIL_KEYS = ["logo", "image", "photo", "avatar"];

function itemThumbnail(item: ArrayItem): string | null {
    for (const key of THUMBNAIL_KEYS) {
        const value = item[key];
        if (typeof value === "string" && /^(\/|https?:)/.test(value)) return value;
    }
    return null;
}

/** Shift open-item indexes after inserting (delta 1) or removing (delta -1) at `at`. */
function shiftOpen(open: Set<number>, at: number, delta: 1 | -1): Set<number> {
    const next = new Set<number>();
    open.forEach((i) => {
        if (delta === -1 && i === at) return;
        next.add(i >= at ? i + delta : i);
    });
    return next;
}

export function ArrayEditor<T extends ArrayItem>({
    label,
    items,
    onChange,
    renderItem,
    createNew,
    itemLabel,
}: ArrayEditorProps<T>) {
    // Short lists start expanded; long ones start collapsed so they stay scannable.
    const [open, setOpen] = useState<Set<number>>(
        () => new Set(items.length <= 3 ? items.map((_, i) => i) : [])
    );
    const [confirmRemove, setConfirmRemove] = useState<number | null>(null);

    useEffect(() => {
        if (confirmRemove === null) return;
        const timer = setTimeout(() => setConfirmRemove(null), 3000);
        return () => clearTimeout(timer);
    }, [confirmRemove]);

    const toggle = (index: number) => {
        setOpen((current) => {
            const next = new Set(current);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    const handleAdd = () => {
        onChange([...items, createNew()]);
        setOpen((current) => new Set(current).add(items.length));
    };

    const handleDuplicate = (index: number) => {
        const copy = JSON.parse(JSON.stringify(items[index])) as T;
        onChange([...items.slice(0, index + 1), copy, ...items.slice(index + 1)]);
        setOpen((current) => shiftOpen(current, index + 1, 1).add(index + 1));
    };

    const handleRemove = (index: number) => {
        if (confirmRemove !== index) {
            setConfirmRemove(index);
            return;
        }
        setConfirmRemove(null);
        onChange(items.filter((_, i) => i !== index));
        setOpen((current) => shiftOpen(current, index, -1));
    };

    const handleUpdate = (index: number, updates: Partial<T>) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...updates };
        onChange(newItems);
    };

    const handleMove = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const newItems = [...items];
        [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
        onChange(newItems);
        setOpen((current) => {
            const next = new Set(current);
            const a = current.has(index);
            const b = current.has(target);
            if (a) next.add(target); else next.delete(target);
            if (b) next.add(index); else next.delete(index);
            return next;
        });
    };

    const allOpen = items.length > 0 && open.size >= items.length;

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-300">{label}</label>
                    <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">{items.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    {items.length > 1 && (
                        <button
                            type="button"
                            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}
                            className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {allOpen ? "Collapse all" : "Expand all"}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="px-3 py-1 text-sm bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                {items.map((item, index) => {
                    const isOpen = open.has(index);
                    const thumbnail = itemThumbnail(item);
                    return (
                        <div key={index} className="rounded-lg border border-gray-600 bg-gray-900/40">
                            <div className="flex items-center gap-3 px-3 py-2">
                                <button
                                    type="button"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                                >
                                    <svg
                                        className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="w-5 shrink-0 text-xs tabular-nums text-gray-500">{index + 1}</span>
                                    {thumbnail && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={thumbnail}
                                            alt=""
                                            loading="lazy"
                                            className="h-8 w-8 shrink-0 rounded bg-white object-contain p-0.5"
                                        />
                                    )}
                                    <span className="truncate text-sm text-gray-200">
                                        {itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}
                                    </span>
                                </button>
                                <div className="flex shrink-0 items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => handleMove(index, -1)}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-gray-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move up"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMove(index, 1)}
                                        disabled={index === items.length - 1}
                                        className="p-1 hover:bg-gray-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move down"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDuplicate(index)}
                                        className="p-1 hover:bg-gray-600 rounded"
                                        title="Duplicate"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className={`rounded text-red-400 transition-colors ${confirmRemove === index ? "bg-red-500/20 px-2 py-0.5 text-xs font-medium" : "p-1 hover:bg-red-500/20"}`}
                                        title="Remove"
                                    >
                                        {confirmRemove === index ? (
                                            "Click to confirm"
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {isOpen && (
                                <div className="border-t border-gray-600 p-4">
                                    {renderItem(item, index, (updates) => handleUpdate(index, updates))}
                                </div>
                            )}
                        </div>
                    );
                })}
                {items.length === 0 && (
                    <div className="text-center py-6 text-gray-500 text-sm">
                        No items yet. Click &quot;Add&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    );
}

interface StringArrayEditorProps {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
}

export function StringArrayEditor({ label, items, onChange, placeholder }: StringArrayEditorProps) {
    const lastInput = useRef<HTMLInputElement>(null);
    const [focusLast, setFocusLast] = useState(false);

    useEffect(() => {
        if (!focusLast) return;
        lastInput.current?.focus();
        setFocusLast(false);
    }, [focusLast]);

    const handleAdd = () => {
        onChange([...items, ""]);
        setFocusLast(true);
    };

    const handleRemove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const handleUpdate = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        onChange(newItems);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">{label}</label>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-3 py-1 text-sm bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>
            </div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            ref={index === items.length - 1 ? lastInput : undefined}
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdate(index, e.target.value)}
                            placeholder={placeholder}
                            className={`flex-1 ${inputClass}`}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                            title="Remove"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                        No items yet. Click &quot;Add&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    );
}
