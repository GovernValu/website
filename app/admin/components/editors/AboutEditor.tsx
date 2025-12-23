"use client";

import {
    TextField,
    TextArea,
    SectionCard,
    ArrayEditor,
    StringArrayEditor,
} from "../ContentFields";

interface AboutContent {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
    };
    introduction: {
        sectionTitle: string;
        headline: string;
        paragraphs: string[];
        stats: Array<{ value: string; label: string }>;
    };
    concept: {
        sectionTitle: string;
        headline: string;
        paragraphs: string[];
        strategyItems: string[];
        vision2030: string;
    };
    vision: {
        sectionTitle: string;
        headline: string;
        content: string;
    };
    mission: {
        sectionTitle: string;
        headline: string;
        content: string;
    };
    values: {
        sectionTitle: string;
        headline: string;
        items: Array<{ title: string; description: string }>;
    };
    objectives: {
        sectionTitle: string;
        headline: string;
        items: string[];
    };
    cta: {
        headline: string;
        headlineHighlight: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
    };
}

interface AboutEditorProps {
    content: AboutContent;
    onChange: (content: AboutContent) => void;
}

export default function AboutEditor({ content, onChange }: AboutEditorProps) {
    const updateField = <K extends keyof AboutContent>(
        section: K,
        updates: Partial<AboutContent[K]>
    ) => {
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
                    value={content.hero.badge}
                    onChange={(v) => updateField("hero", { badge: v })}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Main Title"
                        value={content.hero.title}
                        onChange={(v) => updateField("hero", { title: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content.hero.titleHighlight}
                        onChange={(v) => updateField("hero", { titleHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.hero.subtitle}
                    onChange={(v) => updateField("hero", { subtitle: v })}
                    rows={2}
                />
            </SectionCard>

            {/* Introduction */}
            <SectionCard title="Introduction" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.introduction.sectionTitle}
                    onChange={(v) => updateField("introduction", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.introduction.headline}
                    onChange={(v) => updateField("introduction", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content.introduction.paragraphs}
                    onChange={(paragraphs) => updateField("introduction", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
                <ArrayEditor
                    label="Stats"
                    items={content.introduction.stats}
                    onChange={(stats) => updateField("introduction", { stats })}
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

            {/* Concept & Strategy */}
            <SectionCard title="Company Concept & Strategy" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.concept.sectionTitle}
                    onChange={(v) => updateField("concept", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.concept.headline}
                    onChange={(v) => updateField("concept", { headline: v })}
                />
                <StringArrayEditor
                    label="Paragraphs"
                    items={content.concept.paragraphs}
                    onChange={(paragraphs) => updateField("concept", { paragraphs })}
                    placeholder="Enter paragraph text..."
                />
                <StringArrayEditor
                    label="Strategy Items"
                    items={content.concept.strategyItems}
                    onChange={(strategyItems) => updateField("concept", { strategyItems })}
                    placeholder="Enter strategy item..."
                />
                <TextArea
                    label="Vision 2030"
                    value={content.concept.vision2030}
                    onChange={(v) => updateField("concept", { vision2030: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Vision */}
            <SectionCard title="Vision" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.vision.sectionTitle}
                    onChange={(v) => updateField("vision", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.vision.headline}
                    onChange={(v) => updateField("vision", { headline: v })}
                />
                <TextArea
                    label="Vision Statement"
                    value={content.vision.content}
                    onChange={(v) => updateField("vision", { content: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Mission */}
            <SectionCard title="Mission" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.mission.sectionTitle}
                    onChange={(v) => updateField("mission", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.mission.headline}
                    onChange={(v) => updateField("mission", { headline: v })}
                />
                <TextArea
                    label="Mission Statement"
                    value={content.mission.content}
                    onChange={(v) => updateField("mission", { content: v })}
                    rows={3}
                />
            </SectionCard>

            {/* Values */}
            <SectionCard title="Core Values" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.values.sectionTitle}
                    onChange={(v) => updateField("values", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.values.headline}
                    onChange={(v) => updateField("values", { headline: v })}
                />
                <ArrayEditor
                    label="Values"
                    items={content.values.items}
                    onChange={(items) => updateField("values", { items })}
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

            {/* Objectives */}
            <SectionCard title="Strategic Objectives" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.objectives.sectionTitle}
                    onChange={(v) => updateField("objectives", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.objectives.headline}
                    onChange={(v) => updateField("objectives", { headline: v })}
                />
                <StringArrayEditor
                    label="Objectives"
                    items={content.objectives.items}
                    onChange={(items) => updateField("objectives", { items })}
                    placeholder="Enter objective..."
                />
            </SectionCard>

            {/* CTA */}
            <SectionCard title="Call to Action" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Headline"
                        value={content.cta.headline}
                        onChange={(v) => updateField("cta", { headline: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content.cta.headlineHighlight}
                        onChange={(v) => updateField("cta", { headlineHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.cta.subtitle}
                    onChange={(v) => updateField("cta", { subtitle: v })}
                    rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Button Text"
                        value={content.cta.buttonText}
                        onChange={(v) => updateField("cta", { buttonText: v })}
                    />
                    <TextField
                        label="Button Link"
                        value={content.cta.buttonLink}
                        onChange={(v) => updateField("cta", { buttonLink: v })}
                    />
                </div>
            </SectionCard>
        </div>
    );
}
