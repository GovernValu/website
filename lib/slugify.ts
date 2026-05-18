export function slugifyAr(input: string): string {
    return input
        .normalize("NFKC")
        .replace(/[ً-ٰٟ]/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^ء-ي٠-٩a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 120);
}
