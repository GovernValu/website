import sanitizeHtml from "sanitize-html";

const allowedTags = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "ul",
    "ol",
    "li",
    "blockquote",
    "h2",
    "h3",
    "h4",
    "hr",
    "a",
];

export function sanitizeCmsHtml(value: string | null | undefined): string {
    return sanitizeHtml(value || "", {
        allowedTags,
        allowedAttributes: {
            a: ["href", "target", "rel"],
            "*": ["dir", "style"],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedStyles: {
            "*": {
                "text-align": [/^(left|right|center|justify)$/],
            },
        },
        transformTags: {
            a: (_tagName, attribs) => ({
                tagName: "a",
                attribs: {
                    ...attribs,
                    rel: "noopener noreferrer",
                },
            }),
        },
    });
}

export function cmsHtmlToText(value: string | null | undefined): string {
    return sanitizeHtml(value || "", {
        allowedTags: [],
        allowedAttributes: {},
    }).replace(/\s+/g, " ").trim();
}
