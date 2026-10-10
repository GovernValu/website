const CLOUDINARY_UPLOAD = "/image/upload/";

/**
 * Serve a Cloudinary upload resized to `width` in the best format the browser
 * accepts (WebP/AVIF). Local paths and other hosts are returned unchanged.
 */
export function optimizedImage(url: string | undefined, width: number): string {
    if (!url) return "";
    const at = url.indexOf(CLOUDINARY_UPLOAD);
    if (!url.includes("res.cloudinary.com") || at === -1) return url;

    const head = url.slice(0, at + CLOUDINARY_UPLOAD.length);
    const rest = url.slice(at + CLOUDINARY_UPLOAD.length);
    // Leave URLs that already carry a transformation alone.
    if (/^[a-z]{1,3}_[^/]*\//.test(rest)) return url;

    return `${head}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}
