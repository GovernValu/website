"use client";

import {
    TextField,
    TextArea,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TeamsEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function TeamsEditor({ content, onChange }: TeamsEditorProps) {
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
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Main Title"
                        value={content?.hero?.title || ""}
                        onChange={(v) => updateField("hero", { title: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content?.hero?.titleHighlight || ""}
                        onChange={(v) => updateField("hero", { titleHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content?.hero?.subtitle || ""}
                    onChange={(v) => updateField("hero", { subtitle: v })}
                    rows={2}
                />
            </SectionCard>

            {/* Culture */}
            <SectionCard title="Culture Section" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.culture?.sectionTitle || ""}
                    onChange={(v) => updateField("culture", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.culture?.headline || ""}
                    onChange={(v) => updateField("culture", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content?.culture?.paragraphs || []}
                    onChange={(paragraphs) => updateField("culture", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
            </SectionCard>

            {/* Core Values */}
            <SectionCard title="Core Values" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.coreValues?.sectionTitle || ""}
                    onChange={(v) => updateField("coreValues", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.coreValues?.headline || ""}
                    onChange={(v) => updateField("coreValues", { headline: v })}
                />
                <ArrayEditor
                    label="Values"
                    items={content?.coreValues?.items || []}
                    onChange={(items) => updateField("coreValues", { items })}
                    createNew={() => ({ title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed value"}
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

            {/* Capabilities */}
            <SectionCard title="Capabilities" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.capabilities?.sectionTitle || ""}
                    onChange={(v) => updateField("capabilities", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.capabilities?.headline || ""}
                    onChange={(v) => updateField("capabilities", { headline: v })}
                />
                <ArrayEditor
                    label="Capability Items"
                    items={content?.capabilities?.items || []}
                    onChange={(items) => updateField("capabilities", { items })}
                    createNew={() => ({ title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed capability"}
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

            {/* Regional Focus */}
            <SectionCard title="Regional Focus" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.regionalFocus?.sectionTitle || ""}
                    onChange={(v) => updateField("regionalFocus", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.regionalFocus?.headline || ""}
                    onChange={(v) => updateField("regionalFocus", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content?.regionalFocus?.paragraphs || []}
                    onChange={(paragraphs) => updateField("regionalFocus", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
                <ArrayEditor
                    label="Stats"
                    items={content?.regionalFocus?.stats || []}
                    onChange={(stats) => updateField("regionalFocus", { stats })}
                    createNew={() => ({ value: "", label: "" })}
                    itemLabel={(item) => item.label || "Unnamed stat"}
                    renderItem={(item, _, updateItem) => (
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                label="Value"
                                value={item.value}
                                onChange={(v) => updateItem({ value: v })}
                            />
                            <TextField
                                label="Label"
                                value={item.label}
                                onChange={(v) => updateItem({ label: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Careers */}
            <SectionCard title="Careers Section" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.careers?.sectionTitle || ""}
                    onChange={(v) => updateField("careers", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.careers?.headline || ""}
                    onChange={(v) => updateField("careers", { headline: v })}
                />
                <TextArea
                    label="Description"
                    value={content?.careers?.description || ""}
                    onChange={(v) => updateField("careers", { description: v })}
                    rows={3}
                />
                <TextField
                    label="Button Text"
                    value={content?.careers?.buttonText || ""}
                    onChange={(v) => updateField("careers", { buttonText: v })}
                />
                <TextField
                    label="Qualifications Title"
                    value={content?.careers?.qualificationsTitle || ""}
                    onChange={(v) => updateField("careers", { qualificationsTitle: v })}
                />
                <StringArrayEditor
                    label="Qualifications"
                    items={content?.careers?.qualifications || []}
                    onChange={(qualifications) => updateField("careers", { qualifications })}
                    placeholder="Enter qualification..."
                />
            </SectionCard>
        </div>
    );
}
