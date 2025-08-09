import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import ImageUpload from "../components/ImageUpload";

const TiptapEditor = ({ content, onChange }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class:
              "border-l-4 border-[#5A7D1A] pl-4 py-2 bg-base-200/50 italic",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-inside space-y-1",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-inside space-y-1",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "ml-4",
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-md",
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      Color,
      TextStyle,
      Highlight,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if(content.length == 0) {
    editor.commands.clearContent()
  }

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div>
      <div className="bg-base-200 p-2 border-b border-base-300">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("bold")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("bold")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("italic")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("italic")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("bulletList")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("bulletList")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("orderedList")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("orderedList")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("blockquote")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("blockquote")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("textAlign", { align: "left" })
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("textAlign", { align: "left" })
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("textAlign", { align: "center" })
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("textAlign", { align: "center" })
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("textAlign", { align: "right" })
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("textAlign", { align: "right" })
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={setLink}
            className={`btn btn-sm transition-all duration-200 ${
              editor.isActive("link")
                ? "text-white border-none shadow-md"
                : "btn-ghost hover:bg-base-300"
            }`}
            style={
              editor.isActive("link")
                ? {
                    background: "linear-gradient(135deg, #5A7D1A, #d89d20)",
                  }
                : {}
            }
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              title="Upload Image"
              onClick={() => setShowImageUpload(!showImageUpload)}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            {showImageUpload && (
              <div className="absolute top-full left-0 mt-2 z-50 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 min-w-[300px]">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold">Upload Image</h4>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => setShowImageUpload(false)}
                  >
                    ✕
                  </button>
                </div>
                <ImageUpload
                  onUploadSuccess={(url) => {
                    if (editor) {
                      editor
                        .chain()
                        .focus()
                        .setImage({
                          src: url,
                          alt: "Uploaded image",
                        })
                        .run();
                    }
                    setShowImageUpload(false);
                  }}
                  compact={true}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="btn btn-sm btn-ghost disabled:opacity-50"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="btn btn-sm btn-ghost disabled:opacity-50"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-gray-300 p-4 rounded min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
