"use client";

import { useState } from "react";

export default function HomeContactForm({ t }: { t: any }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        inquiryType: "General Inquiry",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    company: "",
                    email: "",
                    phone: "",
                    inquiryType: "General Inquiry",
                    message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center animate-fade-in">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-lg font-bold mb-2">{t.successTitle || "Message Sent"}</h4>
                <p className="text-sm">{t.successMessage || "We will get back to you shortly."}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-green-700 font-semibold hover:underline text-sm"
                >
                    {t.sendAnother || "Send Another Message"}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500">{t.firstName}</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-gray-200 px-4 py-3 text-onyx focus:border-brand outline-none transition-colors"
                        placeholder="John"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500">{t.lastName}</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-gray-200 px-4 py-3 text-onyx focus:border-brand outline-none transition-colors"
                        placeholder="Doe"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">{t.companyName}</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-onyx focus:border-brand outline-none transition-colors"
                    placeholder="Organization Name"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">{t.emailAddress}</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-onyx focus:border-brand outline-none transition-colors"
                    placeholder="john@company.com"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">{t.inquiryDetails}</label>
                <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-onyx resize-none focus:border-brand outline-none transition-colors"
                    placeholder="How may we assist you?"
                />
            </div>
            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-onyx text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-brand transition-colors duration-300 disabled:opacity-50"
            >
                {status === "submitting" ? (t.sending || "Sending...") : t.requestConsultation}
            </button>

            {status === "error" && (
                <p className="text-red-500 text-sm text-center">{t.errorMessage || "Something went wrong. Please try again."}</p>
            )}
        </form>
    );
}
