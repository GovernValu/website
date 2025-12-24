"use client";

import {
    TextField,
    TextArea,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PhilosophyEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export default function PhilosophyEditor({ content, onChange }: PhilosophyEditorProps) {
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

            {/* Core Beliefs */}
            <SectionCard title="Core Beliefs" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.coreBeliefs?.sectionTitle || ""}
                    onChange={(v) => updateField("coreBeliefs", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.coreBeliefs?.headline || ""}
                    onChange={(v) => updateField("coreBeliefs", { headline: v })}
                />
                <ArrayEditor
                    label="Belief Items"
                    items={content?.coreBeliefs?.items || []}
                    onChange={(items) => updateField("coreBeliefs", { items })}
                    createNew={() => ({ title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed belief"}
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

            {/* Quote */}
            <SectionCard title="Quote Section" defaultOpen={false}>
                <TextArea
                    label="Quote Text"
                    value={content?.quote?.text || ""}
                    onChange={(v) => updateField("quote", { text: v })}
                    rows={3}
                />
                <TextField
                    label="Source"
                    value={content?.quote?.source || ""}
                    onChange={(v) => updateField("quote", { source: v })}
                />
            </SectionCard>

            {/* Approach */}
            <SectionCard title="Our Approach" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.approach?.sectionTitle || ""}
                    onChange={(v) => updateField("approach", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.approach?.headline || ""}
                    onChange={(v) => updateField("approach", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content?.approach?.paragraphs || []}
                    onChange={(paragraphs) => updateField("approach", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
                <StringArrayEditor
                    label="Standards"
                    items={content?.approach?.standards || []}
                    onChange={(standards) => updateField("approach", { standards })}
                    placeholder="Enter standard..."
                />
            </SectionCard>

            {/* Commitments */}
            <SectionCard title="Commitments" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.commitments?.sectionTitle || ""}
                    onChange={(v) => updateField("commitments", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.commitments?.headline || ""}
                    onChange={(v) => updateField("commitments", { headline: v })}
                />
                <ArrayEditor
                    label="Commitment Items"
                    items={content?.commitments?.items || []}
                    onChange={(items) => updateField("commitments", { items })}
                    createNew={() => ({ number: "", title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed commitment"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <TextField
                                label="Number"
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

            {/* Partnership */}
            <SectionCard title="Partnership Philosophy" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content?.partnership?.sectionTitle || ""}
                    onChange={(v) => updateField("partnership", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content?.partnership?.headline || ""}
                    onChange={(v) => updateField("partnership", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content?.partnership?.paragraphs || []}
                    onChange={(paragraphs) => updateField("partnership", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
                <ArrayEditor
                    label="Core Values"
                    items={content?.partnership?.coreValues || []}
                    onChange={(coreValues) => updateField("partnership", { coreValues })}
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
