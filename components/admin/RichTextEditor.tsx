"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = "Start writing your content..." }: RichTextEditorProps) {
    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-brand underline hover:text-brand-dark",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-lg prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when prop changes (e.g., from AI generation)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="h-64 bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    const ToolbarButton = ({
        onClick,
        isActive = false,
        children,
        title
    }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded transition-colors ${isActive
                ? "bg-brand text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
        >
            {children}
        </button>
    );

    const addLink = () => {
        const url = prompt("Enter URL:");
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Header with View Toggle */}
            <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2 bg-gray-900/50">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setViewMode("edit")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${viewMode === "edit" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("preview")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${viewMode === "preview" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                    </button>
                </div>
                <span className="text-xs text-gray-500">
                    {editor.storage.characterCount?.characters?.() || content.length} characters
                </span>
            </div>

            {viewMode === "edit" ? (
                <>
                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-700 bg-gray-900/30 flex-wrap">
                        {/* Text Style */}
                        <div className="flex items-center gap-0.5 pr-2 border-r border-gray-700">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                isActive={editor.isActive("bold")}
                                title="Bold (Ctrl+B)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                                    <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                isActive={editor.isActive("italic")}
                                title="Italic (Ctrl+I)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="19" y1="4" x2="10" y2="4" />
                                    <line x1="14" y1="20" x2="5" y2="20" />
                                    <line x1="15" y1="4" x2="9" y2="20" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                isActive={editor.isActive("underline")}
                                title="Underline (Ctrl+U)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" />
                                    <line x1="4" y1="21" x2="20" y2="21" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                isActive={editor.isActive("strike")}
                                title="Strikethrough"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M16 4H9a3 3 0 00-3 3v1a3 3 0 003 3h6a3 3 0 013 3v1a3 3 0 01-3 3H7" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                </svg>
                            </ToolbarButton>
                        </div>

                        {/* Headings */}
                        <div className="flex items-center gap-0.5 px-2 border-r border-gray-700">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                isActive={editor.isActive("heading", { level: 2 })}
                                title="Heading 2"
                            >
                                <span className="text-sm font-bold">H2</span>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                isActive={editor.isActive("heading", { level: 3 })}
                                title="Heading 3"
                            >
                                <span className="text-sm font-bold">H3</span>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setParagraph().run()}
                                isActive={editor.isActive("paragraph")}
                                title="Paragraph"
                            >
                                <span className="text-sm">P</span>
                            </ToolbarButton>
                        </div>

                        {/* Lists */}
                        <div className="flex items-center gap-0.5 px-2 border-r border-gray-700">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                isActive={editor.isActive("bulletList")}
                                title="Bullet List"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                    <line x1="8" y1="12" x2="21" y2="12" />
                                    <line x1="8" y1="18" x2="21" y2="18" />
                                    <circle cx="4" cy="6" r="1" fill="currentColor" />
                                    <circle cx="4" cy="12" r="1" fill="currentColor" />
                                    <circle cx="4" cy="18" r="1" fill="currentColor" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                isActive={editor.isActive("orderedList")}
                                title="Numbered List"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="10" y1="6" x2="21" y2="6" />
                                    <line x1="10" y1="12" x2="21" y2="12" />
                                    <line x1="10" y1="18" x2="21" y2="18" />
                                    <text x="3" y="7" fontSize="6" fill="currentColor">1</text>
                                    <text x="3" y="13" fontSize="6" fill="currentColor">2</text>
                                    <text x="3" y="19" fontSize="6" fill="currentColor">3</text>
                                </svg>
                            </ToolbarButton>
                        </div>

                        {/* Alignment */}
                        <div className="flex items-center gap-0.5 px-2 border-r border-gray-700">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                                isActive={editor.isActive({ textAlign: "left" })}
                                title="Align Left"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="15" y2="12" />
                                    <line x1="3" y1="18" x2="18" y2="18" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                                isActive={editor.isActive({ textAlign: "center" })}
                                title="Align Center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="6" y1="12" x2="18" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                                isActive={editor.isActive({ textAlign: "right" })}
                                title="Align Right"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="9" y1="12" x2="21" y2="12" />
                                    <line x1="6" y1="18" x2="21" y2="18" />
                                </svg>
                            </ToolbarButton>
                        </div>

                        {/* Block Elements */}
                        <div className="flex items-center gap-0.5 px-2 border-r border-gray-700">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                isActive={editor.isActive("blockquote")}
                                title="Blockquote"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M10 11l-4 4V7l4 4zm8 0l-4 4V7l4 4z" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                isActive={false}
                                title="Horizontal Rule"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                </svg>
                            </ToolbarButton>
                        </div>

                        {/* Link */}
                        <div className="flex items-center gap-0.5 px-2">
                            <ToolbarButton
                                onClick={addLink}
                                isActive={editor.isActive("link")}
                                title="Add Link"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                                </svg>
                            </ToolbarButton>
                            {editor.isActive("link") && (
                                <ToolbarButton
                                    onClick={() => editor.chain().focus().unsetLink().run()}
                                    isActive={false}
                                    title="Remove Link"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M18.84 12.25l1.72-1.71a5 5 0 00-7.07-7.07l-3 3A5 5 0 0010 13" />
                                        <line x1="2" y1="2" x2="22" y2="22" />
                                    </svg>
                                </ToolbarButton>
                            )}
                        </div>

                        {/* Undo/Redo */}
                        <div className="flex items-center gap-0.5 ml-auto">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().undo().run()}
                                isActive={false}
                                title="Undo (Ctrl+Z)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M3 10h10a5 5 0 015 5v2" />
                                    <polyline points="3 10 7 6 3 10 7 14" />
                                </svg>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().redo().run()}
                                isActive={false}
                                title="Redo (Ctrl+Shift+Z)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M21 10h-10a5 5 0 00-5 5v2" />
                                    <polyline points="21 10 17 6 21 10 17 14" />
                                </svg>
                            </ToolbarButton>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="bg-gray-900 min-h-[400px]">
                        <EditorContent editor={editor} />
                    </div>
                </>
            ) : (
                /* Preview Mode */
                <div className="p-6 bg-white min-h-[450px]">
                    <article
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-700 bg-gray-900/30">
                <p className="text-xs text-gray-500">
                    💡 Tip: Use keyboard shortcuts - <strong>Ctrl+B</strong> bold, <strong>Ctrl+I</strong> italic, <strong>Ctrl+Z</strong> undo
                </p>
            </div>
        </div>
    );
}
