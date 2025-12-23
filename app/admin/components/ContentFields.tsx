"use client";

import { useState } from "react";
import Image from "next/image";

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    helpText?: string;
}

export function TextField({ label, value, onChange, placeholder, helpText }: TextFieldProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
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
}

export function TextArea({ label, value, onChange, placeholder, rows = 3, helpText }: TextAreaProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
            />
            {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        </div>
    );
}

interface ImageFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    helpText?: string;
}

export function ImageField({ label, value, onChange, helpText }: ImageFieldProps) {
    const [error, setError] = useState(false);

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setError(false);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                {value && (
                    <div className="w-16 h-10 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {!error ? (
                            <Image
                                src={value}
                                alt="Preview"
                                fill
                                className="object-cover"
                                onError={() => setError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                Error
                            </div>
                        )}
                    </div>
                )}
            </div>
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
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                <input
                    type="text"
                    value={urlValue || ""}
                    onChange={(e) => onUrlChange(e.target.value)}
                    placeholder="/page-url"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
            </div>
        </div>
    );
}

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function SectionCard({ title, children, defaultOpen = true }: SectionCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-750 transition-colors"
            >
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

export function ArrayEditor<T extends ArrayItem>({
    label,
    items,
    onChange,
    renderItem,
    createNew,
    itemLabel,
}: ArrayEditorProps<T>) {
    const handleAdd = () => {
        onChange([...items, createNew()]);
    };

    const handleRemove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const handleUpdate = (index: number, updates: Partial<T>) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...updates };
        onChange(newItems);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        onChange(newItems);
    };

    const handleMoveDown = (index: number) => {
        if (index === items.length - 1) return;
        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        onChange(newItems);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">{label}</label>
                <button
                    onClick={handleAdd}
                    className="px-3 py-1 text-sm bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">
                                {itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                    className="p-1 hover:bg-gray-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move up"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === items.length - 1}
                                    className="p-1 hover:bg-gray-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move down"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="p-1 hover:bg-red-500/20 rounded text-red-400"
                                    title="Remove"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {renderItem(item, index, (updates) => handleUpdate(index, updates))}
                    </div>
                ))}
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
    const handleAdd = () => {
        onChange([...items, ""]);
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
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdate(index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                        <button
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
