"use client";

import {
    TextField,
    TextArea,
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
                    label="Quote"
                    value={content.intro?.quote || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, quote: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Partner Categories */}
            <SectionCard title="Partner Categories" defaultOpen={false}>
                <ArrayEditor
                    label="Categories"
                    items={content.categories || []}
                    onChange={(categories) => updateField("categories", categories)}
                    createNew={() => ({ title: "", partners: [] })}
                    itemLabel={(item) => item.title || "New Category"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Category Title"
                                value={item.title}
                                onChange={(v) => updateItem({ title: v })}
                            />
                            <ArrayEditor
                                label="Partners"
                                items={item.partners || []}
                                onChange={(partners: any[]) => updateItem({ partners } as any)}
                                createNew={() => ({ name: "", logo: "" })}
                                itemLabel={(p) => p.name || "New Partner"}
                                renderItem={(partner, __, updatePartner) => (
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Partner Name"
                                            value={partner.name}
                                            onChange={(v) => updatePartner({ name: v })}
                                        />
                                        <TextField
                                            label="Logo Initials"
                                            value={partner.logo}
                                            onChange={(v) => updatePartner({ logo: v })}
                                            helpText="2 letters for logo"
                                        />
                                    </div>
                                )}
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
