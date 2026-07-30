"use client";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-40 animate-pulse rounded-xl border border-gray-700 bg-gray-800" />
    ),
});

interface RichTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    helpText?: string;
    rows?: number;
}

export default function RichTextField({
    label,
    value,
    onChange,
    placeholder,
    helpText,
}: RichTextFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
                <label className="block text-sm font-medium text-gray-300">{label}</label>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                    Rich HTML
                </span>
            </div>
            <RichTextEditor
                content={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                minHeightClassName="min-h-[160px]"
            />
            {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        </div>
    );
}
