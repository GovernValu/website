"use client";

import {
    TextField,
    TextArea,
    ImageField,
    SectionCard,
    ArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ClientsEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function ClientsEditor({ content, onChange }: ClientsEditorProps) {
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
                <TextField
                    label="Headline"
                    value={content.intro?.headline || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, headline: v })}
                />
            </SectionCard>

            {/* Clients */}
            <SectionCard title="Clients" defaultOpen={false}>
                <ArrayEditor
                    label="Client Items"
                    items={content.clients || []}
                    onChange={(clients) => updateField("clients", clients)}
                    createNew={() => ({ name: "", country: "", field: "", services: "", logo: "" })}
                    itemLabel={(item) => item.name || "New Client"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Client Name"
                                value={item.name}
                                onChange={(v) => updateItem({ name: v })}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Country / Region"
                                    value={item.country}
                                    onChange={(v) => updateItem({ country: v })}
                                />
                                <TextField
                                    label="Field / Industry"
                                    value={item.field}
                                    onChange={(v) => updateItem({ field: v })}
                                />
                            </div>
                            <TextField
                                label="Services Provided"
                                value={item.services}
                                onChange={(v) => updateItem({ services: v })}
                            />
                            <ImageField
                                label="Client Logo"
                                value={item.logo}
                                onChange={(v) => updateItem({ logo: v })}
                                helpText="Logo image path (e.g., /clients/logo.png)"
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
