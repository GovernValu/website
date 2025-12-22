"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    company: string | null;
    inquiry: string;
    message: string | null;
    isRead: boolean;
    createdAt: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contacts");
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (error) {
            toast.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string, isRead: boolean) => {
        try {
            const res = await fetch(`/api/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isRead }),
            });
            if (res.ok) {
                setContacts(contacts.map((c) => (c.id === id ? { ...c, isRead } : c)));
                if (selectedContact?.id === id) {
                    setSelectedContact({ ...selectedContact, isRead });
                }
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this submission?")) return;

        try {
            const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Deleted");
                setContacts(contacts.filter((c) => c.id !== id));
                if (selectedContact?.id === id) {
                    setSelectedContact(null);
                }
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const filteredContacts = contacts.filter((contact) => {
        if (filter === "unread") return !contact.isRead;
        if (filter === "read") return contact.isRead;
        return true;
    });

    const unreadCount = contacts.filter((c) => !c.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white">Contact Submissions</h1>
                    <p className="text-gray-400 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "No new messages"}
                    </p>
                </div>
                <div className="flex gap-2">
                    {(["all", "unread", "read"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${filter === f
                                    ? "bg-brand text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
                </div>
            ) : filteredContacts.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-white font-medium mb-2">No submissions</h3>
                    <p className="text-gray-400 text-sm">Contact form submissions will appear here</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* List */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
                            {filteredContacts.map((contact) => (
                                <button
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedContact(contact);
                                        if (!contact.isRead) markAsRead(contact.id, true);
                                    }}
                                    className={`w-full text-left p-4 hover:bg-gray-750 transition-colors ${selectedContact?.id === contact.id ? "bg-gray-750" : ""
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            {!contact.isRead && (
                                                <div className="w-2 h-2 bg-brand rounded-full shrink-0" />
                                            )}
                                            <div>
                                                <p className={`font-medium ${contact.isRead ? "text-gray-300" : "text-white"}`}>
                                                    {contact.firstName} {contact.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500">{contact.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 truncate">
                                        {contact.inquiry}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detail */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        {selectedContact ? (
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-medium text-white">
                                            {selectedContact.firstName} {selectedContact.lastName}
                                        </h2>
                                        <p className="text-gray-400">{selectedContact.email}</p>
                                        {selectedContact.phone && (
                                            <p className="text-gray-500 text-sm">{selectedContact.phone}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => markAsRead(selectedContact.id, !selectedContact.isRead)}
                                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                                            title={selectedContact.isRead ? "Mark as unread" : "Mark as read"}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedContact.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                                            title="Delete"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {selectedContact.company && (
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Company</p>
                                            <p className="text-gray-300">{selectedContact.company}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Inquiry Type</p>
                                        <span className="inline-flex px-3 py-1 bg-brand/10 text-brand rounded text-sm">
                                            {selectedContact.inquiry}
                                        </span>
                                    </div>
                                    {selectedContact.message && (
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Message</p>
                                            <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Submitted</p>
                                        <p className="text-gray-300">
                                            {new Date(selectedContact.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-700">
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                <p>Select a submission to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
