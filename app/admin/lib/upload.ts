const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Upload an image to the media library (Cloudinary) and return its secure URL. Throws with a readable message. */
export async function uploadImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error("File size must be less than 10MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.status === 401) {
        throw new Error("Your session has expired. Please sign in again.");
    }
    if (!res.ok) {
        throw new Error("Failed to upload image. Please try again.");
    }

    const data = await res.json();
    return data.secure_url as string;
}
