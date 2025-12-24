"use client";

import Link from "next/link";

const pages = [
    {
        id: "homepage",
        name: "Homepage",
        description: "Main landing page with hero, metrics, expertise, and contact sections",
        lastEdited: "Just now",
    },
    {
        id: "services",
        name: "Services",
        description: "Service offerings and detailed service pages",
        lastEdited: "Just now",
    },
    {
        id: "industries",
        name: "Industries",
        description: "Industry sectors and expertise areas",
        lastEdited: "Just now",
    },
    {
        id: "partners",
        name: "Partners",
        description: "Strategic partners and alliances",
        lastEdited: "Just now",
    },
    {
        id: "about",
        name: "About - Who We Are",
        description: "Company narrative, timeline, and values",
        lastEdited: "Just now",
    },
    {
        id: "board",
        name: "About - Board",
        description: "Board of Directors, Message, and Principles",
        lastEdited: "Just now",
    },
    {
        id: "philosophy",
        name: "About - Philosophy",
        description: "Our core beliefs, approach, and commitments",
        lastEdited: "Just now",
    },
    {
        id: "expertise",
        name: "About - Expertise",
        description: "Expertise areas, client types, and standards",
        lastEdited: "Just now",
    },
    {
        id: "teams",
        name: "About - Teams",
        description: "Leadership, culture, and capabilities",
        lastEdited: "Just now",
    },
    {
        id: "contact",
        name: "Contact",
        description: "Contact form, office information, and FAQ",
        lastEdited: "Just now",
    },
    {
        id: "settings",
        name: "Site Settings",
        description: "Global settings, company info, social links, and footer",
        lastEdited: "Just now",
    },
];

export default function PagesListPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-white">Pages</h1>
                <p className="text-gray-400 mt-1">Manage content for all website pages</p>
            </div>

            {/* Pages Grid */}
            <div className="grid gap-4">
                {pages.map((page) => (
                    <Link
                        key={page.id}
                        href={`/admin/pages/${page.id}`}
                        className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors border border-gray-700 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">{page.name}</h3>
                                <p className="text-sm text-gray-400">{page.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">{page.lastEdited}</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-medium mb-2">How it works</h3>
                <p className="text-gray-400 text-sm">
                    Each page content is stored in a JSON file. When you edit and save, the changes are written to the file
                    and will be reflected on the live website immediately. The content includes text, images, and links.
                </p>
            </div>
        </div>
    );
}
