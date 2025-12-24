"use client";

import {
    TextField,
    TextArea,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface BoardEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function BoardEditor({ content, onChange }: BoardEditorProps) {
    const updateField = (section: string, updates: any) => {
        onChange({
            ...content,
            [section]: { ...content[section], ...updates },
        });
    };

    return (
        <div className="space-y-4">
            {/* Hero Section */}
            <SectionCard title="Hero Section" defaultOpen={true}>
                <TextField
                    label="Badge Text"
                    value={content?.hero?.badge || ""}
                    onChange={(v) => updateField("hero", { badge: v })}
                />
                <TextField
                    label="Title"
                    value={content?.hero?.title || ""}
                    onChange={(v) => updateField("hero", { title: v })}
                />
                <TextArea
                    label="Subtitle"
                    value={content?.hero?.subtitle || ""}
                    onChange={(v) => updateField("hero", { subtitle: v })}
                    rows={2}
                />
            </SectionCard>

            {/* Chairman's Message */}
            <SectionCard title="Chairman's Message" defaultOpen={false}>
                <TextField
                    label="Badge"
                    value={content?.chairmanMessage?.badge || ""}
                    onChange={(v) => updateField("chairmanMessage", { badge: v })}
                />
                <TextField
                    label="Title"
                    value={content?.chairmanMessage?.title || ""}
                    onChange={(v) => updateField("chairmanMessage", { title: v })}
                />
                <TextArea
                    label="Introduction"
                    value={content?.chairmanMessage?.intro || ""}
                    onChange={(v) => updateField("chairmanMessage", { intro: v })}
                    rows={3}
                />
                <TextArea
                    label="Quote"
                    value={content?.chairmanMessage?.quote || ""}
                    onChange={(v) => updateField("chairmanMessage", { quote: v })}
                    rows={2}
                />
                <StringArrayEditor
                    label="Body Paragraphs"
                    items={content?.chairmanMessage?.body || []}
                    onChange={(body) => updateField("chairmanMessage", { body })}
                    placeholder="Enter paragraph text..."
                />
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
                    <TextField
                        label="Signature Name"
                        value={content?.chairmanMessage?.signature?.name || ""}
                        onChange={(v) => updateField("chairmanMessage", { signature: { ...content?.chairmanMessage?.signature, name: v } })}
                    />
                    <TextField
                        label="Signature Role"
                        value={content?.chairmanMessage?.signature?.role || ""}
                        onChange={(v) => updateField("chairmanMessage", { signature: { ...content?.chairmanMessage?.signature, role: v } })}
                    />
                </div>
            </SectionCard>

            {/* Quote Section */}
            <SectionCard title="Quote Section" defaultOpen={false}>
                <TextArea
                    label="Quote Text"
                    value={content?.quoteSection?.text || ""}
                    onChange={(v) => updateField("quoteSection", { text: v })}
                    rows={3}
                />
                <TextField
                    label="Author"
                    value={content?.quoteSection?.author || ""}
                    onChange={(v) => updateField("quoteSection", { author: v })}
                />
            </SectionCard>

            {/* Board Members */}
            <SectionCard title="Board Members" defaultOpen={false}>
                <TextField
                    label="Badge"
                    value={content?.boardMembers?.badge || ""}
                    onChange={(v) => updateField("boardMembers", { badge: v })}
                />
                <TextField
                    label="Title"
                    value={content?.boardMembers?.title || ""}
                    onChange={(v) => updateField("boardMembers", { title: v })}
                />
                <ArrayEditor
                    label="Members"
                    items={content?.boardMembers?.list || []}
                    onChange={(list) => updateField("boardMembers", { list })}
                    createNew={() => ({ name: "", role: "", specialty: "", image: "/board/default.jpg" })}
                    itemLabel={(item) => item.name || "Unnamed member"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Name"
                                value={item.name}
                                onChange={(v) => updateItem({ name: v })}
                            />
                            <TextField
                                label="Role"
                                value={item.role}
                                onChange={(v) => updateItem({ role: v })}
                            />
                            <TextField
                                label="Specialty"
                                value={item.specialty}
                                onChange={(v) => updateItem({ specialty: v })}
                            />
                            <TextField
                                label="Image Path"
                                value={item.image}
                                onChange={(v) => updateItem({ image: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Principles */}
            <SectionCard title="Leadership Principles" defaultOpen={false}>
                <TextField
                    label="Badge"
                    value={content?.principles?.badge || ""}
                    onChange={(v) => updateField("principles", { badge: v })}
                />
                <TextField
                    label="Title"
                    value={content?.principles?.title || ""}
                    onChange={(v) => updateField("principles", { title: v })}
                />
                <ArrayEditor
                    label="Principles"
                    items={content?.principles?.items || []}
                    onChange={(items) => updateField("principles", { items })}
                    createNew={() => ({ title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed principle"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(v) => updateItem({ title: v })}
                            />
                            <TextArea
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem({ description: v })}
                                rows={2}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* CTA */}
            <SectionCard title="Call to Action" defaultOpen={false}>
                <TextField
                    label="Title"
                    value={content?.cta?.title || ""}
                    onChange={(v) => updateField("cta", { title: v })}
                />
                <TextArea
                    label="Subtitle"
                    value={content?.cta?.subtitle || ""}
                    onChange={(v) => updateField("cta", { subtitle: v })}
                    rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Button Text"
                        value={content?.cta?.buttonText || ""}
                        onChange={(v) => updateField("cta", { buttonText: v })}
                    />
                    <TextField
                        label="Button Link"
                        value={content?.cta?.buttonLink || ""}
                        onChange={(v) => updateField("cta", { buttonLink: v })}
                    />
                </div>
            </SectionCard>
        </div>
    );
}
