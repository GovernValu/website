"use client";

import {
    TextField,
    TextArea,
    ImageField,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IndustriesEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function IndustriesEditor({ content, onChange }: IndustriesEditorProps) {
    const updateField = (key: string, value: any) => {
        onChange({ ...content, [key]: value });
    };

    return (
        <div className="space-y-4">
            {/* Hero Section */}
            <SectionCard title="Hero Section" defaultOpen={true}>
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
                    rows={2}
                />
            </SectionCard>

            {/* Intro */}
            <SectionCard title="Introduction" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.intro?.sectionTitle || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, sectionTitle: v })}
                />
                <TextArea
                    label="Description"
                    value={content.intro?.description || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, description: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Industries */}
            <SectionCard title="Industries" defaultOpen={false}>
                <ArrayEditor
                    label="Industry Items"
                    items={content.industries || []}
                    onChange={(industries) => updateField("industries", industries)}
                    createNew={() => ({
                        slug: "",
                        title: "",
                        description: "",
                        image: "",
                        stats: { clients: "", assets: "" },
                        services: [],
                    })}
                    itemLabel={(item) => item.title || "New Industry"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Slug"
                                    value={item.slug}
                                    onChange={(v) => updateItem({ slug: v })}
                                    helpText="URL-friendly name"
                                />
                                <TextField
                                    label="Title"
                                    value={item.title}
                                    onChange={(v) => updateItem({ title: v })}
                                />
                            </div>
                            <TextArea
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem({ description: v })}
                                rows={2}
                            />
                            <ImageField
                                label="Image"
                                value={item.image}
                                onChange={(v) => updateItem({ image: v })}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Clients Stat"
                                    value={item.stats?.clients || ""}
                                    onChange={(v) => updateItem({ stats: { ...item.stats, clients: v } })}
                                    placeholder="e.g., 15+"
                                />
                                <TextField
                                    label="Assets Stat"
                                    value={item.stats?.assets || ""}
                                    onChange={(v) => updateItem({ stats: { ...item.stats, assets: v } })}
                                    placeholder="e.g., $4B+"
                                />
                            </div>
                            <StringArrayEditor
                                label="Services"
                                items={item.services || []}
                                onChange={(services: string[]) => updateItem({ services } as any)}
                                placeholder="Enter service..."
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Stats */}
            <SectionCard title="Overall Stats" defaultOpen={false}>
                <ArrayEditor
                    label="Stats"
                    items={content.stats || []}
                    onChange={(stats) => updateField("stats", stats)}
                    createNew={() => ({ value: "", label: "" })}
                    itemLabel={(item) => item.label || "New Stat"}
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

            {/* CTA */}
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
        </div>
    );
}
