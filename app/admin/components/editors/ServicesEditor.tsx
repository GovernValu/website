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
                        label="Badge Text"
                        value={content.hero?.badge || ""}
                        onChange={(v) => updateField("hero", { ...content.hero, badge: v })}
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
                    label="Title"
                    value={content.intro?.title || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, title: v })}
                />
                <TextArea
                    label="Text"
                    value={content.intro?.text || ""}
                    onChange={(v) => updateField("intro", { ...content.intro, text: v })}
                    rows={2}
                />
            </SectionCard>

            {/* Services */}
            <SectionCard title="Services List" defaultOpen={false}>
                <ArrayEditor
                    label="Service Items"
                    items={content.services || []}
                    onChange={(services) => updateField("services", services)}
                    createNew={() => ({
                        slug: "",
                        title: "",
                        shortDescription: "",
                        icon: "building",
                        features: [] as string[],
                        fullDescription: "",
                        image: "",
                        details: {
                            featureCard1: { title: "", description: "" },
                            featureCard2: { title: "", description: "" },
                            keyPointsTitle: "",
                            keyPointsHeadline: "",
                            keyPoints: [] as { title: string; description: string }[],
                            processTitle: "",
                            processHeadline: "",
                            process: [] as { title: string; description: string }[],
                            whyChooseUsTitle: "",
                            whyChooseUsHeadline: "",
                            whyChooseUs: [] as { title: string; description: string }[],
                            sidebar: { title: "", description: "" },
                            ctaBanner: { headline: "", subtext: "", button1Text: "", button2Text: "" }
                        }
                    })}
                    itemLabel={(item) => item.title || "New Service"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h4 className="font-semibold text-gray-700">Basic Information</h4>
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
                                    label="Main Image"
                                    value={item.image || ""}
                                    onChange={(v) => updateItem({ image: v })}
                                />
                            </div>

                            {/* Detail Page Content */}
                            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-800">Landing Page Details</h4>
                                <p className="text-xs text-blue-600 mb-2">Content specific to the detail page of this service.</p>

                                {/* Feature Cards */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h5 className="text-sm font-medium">Feature Card 1</h5>
                                        <TextField
                                            label="Title"
                                            value={item.details?.featureCard1?.title || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, featureCard1: { ...item.details?.featureCard1, title: v } }
                                            })}
                                        />
                                        <TextArea
                                            label="Description"
                                            value={item.details?.featureCard1?.description || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, featureCard1: { ...item.details?.featureCard1, description: v } }
                                            })}
                                            rows={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-sm font-medium">Feature Card 2</h5>
                                        <TextField
                                            label="Title"
                                            value={item.details?.featureCard2?.title || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, featureCard2: { ...item.details?.featureCard2, title: v } }
                                            })}
                                        />
                                        <TextArea
                                            label="Description"
                                            value={item.details?.featureCard2?.description || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, featureCard2: { ...item.details?.featureCard2, description: v } }
                                            })}
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                {/* Key Points Section */}
                                <div className="space-y-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <h5 className="text-sm font-semibold text-green-800">Key Points / What We Offer</h5>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Section Title"
                                            value={item.details?.keyPointsTitle || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, keyPointsTitle: v }
                                            })}
                                        />
                                        <TextField
                                            label="Section Headline"
                                            value={item.details?.keyPointsHeadline || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, keyPointsHeadline: v }
                                            })}
                                        />
                                    </div>
                                    <ArrayEditor
                                        label="Key Points"
                                        items={item.details?.keyPoints || []}
                                        onChange={(keyPoints) => updateItem({
                                            details: { ...item.details, keyPoints }
                                        })}
                                        createNew={() => ({ title: "", description: "" })}
                                        itemLabel={(kp) => kp.title || "New Key Point"}
                                        renderItem={(kp, _, updateKp) => (
                                            <div className="space-y-2">
                                                <TextField
                                                    label="Title"
                                                    value={kp.title}
                                                    onChange={(v) => updateKp({ title: v })}
                                                />
                                                <TextArea
                                                    label="Description"
                                                    value={kp.description}
                                                    onChange={(v) => updateKp({ description: v })}
                                                    rows={2}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Process Section */}
                                <div className="space-y-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <h5 className="text-sm font-semibold text-purple-800">Process / How We Deliver</h5>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Section Title"
                                            value={item.details?.processTitle || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, processTitle: v }
                                            })}
                                        />
                                        <TextField
                                            label="Section Headline"
                                            value={item.details?.processHeadline || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, processHeadline: v }
                                            })}
                                        />
                                    </div>
                                    <ArrayEditor
                                        label="Process Steps"
                                        items={item.details?.process || []}
                                        onChange={(process) => updateItem({
                                            details: { ...item.details, process }
                                        })}
                                        createNew={() => ({ title: "", description: "" })}
                                        itemLabel={(step) => step.title || "New Step"}
                                        renderItem={(step, _, updateStep) => (
                                            <div className="space-y-2">
                                                <TextField
                                                    label="Title"
                                                    value={step.title}
                                                    onChange={(v) => updateStep({ title: v })}
                                                />
                                                <TextArea
                                                    label="Description"
                                                    value={step.description}
                                                    onChange={(v) => updateStep({ description: v })}
                                                    rows={2}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Why Choose Us Section */}
                                <div className="space-y-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <h5 className="text-sm font-semibold text-orange-800">Why Choose Us</h5>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Section Title"
                                            value={item.details?.whyChooseUsTitle || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, whyChooseUsTitle: v }
                                            })}
                                        />
                                        <TextField
                                            label="Section Headline"
                                            value={item.details?.whyChooseUsHeadline || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, whyChooseUsHeadline: v }
                                            })}
                                        />
                                    </div>
                                    <ArrayEditor
                                        label="Reasons"
                                        items={item.details?.whyChooseUs || []}
                                        onChange={(whyChooseUs) => updateItem({
                                            details: { ...item.details, whyChooseUs }
                                        })}
                                        createNew={() => ({ title: "", description: "" })}
                                        itemLabel={(reason) => reason.title || "New Reason"}
                                        renderItem={(reason, _, updateReason) => (
                                            <div className="space-y-2">
                                                <TextField
                                                    label="Title"
                                                    value={reason.title}
                                                    onChange={(v) => updateReason({ title: v })}
                                                />
                                                <TextArea
                                                    label="Description"
                                                    value={reason.description}
                                                    onChange={(v) => updateReason({ description: v })}
                                                    rows={2}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-2">
                                    <h5 className="text-sm font-medium">Sidebar Contact</h5>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Title"
                                            value={item.details?.sidebar?.title || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, sidebar: { ...item.details?.sidebar, title: v } }
                                            })}
                                        />
                                        <TextField
                                            label="Description"
                                            value={item.details?.sidebar?.description || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, sidebar: { ...item.details?.sidebar, description: v } }
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* CTA Banner */}
                                <div className="space-y-2">
                                    <h5 className="text-sm font-medium">Bottom CTA Banner</h5>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Headline"
                                            value={item.details?.ctaBanner?.headline || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, ctaBanner: { ...item.details?.ctaBanner, headline: v } }
                                            })}
                                        />
                                        <TextField
                                            label="Subtext"
                                            value={item.details?.ctaBanner?.subtext || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, ctaBanner: { ...item.details?.ctaBanner, subtext: v } }
                                            })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextField
                                            label="Button 1 Text"
                                            value={item.details?.ctaBanner?.button1Text || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, ctaBanner: { ...item.details?.ctaBanner, button1Text: v } }
                                            })}
                                        />
                                        <TextField
                                            label="Button 2 Text"
                                            value={item.details?.ctaBanner?.button2Text || ""}
                                            onChange={(v) => updateItem({
                                                details: { ...item.details, ctaBanner: { ...item.details?.ctaBanner, button2Text: v } }
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
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
        </div>
    );
}
