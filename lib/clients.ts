/* eslint-disable @typescript-eslint/no-explicit-any */

// Client sectors and ordering, shared by the public clients page and the admin portal.

export interface ClientSector {
    id: string;
    en: string;
    ar: string;
}

// Checked in order; the first match on the English "field" wins.
const SECTOR_RULES: (ClientSector & { match: RegExp })[] = [
    { id: "education", en: "Education", ar: "التعليم", match: /[Ee]ducat|[Uu]niversit|[Ss]chool|EdTech|[Aa]cadem|[Aa]ccreditation|[Tt]raining/ },
    { id: "real-estate", en: "Real Estate", ar: "العقارات", match: /[Rr]eal [Ee]state|[Pp]ropert|[Mm]ega [Pp]roject|[Vv]illa/ },
    { id: "hospitality", en: "Hospitality", ar: "الضيافة", match: /[Hh]otel|[Hh]ospitality|[Tt]ourism/ },
    { id: "marketing", en: "Marketing & Media", ar: "التسويق والإعلام", match: /[Aa]dvertis|[Mm]arketing|[Mm]edia/ },
    { id: "technology", en: "Technology", ar: "التكنولوجيا", match: /[Tt]echnolog|[Dd]igital|[Ss]oftware|[Oo]doo|\bIT\b/ },
    { id: "retail", en: "Retail & Trade", ar: "التجزئة والتجارة", match: /[Rr]etail|[Ww]holesale|[Hh]ypermarket|[Ss]upermarket|E-[Cc]ommerce|[Tt]rading/ },
    { id: "industry", en: "Energy & Industry", ar: "الطاقة والصناعة", match: /[Mm]anufactur|[Ff]actory|[Dd]airy|\b[Oo]il\b|\b[Gg]as\b|[Ee]nergy|[Ii]ndustr/ },
    { id: "investment", en: "Investment & Finance", ar: "الاستثمار والتمويل", match: /[Ii]nvest|[Ff]inanc|[Hh]olding|[Aa]cquisition|[Cc]apital|[Bb]ank/ },
    { id: "nonprofit", en: "Non-profit", ar: "القطاع غير الربحي", match: /\bNGO\b|[Nn]on-?profit|[Cc]harit/ },
    { id: "consulting", en: "Consulting", ar: "الاستشارات", match: /[Cc]onsult|[Qq]uality|[Cc]onformity|[Aa]dvisory|[Bb]usiness [Dd]evelopment/ },
];

export const OTHER_SECTOR: ClientSector = { id: "other", en: "Other", ar: "أخرى" };

export const CLIENT_SECTORS: ClientSector[] = [
    ...SECTOR_RULES.map(({ id, en, ar }) => ({ id, en, ar })),
    OTHER_SECTOR,
];

export const sectorById = (id: string | undefined) =>
    CLIENT_SECTORS.find((sector) => sector.id === id) ?? OTHER_SECTOR;

/** Best-guess sector from the English industry text. */
export function inferSector(field: unknown): string {
    const text = typeof field === "string" ? field : "";
    return SECTOR_RULES.find((rule) => rule.match.test(text))?.id ?? OTHER_SECTOR.id;
}

/** The sector chosen in the portal, or the detected one. Pass the bilingual (English) item. */
export const clientSector = (client: any): string =>
    typeof client?.sector === "string" && client.sector ? client.sector : inferSector(client?.field);

/**
 * When a client was added: the date saved by the portal, else the upload time
 * Cloudinary embeds in the logo URL (`/upload/v<unix seconds>/`). Null for
 * older clients whose logos are local files.
 */
export function clientAddedAt(client: any): Date | null {
    if (typeof client?.addedAt === "string") {
        const date = new Date(client.addedAt);
        if (!Number.isNaN(date.getTime())) return date;
    }
    const version = typeof client?.logo === "string" ? client.logo.match(/\/upload\/(?:[^/]*\/)*v(\d{9,11})\//) : null;
    return version ? new Date(Number(version[1]) * 1000) : null;
}

export type ClientsOrder = "newest" | "custom";

/** "newest" unless the portal switched the page to a custom (drag-and-drop) order. */
export const clientsOrderOf = (record: any): ClientsOrder => (record?.clientsOrder === "custom" ? "custom" : "newest");

/**
 * Website order. Newest first: dated clients by date (most recent first), then
 * older undated clients in their saved order. Custom: the saved order.
 */
export function sortClients<T>(clients: T[], order: ClientsOrder): T[] {
    if (order === "custom") return clients;
    return clients
        .map((client, index) => ({ client, index, time: clientAddedAt(client)?.getTime() ?? null }))
        .sort((a, b) => {
            if (a.time !== null && b.time !== null) return b.time - a.time || a.index - b.index;
            if (a.time !== null) return -1;
            if (b.time !== null) return 1;
            return a.index - b.index;
        })
        .map(({ client }) => client);
}

/** Order the list for the website and attach each client's sector. */
export function prepareClients(clients: any[], record: any): any[] {
    return sortClients(clients, clientsOrderOf(record)).map((client) => ({ ...client, sector: clientSector(client) }));
}
