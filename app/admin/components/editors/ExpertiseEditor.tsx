"use client";

import {
    TextField,
    TextArea,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ExpertiseEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function ExpertiseEditor({ content, onChange }: ExpertiseEditorProps) {
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

            {/* Client Types */}
            <SectionCard title="Client Types" defaultOpen={false}>
                <TextField
                    label="Label"
                    value={content?.clientTypes?.label || ""}
                    onChange={(v) => updateField("clientTypes", { label: v })}
                />
                <ArrayEditor
                    label="Client Types"
                    items={content?.clientTypes?.items || []}
                    onChange={(items) => updateField("clientTypes", { items })}
                    createNew={() => ({ icon: "", name: "" })}
                    itemLabel={(item) => item.name || "Unnamed client type"}
                    renderItem={(item, _, updateItem) => (
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                label="Icon (emoji)"
                                value={item.icon}
                                onChange={(v) => updateItem({ icon: v })}
                            />
                            <TextField
                                label="Name"
                                value={item.name}
                                onChange={(v) => updateItem({ name: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Expertise Areas */}
            <SectionCard title="Expertise Areas" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.expertiseAreas?.sectionTitle || ""}
                    onChange={(v) => updateField("expertiseAreas", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.expertiseAreas?.headline || ""}
                    onChange={(v) => updateField("expertiseAreas", { headline: v })}
                />
                <ArrayEditor
                    label="Areas"
                    items={content?.expertiseAreas?.items || []}
                    onChange={(items) => updateField("expertiseAreas", { items })}
                    createNew={() => ({ title: "", description: "", features: [] as string[] })}
                    itemLabel={(item) => item.title || "Unnamed area"}
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
                            <StringArrayEditor
                                label="Features"
                                items={item.features || []}
                                onChange={(features) => updateItem({ features })}
                                placeholder="Enter feature..."
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* International Standards */}
            <SectionCard title="International Standards" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.standards?.sectionTitle || ""}
                    onChange={(v) => updateField("standards", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.standards?.headline || ""}
                    onChange={(v) => updateField("standards", { headline: v })}
                />
                <ArrayEditor
                    label="Standards"
                    items={content?.standards?.items || []}
                    onChange={(items) => updateField("standards", { items })}
                    createNew={() => ({ name: "", description: "" })}
                    itemLabel={(item) => item.name || "Unnamed standard"}
                    renderItem={(item, _, updateItem) => (
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                label="Name"
                                value={item.name}
                                onChange={(v) => updateItem({ name: v })}
                            />
                            <TextField
                                label="Description"
                                value={item.description}
                                onChange={(v) => updateItem({ description: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Process */}
            <SectionCard title="Our Process" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.process?.sectionTitle || ""}
                    onChange={(v) => updateField("process", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.process?.headline || ""}
                    onChange={(v) => updateField("process", { headline: v })}
                />
                <ArrayEditor
                    label="Process Steps"
                    items={content?.process?.steps || []}
                    onChange={(steps) => updateField("process", { steps })}
                    createNew={() => ({ number: "", title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed step"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Step Number"
                                value={item.number}
                                onChange={(v) => updateItem({ number: v })}
                            />
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
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Headline"
                        value={content?.cta?.headline || ""}
                        onChange={(v) => updateField("cta", { headline: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content?.cta?.headlineHighlight || ""}
                        onChange={(v) => updateField("cta", { headlineHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content?.cta?.subtitle || ""}
                    onChange={(v) => updateField("cta", { subtitle: v })}
                    rows={2}
                />
                <TextField
                    label="Button Text"
                    value={content?.cta?.buttonText || ""}
                    onChange={(v) => updateField("cta", { buttonText: v })}
                />
            </SectionCard>
        </div>
    );
}
