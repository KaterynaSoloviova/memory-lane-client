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
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
const TiptapEditor = ({ content, onChange, onImageUpload }) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class:
              "border-l-4 border-[#CD853F] pl-4 py-2 bg-[#fdf9f4] italic text-[#8B4513]",
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
          style: "max-height: 400px; object-fit: contain;",
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#CD853F] underline hover:text-[#D2691E]",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your memory content...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote", "listItem"],
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

  const setLineHeight = (height) => {
    if (editor) {
      editor.chain().focus().setParagraph().run();
      editor.commands.updateAttributes('paragraph', { style: `line-height: ${height}` });
    }
  };

  const setParagraphSpacing = (spacing) => {
    if (editor) {
      editor.chain().focus().setParagraph().run();
      editor.commands.updateAttributes('paragraph', { style: `margin: ${spacing}px 0` });
    }
  };

  return (
    <div className="border-2 border-[#e8d5b7] rounded-lg bg-[#fefcf8] overflow-hidden">
      <div className="bg-gradient-to-r from-[#f8f3ec] to-[#fdf9f4] p-3 border-b border-[#e8d5b7]">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("bold")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("italic")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("bulletList")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("orderedList")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("blockquote")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("textAlign", { align: "left" })
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("textAlign", { align: "center" })
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("textAlign", { align: "right" })
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("textAlign", { align: "justify" })
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Justify Text"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={setLink}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              editor.isActive("link")
                ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white border-[#CD853F] shadow-md"
                : "bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            }`}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
            title="Upload Image"
            onClick={() => {
              if (onImageUpload) {
                onImageUpload((url) => {
                  if (editor && url) {
                    editor
                      .chain()
                      .focus()
                      .setImage({
                        src: url,
                        alt: "Uploaded image",
                      })
                      .run();
                  }
                });
              }
            }}
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F] disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border bg-white text-[#8B4513] border-[#e8d5b7] hover:bg-[#f8f3ec] hover:border-[#CD853F] disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          {/* Spacing Controls */}
          <div className="flex items-center gap-1 border-l border-[#e8d5b7] pl-2 ml-2">
            <span className="text-xs text-[#8B4513] font-medium">Line:</span>
            <select
              onChange={(e) => setLineHeight(e.target.value)}
              className="text-xs border border-[#e8d5b7] rounded px-2 py-1 bg-white text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
              title="Line Height"
            >
              <option value="1.2">1.2</option>
              <option value="1.4">1.4</option>
              <option value="1.6" selected>1.6</option>
              <option value="1.8">1.8</option>
              <option value="2.0">2.0</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-[#8B4513] font-medium">Space:</span>
            <select
              onChange={(e) => setParagraphSpacing(e.target.value)}
              className="text-xs border border-[#e8d5b7] rounded px-2 py-1 bg-white text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
              title="Paragraph Spacing"
            >
              <option value="4">Tight</option>
              <option value="8" selected>Normal</option>
              <option value="12">Loose</option>
              <option value="16">Very Loose</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="p-4 min-h-[150px] bg-white text-[#4A4A4A]" style={{fontFamily: 'Georgia, serif'}}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
