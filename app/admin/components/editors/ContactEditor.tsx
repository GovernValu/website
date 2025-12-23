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
interface ContactEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function ContactEditor({ content, onChange }: ContactEditorProps) {
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
                <ImageField
                    label="Background Image"
                    value={content.hero?.backgroundImage || ""}
                    onChange={(v) => updateField("hero", { ...content.hero, backgroundImage: v })}
                />
            </SectionCard>

            {/* Quick Contact */}
            <SectionCard title="Quick Contact" defaultOpen={false}>
                <div className="grid grid-cols-3 gap-4">
                    <TextField
                        label="Phone"
                        value={content.quickContact?.phone || ""}
                        onChange={(v) => updateField("quickContact", { ...content.quickContact, phone: v })}
                    />
                    <TextField
                        label="Email"
                        value={content.quickContact?.email || ""}
                        onChange={(v) => updateField("quickContact", { ...content.quickContact, email: v })}
                    />
                    <TextField
                        label="Office Hours"
                        value={content.quickContact?.officeHours || ""}
                        onChange={(v) => updateField("quickContact", { ...content.quickContact, officeHours: v })}
                    />
                </div>
            </SectionCard>

            {/* Form Section */}
            <SectionCard title="Contact Form" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.form?.sectionTitle || ""}
                    onChange={(v) => updateField("form", { ...content.form, sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.form?.headline || ""}
                    onChange={(v) => updateField("form", { ...content.form, headline: v })}
                />
                <TextArea
                    label="Subtitle"
                    value={content.form?.subtitle || ""}
                    onChange={(v) => updateField("form", { ...content.form, subtitle: v })}
                    rows={2}
                />
                <TextField
                    label="Form Title"
                    value={content.form?.formTitle || ""}
                    onChange={(v) => updateField("form", { ...content.form, formTitle: v })}
                />
                <TextField
                    label="Form Subtitle"
                    value={content.form?.formSubtitle || ""}
                    onChange={(v) => updateField("form", { ...content.form, formSubtitle: v })}
                />
                <StringArrayEditor
                    label="Inquiry Options"
                    items={content.form?.inquiryOptions || []}
                    onChange={(inquiryOptions) => updateField("form", { ...content.form, inquiryOptions })}
                    placeholder="Enter inquiry option..."
                />
            </SectionCard>

            {/* Headquarters */}
            <SectionCard title="Headquarters" defaultOpen={false}>
                <TextField
                    label="Title"
                    value={content.headquarters?.title || ""}
                    onChange={(v) => updateField("headquarters", { ...content.headquarters, title: v })}
                />
                <TextField
                    label="City"
                    value={content.headquarters?.city || ""}
                    onChange={(v) => updateField("headquarters", { ...content.headquarters, city: v })}
                />
                <TextArea
                    label="Address"
                    value={content.headquarters?.address || ""}
                    onChange={(v) => updateField("headquarters", { ...content.headquarters, address: v })}
                    rows={3}
                    helpText="Use \n for line breaks"
                />
            </SectionCard>

            {/* Response Promise */}
            <SectionCard title="Response Promise" defaultOpen={false}>
                <TextField
                    label="Title"
                    value={content.responsePromise?.title || ""}
                    onChange={(v) => updateField("responsePromise", { ...content.responsePromise, title: v })}
                />
                <TextArea
                    label="Description"
                    value={content.responsePromise?.description || ""}
                    onChange={(v) => updateField("responsePromise", { ...content.responsePromise, description: v })}
                    rows={2}
                />
            </SectionCard>

            {/* Map */}
            <SectionCard title="Map Section" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.map?.sectionTitle || ""}
                    onChange={(v) => updateField("map", { ...content.map, sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.map?.headline || ""}
                    onChange={(v) => updateField("map", { ...content.map, headline: v })}
                />
                <TextArea
                    label="Description"
                    value={content.map?.description || ""}
                    onChange={(v) => updateField("map", { ...content.map, description: v })}
                    rows={2}
                />
                <TextField
                    label="Google Maps Embed URL"
                    value={content.map?.embedUrl || ""}
                    onChange={(v) => updateField("map", { ...content.map, embedUrl: v })}
                    helpText="Full Google Maps embed URL"
                />
            </SectionCard>

            {/* FAQ */}
            <SectionCard title="FAQ" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.faq?.sectionTitle || ""}
                    onChange={(v) => updateField("faq", { ...content.faq, sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.faq?.headline || ""}
                    onChange={(v) => updateField("faq", { ...content.faq, headline: v })}
                />
                <ArrayEditor
                    label="FAQ Items"
                    items={content.faq?.items || []}
                    onChange={(items) => updateField("faq", { ...content.faq, items })}
                    createNew={() => ({ question: "", answer: "" })}
                    itemLabel={(item) => item.question || "New Question"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Question"
                                value={item.question}
                                onChange={(v) => updateItem({ question: v })}
                            />
                            <TextArea
                                label="Answer"
                                value={item.answer}
                                onChange={(v) => updateItem({ answer: v })}
                                rows={3}
                            />
                        </div>
                    )}
                />
            </SectionCard>
        </div>
    );
}
