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
                    createNew={() => ({ name: "", nameAr: "", country: "", countryAr: "", field: "", fieldAr: "", services: "", servicesAr: "", logo: "" })}
                    itemLabel={(item) => item.name || "New Client"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Client Name (English)"
                                    value={item.name}
                                    onChange={(v) => updateItem({ name: v })}
                                />
                                <TextField
                                    label="اسم العميل (Arabic)"
                                    value={item.nameAr || ""}
                                    onChange={(v) => updateItem({ nameAr: v })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Country / Region (English)"
                                    value={item.country}
                                    onChange={(v) => updateItem({ country: v })}
                                />
                                <TextField
                                    label="البلد / المنطقة (Arabic)"
                                    value={item.countryAr || ""}
                                    onChange={(v) => updateItem({ countryAr: v })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Field / Industry (English)"
                                    value={item.field}
                                    onChange={(v) => updateItem({ field: v })}
                                />
                                <TextField
                                    label="المجال / الصناعة (Arabic)"
                                    value={item.fieldAr || ""}
                                    onChange={(v) => updateItem({ fieldAr: v })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Services Provided (English)"
                                    value={item.services}
                                    onChange={(v) => updateItem({ services: v })}
                                />
                                <TextField
                                    label="الخدمات المقدمة (Arabic)"
                                    value={item.servicesAr || ""}
                                    onChange={(v) => updateItem({ servicesAr: v })}
                                />
                            </div>
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
