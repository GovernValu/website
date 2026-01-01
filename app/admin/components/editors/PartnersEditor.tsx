"use client";

import {
    TextField,
    TextArea,
    ImageField,
    SectionCard,
    ArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PartnersEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function PartnersEditor({ content, onChange }: PartnersEditorProps) {
    const updateField = (key: string, value: any) => {
        onChange({ ...content, [key]: value });
    };

    return (
        <div className="space-y-4">
            {/* Hero Section */}
            <SectionCard title="Hero Section" defaultOpen={true}>
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

            {/* Intro */}
            <SectionCard title="Introduction" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.intro?.sectionTitle || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, sectionTitle: v })}
                />
                <TextArea
                    label="Quote"
                    value={content.intro?.quote || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, quote: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Partnerships */}
            <SectionCard title="Partnerships" defaultOpen={false}>
                <ArrayEditor
                    label="Partnership Items"
                    items={content.partnerships || []}
                    onChange={(partnerships) => updateField("partnerships", partnerships)}
                    createNew={() => ({ country: "", description: "", logo: "" })}
                    itemLabel={(item) => item.country || "New Partnership"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Country / Region"
                                value={item.country}
                                onChange={(v) => updateItem({ country: v })}
                                helpText="e.g., The State of Qatar, USA & UK"
                            />
                            <TextArea
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem({ description: v })}
                                rows={2}
                                helpText="Services provided through this partnership"
                            />
                            <ImageField
                                label="Partner Logo"
                                value={item.logo}
                                onChange={(v) => updateItem({ logo: v })}
                                helpText="Logo image path (e.g., /partnerships/logo.png)"
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* CTA */}
            <SectionCard title="Call to Action" defaultOpen={false}>
                <TextField
                    label="Headline"
                    value={content.cta?.headline || ""}
                    onChange={(v) => updateField("cta", { ...content.cta, headline: v })}
                />
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
