"use client";

import {
    TextField,
    TextArea,
    ImageField,
    LinkField,
    SectionCard,
    ArrayEditor,
} from "../ContentFields";

interface HomepageContent {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        ctaPrimary: { text: string; link: string };
        ctaSecondary: { text: string; link: string };
    };
    metrics: Array<{ value: string; label: string }>;
    expertise: {
        sectionTitle: string;
        headline: string;
        cards: Array<{
            icon: string;
            title: string;
            description: string;
            link: string;
        }>;
    };
    philosophy: {
        sectionTitle: string;
        headline: string;
        image: string;
        points: Array<{ title: string; description: string }>;
        link: { text: string; url: string };
    };
    testimonial: {
        quote: string;
        author: string;
        position: string;
    };
    contact: {
        headline: string;
        headlineHighlight: string;
        subtitle: string;
        info: {
            address: { label: string; value: string };
            phone: { label: string; value: string };
            email: { label: string; value: string };
        };
    };
}

interface HomepageEditorProps {
    content: HomepageContent;
    onChange: (content: HomepageContent) => void;
}

export default function HomepageEditor({ content, onChange }: HomepageEditorProps) {
    const updateField = <K extends keyof HomepageContent>(
        section: K,
        updates: Partial<HomepageContent[K]>
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
                    helpText="Small badge shown above the main title"
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
                        helpText="Displayed in accent color"
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.hero.subtitle}
                    onChange={(v) => updateField("hero", { subtitle: v })}
                    rows={2}
                />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3 p-3 bg-gray-750 rounded-lg">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Primary Button</span>
                        <TextField
                            label="Button Text"
                            value={content.hero.ctaPrimary.text}
                            onChange={(v) => updateField("hero", { ctaPrimary: { ...content.hero.ctaPrimary, text: v } })}
                        />
                        <TextField
                            label="Button Link"
                            value={content.hero.ctaPrimary.link}
                            onChange={(v) => updateField("hero", { ctaPrimary: { ...content.hero.ctaPrimary, link: v } })}
                        />
                    </div>
                    <div className="space-y-3 p-3 bg-gray-750 rounded-lg">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Secondary Button</span>
                        <TextField
                            label="Button Text"
                            value={content.hero.ctaSecondary.text}
                            onChange={(v) => updateField("hero", { ctaSecondary: { ...content.hero.ctaSecondary, text: v } })}
                        />
                        <TextField
                            label="Button Link"
                            value={content.hero.ctaSecondary.link}
                            onChange={(v) => updateField("hero", { ctaSecondary: { ...content.hero.ctaSecondary, link: v } })}
                        />
                    </div>
                </div>
            </SectionCard>

            {/* Metrics Section */}
            <SectionCard title="Metrics" defaultOpen={false}>
                <ArrayEditor
                    label="Metric Items"
                    items={content.metrics}
                    onChange={(metrics) => onChange({ ...content, metrics })}
                    createNew={() => ({ value: "", label: "" })}
                    itemLabel={(item) => item.label || "Unnamed metric"}
                    renderItem={(item, _, updateItem) => (
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                label="Value"
                                value={item.value}
                                onChange={(v) => updateItem({ value: v })}
                                placeholder="e.g., $8B+"
                            />
                            <TextField
                                label="Label"
                                value={item.label}
                                onChange={(v) => updateItem({ label: v })}
                                placeholder="e.g., Assets Advised"
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Expertise Section */}
            <SectionCard title="Expertise Section" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.expertise.sectionTitle}
                    onChange={(v) => updateField("expertise", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.expertise.headline}
                    onChange={(v) => updateField("expertise", { headline: v })}
                />
                <ArrayEditor
                    label="Expertise Cards"
                    items={content.expertise.cards}
                    onChange={(cards) => updateField("expertise", { cards })}
                    createNew={() => ({ icon: "building", title: "", description: "", link: "/about/expertise" })}
                    itemLabel={(item) => item.title || "Unnamed card"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="Icon"
                                    value={item.icon}
                                    onChange={(v) => updateItem({ icon: v })}
                                    helpText="building, chart, shield, users, bank, globe"
                                />
                                <TextField
                                    label="Link"
                                    value={item.link}
                                    onChange={(v) => updateItem({ link: v })}
                                />
                            </div>
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

            {/* Philosophy Section */}
            <SectionCard title="Philosophy Section" defaultOpen={false}>
                <TextField
                    label="Section Title"
                    value={content.philosophy.sectionTitle}
                    onChange={(v) => updateField("philosophy", { sectionTitle: v })}
                />
                <TextField
                    label="Headline"
                    value={content.philosophy.headline}
                    onChange={(v) => updateField("philosophy", { headline: v })}
                />
                <ImageField
                    label="Background Image"
                    value={content.philosophy.image}
                    onChange={(v) => updateField("philosophy", { image: v })}
                />
                <ArrayEditor
                    label="Key Points"
                    items={content.philosophy.points}
                    onChange={(points) => updateField("philosophy", { points })}
                    createNew={() => ({ title: "", description: "" })}
                    itemLabel={(item) => item.title || "Unnamed point"}
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
                <LinkField
                    label="Learn More Link"
                    textValue={content.philosophy.link.text}
                    urlValue={content.philosophy.link.url}
                    onTextChange={(v) => updateField("philosophy", { link: { ...content.philosophy.link, text: v } })}
                    onUrlChange={(v) => updateField("philosophy", { link: { ...content.philosophy.link, url: v } })}
                />
            </SectionCard>

            {/* Testimonial Section */}
            <SectionCard title="Testimonial" defaultOpen={false}>
                <TextArea
                    label="Quote"
                    value={content.testimonial.quote}
                    onChange={(v) => updateField("testimonial", { quote: v })}
                    rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Author Name"
                        value={content.testimonial.author}
                        onChange={(v) => updateField("testimonial", { author: v })}
                    />
                    <TextField
                        label="Position/Title"
                        value={content.testimonial.position}
                        onChange={(v) => updateField("testimonial", { position: v })}
                    />
                </div>
            </SectionCard>

            {/* Contact Section */}
            <SectionCard title="Contact Section" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Headline"
                        value={content.contact.headline}
                        onChange={(v) => updateField("contact", { headline: v })}
                    />
                    <TextField
                        label="Highlighted Text"
                        value={content.contact.headlineHighlight}
                        onChange={(v) => updateField("contact", { headlineHighlight: v })}
                    />
                </div>
                <TextArea
                    label="Subtitle"
                    value={content.contact.subtitle}
                    onChange={(v) => updateField("contact", { subtitle: v })}
                    rows={2}
                />
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 p-3 bg-gray-750 rounded-lg">
                        <span className="text-xs text-gray-400 uppercase">Address</span>
                        <TextField
                            label="Label"
                            value={content.contact.info.address.label}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, address: { ...content.contact.info.address, label: v } },
                                })
                            }
                        />
                        <TextField
                            label="Value"
                            value={content.contact.info.address.value}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, address: { ...content.contact.info.address, value: v } },
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2 p-3 bg-gray-750 rounded-lg">
                        <span className="text-xs text-gray-400 uppercase">Phone</span>
                        <TextField
                            label="Label"
                            value={content.contact.info.phone.label}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, phone: { ...content.contact.info.phone, label: v } },
                                })
                            }
                        />
                        <TextField
                            label="Value"
                            value={content.contact.info.phone.value}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, phone: { ...content.contact.info.phone, value: v } },
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2 p-3 bg-gray-750 rounded-lg">
                        <span className="text-xs text-gray-400 uppercase">Email</span>
                        <TextField
                            label="Label"
                            value={content.contact.info.email.label}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, email: { ...content.contact.info.email, label: v } },
                                })
                            }
                        />
                        <TextField
                            label="Value"
                            value={content.contact.info.email.value}
                            onChange={(v) =>
                                updateField("contact", {
                                    info: { ...content.contact.info, email: { ...content.contact.info.email, value: v } },
                                })
                            }
                        />
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}
