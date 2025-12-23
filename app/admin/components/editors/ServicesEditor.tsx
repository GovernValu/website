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
interface ServicesEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function ServicesEditor({ content, onChange }: ServicesEditorProps) {
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

            {/* Methodology */}
            <SectionCard title="Methodology" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.methodology?.sectionTitle || ""}
                    onChange={(v) => updateField("methodology", { ...content.methodology, sectionTitle: v })}
                />
                <TextArea
                    label="Quote"
                    value={content.methodology?.quote || ""}
                    onChange={(v) => updateField("methodology", { ...content.methodology, quote: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Services */}
            <SectionCard title="Services" defaultOpen={false}>
                <ArrayEditor
                    label="Service Items"
                    items={content.services || []}
                    onChange={(services) => updateField("services", services)}
                    createNew={() => ({
                        slug: "",
                        title: "",
                        shortDescription: "",
                        icon: "building",
                        features: [],
                        fullDescription: "",
                        image: "",
                        benefits: [],
                    })}
                    itemLabel={(item) => item.title || "New Service"}
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
                                    label="Icon"
                                    value={item.icon}
                                    onChange={(v) => updateItem({ icon: v })}
                                    helpText="building, chart, shield, bank, globe, users"
                                />
                            </div>
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(v) => updateItem({ title: v })}
                            />
                            <TextArea
                                label="Short Description"
                                value={item.shortDescription}
                                onChange={(v) => updateItem({ shortDescription: v })}
                                rows={2}
                            />
                            <TextArea
                                label="Full Description"
                                value={item.fullDescription || ""}
                                onChange={(v) => updateItem({ fullDescription: v })}
                                rows={3}
                            />
                            <ImageField
                                label="Image"
                                value={item.image || ""}
                                onChange={(v) => updateItem({ image: v })}
                            />
                            <StringArrayEditor
                                label="Features"
                                items={item.features || []}
                                onChange={(features: string[]) => updateItem({ features } as any)}
                                placeholder="Enter feature..."
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Engagement Model */}
            <SectionCard title="Engagement Model" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.engagement?.sectionTitle || ""}
                    onChange={(v) => updateField("engagement", { ...content.engagement, sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.engagement?.headline || ""}
                    onChange={(v) => updateField("engagement", { ...content.engagement, headline: v })}
                />
                <ArrayEditor
                    label="Steps"
                    items={content.engagement?.steps || []}
                    onChange={(steps) => updateField("engagement", { ...content.engagement, steps })}
                    createNew={() => ({ number: "", title: "", description: "" })}
                    itemLabel={(item) => item.title || "New Step"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <div className="grid grid-cols-4 gap-3">
                                <TextField
                                    label="Number"
                                    value={item.number}
                                    onChange={(v) => updateItem({ number: v })}
                                />
                                <div className="col-span-3">
                                    <TextField
                                        label="Title"
                                        value={item.title}
                                        onChange={(v) => updateItem({ title: v })}
                                    />
                                </div>
                            </div>
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
