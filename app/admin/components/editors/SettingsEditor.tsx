"use client";

import {
    TextField,
    TextArea,
    ImageField,
    SectionCard,
    ArrayEditor,
} from "../ContentFields";

interface SettingsContent {
    companyName: string;
    tagline: string;
    logo: { text: string; fullText: string };
    contact: {
        phone: string;
        email: string;
        address: { line1: string; line2: string; line3: string };
        officeHours: string;
    };
    socialMedia: { linkedin: string; twitter: string };
    regionalOffices: Array<{
        city: string;
        country: string;
        image: string;
        address: string;
        email: string;
    }>;
    footer: {
        copyright: string;
        tagline: string;
        links: Array<{ label: string; url: string }>;
    };
    seo: {
        defaultTitle: string;
        defaultDescription: string;
        keywords: string;
    };
}

interface SettingsEditorProps {
    content: SettingsContent;
    onChange: (content: SettingsContent) => void;
}

export default function SettingsEditor({ content, onChange }: SettingsEditorProps) {
    const updateField = <K extends keyof SettingsContent>(
        key: K,
        value: SettingsContent[K]
    ) => {
        onChange({ ...content, [key]: value });
    };

    return (
        <div className="space-y-4">
            {/* Company Info */}
            <SectionCard title="Company Information" defaultOpen={true}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Company Name"
                        value={content.companyName}
                        onChange={(v) => updateField("companyName", v)}
                    />
                    <TextField
                        label="Tagline"
                        value={content.tagline}
                        onChange={(v) => updateField("tagline", v)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Logo Text (Short)"
                        value={content.logo.text}
                        onChange={(v) => updateField("logo", { ...content.logo, text: v })}
                        helpText="Single letter shown in logo icon"
                    />
                    <TextField
                        label="Logo Full Text"
                        value={content.logo.fullText}
                        onChange={(v) => updateField("logo", { ...content.logo, fullText: v })}
                    />
                </div>
            </SectionCard>

            {/* Contact Info */}
            <SectionCard title="Contact Information" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        label="Phone"
                        value={content.contact.phone}
                        onChange={(v) => updateField("contact", { ...content.contact, phone: v })}
                    />
                    <TextField
                        label="Email"
                        value={content.contact.email}
                        onChange={(v) => updateField("contact", { ...content.contact, email: v })}
                    />
                </div>
                <TextField
                    label="Address Line 1"
                    value={content.contact.address.line1}
                    onChange={(v) =>
                        updateField("contact", {
                            ...content.contact,
                            address: { ...content.contact.address, line1: v },
                        })
                    }
                />
                <TextField
                    label="Address Line 2"
                    value={content.contact.address.line2}
                    onChange={(v) =>
                        updateField("contact", {
                            ...content.contact,
                            address: { ...content.contact.address, line2: v },
                        })
                    }
                />
                <TextField
                    label="Address Line 3"
                    value={content.contact.address.line3}
                    onChange={(v) =>
                        updateField("contact", {
                            ...content.contact,
                            address: { ...content.contact.address, line3: v },
                        })
                    }
                />
                <TextField
                    label="Office Hours"
                    value={content.contact.officeHours}
                    onChange={(v) => updateField("contact", { ...content.contact, officeHours: v })}
                />
            </SectionCard>

            {/* Social Media */}
            <SectionCard title="Social Media" defaultOpen={false}>
                <TextField
                    label="LinkedIn URL"
                    value={content.socialMedia.linkedin}
                    onChange={(v) =>
                        updateField("socialMedia", { ...content.socialMedia, linkedin: v })
                    }
                />
                <TextField
                    label="Twitter URL"
                    value={content.socialMedia.twitter}
                    onChange={(v) =>
                        updateField("socialMedia", { ...content.socialMedia, twitter: v })
                    }
                />
            </SectionCard>

            {/* Regional Offices */}
            <SectionCard title="Regional Offices" defaultOpen={false}>
                <ArrayEditor
                    label="Offices"
                    items={content.regionalOffices}
                    onChange={(offices) => updateField("regionalOffices", offices)}
                    createNew={() => ({
                        city: "",
                        country: "",
                        image: "",
                        address: "",
                        email: "",
                    })}
                    itemLabel={(item) => item.city || "New Office"}
                    renderItem={(item, _, updateItem) => (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    label="City"
                                    value={item.city}
                                    onChange={(v) => updateItem({ city: v })}
                                />
                                <TextField
                                    label="Country"
                                    value={item.country}
                                    onChange={(v) => updateItem({ country: v })}
                                />
                            </div>
                            <TextField
                                label="Address"
                                value={item.address}
                                onChange={(v) => updateItem({ address: v })}
                            />
                            <TextField
                                label="Email"
                                value={item.email}
                                onChange={(v) => updateItem({ email: v })}
                            />
                            <ImageField
                                label="Image"
                                value={item.image}
                                onChange={(v) => updateItem({ image: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* Footer */}
            <SectionCard title="Footer" defaultOpen={false}>
                <TextField
                    label="Copyright Text"
                    value={content.footer.copyright}
                    onChange={(v) => updateField("footer", { ...content.footer, copyright: v })}
                />
                <TextField
                    label="Footer Tagline"
                    value={content.footer.tagline}
                    onChange={(v) => updateField("footer", { ...content.footer, tagline: v })}
                />
                <ArrayEditor
                    label="Footer Links"
                    items={content.footer.links}
                    onChange={(links) => updateField("footer", { ...content.footer, links })}
                    createNew={() => ({ label: "", url: "" })}
                    itemLabel={(item) => item.label || "New Link"}
                    renderItem={(item, _, updateItem) => (
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                label="Label"
                                value={item.label}
                                onChange={(v) => updateItem({ label: v })}
                            />
                            <TextField
                                label="URL"
                                value={item.url}
                                onChange={(v) => updateItem({ url: v })}
                            />
                        </div>
                    )}
                />
            </SectionCard>

            {/* SEO */}
            <SectionCard title="SEO Settings" defaultOpen={false}>
                <TextField
                    label="Default Page Title"
                    value={content.seo.defaultTitle}
                    onChange={(v) => updateField("seo", { ...content.seo, defaultTitle: v })}
                />
                <TextArea
                    label="Default Meta Description"
                    value={content.seo.defaultDescription}
                    onChange={(v) => updateField("seo", { ...content.seo, defaultDescription: v })}
                    rows={3}
                />
                <TextArea
                    label="Keywords"
                    value={content.seo.keywords}
                    onChange={(v) => updateField("seo", { ...content.seo, keywords: v })}
                    rows={2}
                    helpText="Comma-separated keywords"
                />
            </SectionCard>
        </div>
    );
}
