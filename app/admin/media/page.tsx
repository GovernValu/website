"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function MediaPage() {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setUploadedUrl(data.secure_url);
                toast.success("Image uploaded successfully!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to upload image");
            }
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files?.[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(uploadedUrl);
        toast.success("URL copied to clipboard");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif text-white">Media Library</h1>
                <p className="text-gray-400 mt-1">Upload and manage images via Cloudinary</p>
            </div>

            {/* Upload Area */}
            <div
                className={`bg-gray-800 rounded-xl border-2 border-dashed p-12 text-center transition-colors ${dragActive ? "border-brand bg-brand/5" : "border-gray-700"
                    }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />

                {uploading ? (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mb-4"></div>
                        <p className="text-gray-400">Uploading...</p>
                    </div>
                ) : (
                    <>
                        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-white mb-2">Drag and drop an image here</p>
                        <p className="text-gray-500 text-sm mb-4">or</p>
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                        >
                            Browse Files
                        </button>
                        <p className="text-gray-500 text-xs mt-4">
                            Supported formats: JPG, PNG, GIF, WebP
                        </p>
                    </>
                )}
            </div>

            {/* Last Uploaded */}
            {uploadedUrl && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-lg font-medium text-white mb-4">Last Uploaded</h2>
                    <div className="flex gap-6">
                        <img
                            src={uploadedUrl}
                            alt="Uploaded"
                            className="w-48 h-48 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                                Image URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={uploadedUrl}
                                    readOnly
                                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm"
                                />
                                <button
                                    onClick={copyUrl}
                                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                                Use this URL in your content or blog posts
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-medium mb-3">About Cloudinary</h3>
                <p className="text-gray-400 text-sm">
                    Images are uploaded to Cloudinary for optimized delivery. Cloudinary automatically:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Optimizes image quality and file size
                    </li>
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Serves images via global CDN
                    </li>
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Supports automatic format conversion (WebP, AVIF)
                    </li>
                </ul>
            </div>
        </div>
    );
}
