import { sanitizeCmsHtml } from "@/lib/html";
import type { HTMLAttributes } from "react";

interface CmsRichTextProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    html: string | null | undefined;
}

export default function CmsRichText({ html, className = "", ...props }: CmsRichTextProps) {
    return (
        <div
            {...props}
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(html) }}
        />
    );
}
