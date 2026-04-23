"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageBase from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback, useState, useRef } from "react";

const CustomImage = ImageBase.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute("width") ?? null,
        renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}),
      },
      style: {
        default: null,
        parseHTML: (el) => el.getAttribute("style") ?? null,
        renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}),
      },
    };
  },
});

function formatHtml(html: string): string {
  const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
  const TAB = "  ";
  let depth = 0;
  let out = "";
  for (const part of html.split(/(<[^>]*>)/g)) {
    if (!part) continue;
    if (!part.startsWith("<")) {
      const t = part.trim();
      if (t) out += TAB.repeat(depth) + t + "\n";
      continue;
    }
    const isClose = part.startsWith("</");
    const isSelf = part.endsWith("/>");
    const tag = (part.match(/^<\/?([a-z][a-z0-9]*)/i)?.[1] ?? "").toLowerCase();
    if (isClose) {
      depth = Math.max(0, depth - 1);
      out += TAB.repeat(depth) + part + "\n";
    } else if (isSelf || VOID.has(tag)) {
      out += TAB.repeat(depth) + part + "\n";
    } else {
      out += TAB.repeat(depth) + part + "\n";
      depth++;
    }
  }
  return out.trim();
}

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const B = ({
  onClick, active, title, children, danger,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`rte-btn${active ? " rte-btn-active" : ""}${danger ? " rte-btn-danger" : ""}`}
  >
    {children}
  </button>
);

const Sep = () => <div className="rte-toolbar-sep" />;

type ImgAlign = "" | "left" | "center" | "right";

interface ImgDlgState {
  open: boolean;
  src: string;
  width: string;
  align: ImgAlign;
  alt: string;
  isEdit: boolean;
}

const IMG_DLG_INIT: ImgDlgState = { open: false, src: "", width: "", align: "", alt: "", isEdit: false };

const ALIGN_OPTIONS: [ImgAlign, string][] = [
  ["", "Mặc định"],
  ["left", "◧ Trái"],
  ["center", "▣ Giữa"],
  ["right", "◨ Phải"],
];

export default function RichTextEditor({ value, onChange, placeholder = "Nhập nội dung..." }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      CustomImage.configure({ allowBase64: true, HTMLAttributes: { class: "rte-image" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) { onChange(editor.getHTML()); },
    editorProps: {
      attributes: { class: "rte-content" },
      handleClickOn(_view, _pos, node) {
        if (node.type.name === "image") {
          setTimeout(() => openImgDialogRef.current(true), 0);
          return false;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL liên kết:", prev ?? "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const imgFileRef = useRef<HTMLInputElement>(null);
  const [imgDlg, setImgDlg] = useState<ImgDlgState>(IMG_DLG_INIT);
  const openImgDialogRef = useRef<(edit?: boolean) => void>(() => {});

  const openImgDialog = useCallback((edit = false) => {
    if (!editor) return;
    if (edit && editor.isActive("image")) {
      const attrs = editor.getAttributes("image");
      const style = (attrs.style as string) ?? "";
      let align: ImgAlign = "";
      if (style.includes("float:left")) align = "left";
      else if (style.includes("float:right")) align = "right";
      else if (style.includes("margin:0 auto")) align = "center";
      setImgDlg({
        open: true,
        src: (attrs.src as string) ?? "",
        width: (attrs.width as string) ?? "",
        align,
        alt: (attrs.alt as string) ?? "",
        isEdit: true,
      });
    } else {
      setImgDlg({ ...IMG_DLG_INIT, open: true });
    }
  }, [editor]);

  // keep ref in sync so handleClickOn always calls latest
  useEffect(() => { openImgDialogRef.current = openImgDialog; }, [openImgDialog]);

  const confirmImg = useCallback(() => {
    if (!editor || !imgDlg.src) return;
    const style =
      imgDlg.align === "left" ? "float:left;margin:0 1em 0.5em 0" :
      imgDlg.align === "right" ? "float:right;margin:0 0 0.5em 1em" :
      imgDlg.align === "center" ? "display:block;margin:0 auto" : null;
    const attrs = {
      src: imgDlg.src,
      alt: imgDlg.alt || null,
      width: imgDlg.width || null,
      style,
      class: "rte-image",
    };
    if (imgDlg.isEdit) {
      editor.chain().focus().updateAttributes("image", attrs).run();
    } else {
      editor.chain().focus().setImage(attrs as { src: string }).run();
    }
    setImgDlg(IMG_DLG_INIT);
  }, [editor, imgDlg]);

  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState("");

  if (!editor) return null;

  const COLORS = ["#000000", "#374151", "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed", "#db2777", "#ffffff"];
  const HIGHLIGHTS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#e9d5ff", "#fed7aa"];

  return (
    <div className="rte-wrapper">
      {/* Row 1 */}
      <div className="rte-toolbar">
        <div className="rte-toolbar-group">
          <B title="Hoàn tác (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}>↩</B>
          <B title="Làm lại (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()}>↪</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Đoạn văn" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>¶</B>
          <B title="Tiêu đề H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</B>
          <B title="Tiêu đề H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</B>
          <B title="Tiêu đề H4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>H4</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="In đậm (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></B>
          <B title="In nghiêng (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></B>
          <B title="Gạch chân (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></B>
          <B title="Gạch ngang" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></B>
          <B title="Code inline" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>{"</>"}</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group rte-color-group">
          <span className="rte-label">Màu:</span>
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              className={`rte-color-dot rte-dot-${c.replace("#", "")}${editor.isActive("textStyle", { color: c }) ? " rte-color-dot-active" : ""}`}
              onClick={() => editor.chain().focus().setColor(c).run()}
            />
          ))}
          <B title="Xóa màu chữ" onClick={() => editor.chain().focus().unsetColor().run()}>✕</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group rte-color-group">
          <span className="rte-label">Nền:</span>
          {HIGHLIGHTS.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              className={`rte-color-dot rte-dot-${c.replace("#", "")}${editor.isActive("highlight", { color: c }) ? " rte-color-dot-active" : ""}`}
              onClick={() => editor.chain().focus().toggleHighlight({ color: c }).run()}
            />
          ))}
          <B title="Xóa nền" onClick={() => editor.chain().focus().unsetHighlight().run()}>✕</B>
        </div>
      </div>

      {/* Row 2 */}
      <div className="rte-toolbar">
        <div className="rte-toolbar-group">
          <B title="Căn trái" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>⬛︎L</B>
          <B title="Căn giữa" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>≡C</B>
          <B title="Căn phải" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>R⬛︎</B>
          <B title="Căn đều" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>≡J</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Danh sách gạch đầu dòng" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</B>
          <B title="Danh sách đánh số" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Trích dẫn" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo; Quote</B>
          <B title="Khối code" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"{ } Code"}</B>
          <B title="Đường kẻ ngang" onClick={() => editor.chain().focus().setHorizontalRule().run()}>― HR</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Thêm / sửa liên kết" active={editor.isActive("link")} onClick={setLink}>🔗 Link</B>
          <B title="Xóa liên kết" danger onClick={() => editor.chain().focus().unsetLink().run()}>🔗✕</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Chèn / chỉnh sửa hình ảnh" onClick={() => openImgDialog(false)}>🖼 Ảnh</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B title="Xóa định dạng" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>✦ Xóa định dạng</B>
        </div>
        <Sep />
        <div className="rte-toolbar-group">
          <B
            title="Xem / chỉnh sửa HTML"
            active={sourceMode}
            onClick={() => {
              if (!sourceMode) {
                setSourceHtml(formatHtml(editor.getHTML()));
                setSourceMode(true);
              } else {
                editor.commands.setContent(sourceHtml, { emitUpdate: false });
                onChange(sourceHtml);
                setSourceMode(false);
              }
            }}
          >
            &lt;/&gt; Source
          </B>
        </div>
      </div>

      {/* Contextual toolbar when image is selected */}
      {editor.isActive("image") && (
        <div className="rte-toolbar rte-image-toolbar">
          <span className="rte-label">🖼 Ảnh được chọn:</span>
          <Sep />
          <div className="rte-toolbar-group">
            <B title="Chỉnh sửa hình ảnh" onClick={() => openImgDialog(true)}>✏️ Chỉnh sửa</B>
            <B title="Xóa ảnh" danger onClick={() => editor.chain().focus().deleteSelection().run()}>🗑 Xóa</B>
          </div>
        </div>
      )}

      {sourceMode ? (
        <textarea
          className="rte-source-area"
          title="HTML source"
          value={sourceHtml}
          onChange={(e) => {
            setSourceHtml(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} className="rte-editor-area" />
      )}

      {/* Image insert / edit modal */}
      {imgDlg.open && (
        <div className="rte-modal-overlay" onClick={() => setImgDlg(IMG_DLG_INIT)}>
          <div className="rte-modal" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="rte-modal-header">
              <span>{imgDlg.isEdit ? "Chỉnh sửa hình ảnh" : "Chèn hình ảnh"}</span>
              <button type="button" className="rte-modal-close" onClick={() => setImgDlg(IMG_DLG_INIT)}>✕</button>
            </div>

            {/* Body */}
            <div className="rte-modal-body">

              {/* Left: controls */}
              <div className="rte-modal-col-left">
                <div className="rte-modal-field">
                  <label className="rte-modal-label">Upload từ máy tính</label>
                  <button type="button" className="rte-modal-upload-btn" onClick={() => imgFileRef.current?.click()}>
                    📁 Chọn file ảnh...
                  </button>
                  <input
                    ref={imgFileRef}
                    type="file"
                    accept="image/*"
                    className="rte-hidden-input"
                    aria-label="Chọn ảnh từ máy tính"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const src = ev.target?.result as string;
                        if (src) setImgDlg((d) => ({ ...d, src }));
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }}
                  />
                </div>

                <div className="rte-modal-field">
                  <label className="rte-modal-label">Hoặc nhập URL ảnh</label>
                  <input
                    type="url"
                    className="rte-modal-input"
                    placeholder="https://..."
                    value={imgDlg.src.startsWith("data:") ? "" : imgDlg.src}
                    onChange={(e) => setImgDlg((d) => ({ ...d, src: e.target.value }))}
                  />
                </div>

                <div className="rte-modal-field">
                  <label className="rte-modal-label">Văn bản thay thế (alt)</label>
                  <input
                    type="text"
                    className="rte-modal-input"
                    placeholder="Mô tả hình ảnh..."
                    value={imgDlg.alt}
                    onChange={(e) => setImgDlg((d) => ({ ...d, alt: e.target.value }))}
                  />
                </div>

                <div className="rte-modal-field">
                  <label className="rte-modal-label">Chiều rộng</label>
                  <div className="rte-modal-width-row">
                    <input
                      type="text"
                      className="rte-modal-input"
                      placeholder="100%, 300px, ..."
                      value={imgDlg.width}
                      onChange={(e) => setImgDlg((d) => ({ ...d, width: e.target.value }))}
                    />
                    <div className="rte-modal-width-presets">
                      {["25%", "50%", "75%", "100%"].map((w) => (
                        <button
                          key={w}
                          type="button"
                          className={`rte-modal-preset-btn${imgDlg.width === w ? " active" : ""}`}
                          onClick={() => setImgDlg((d) => ({ ...d, width: w }))}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rte-modal-field">
                  <label className="rte-modal-label">Căn chỉnh</label>
                  <div className="rte-modal-align-group">
                    {ALIGN_OPTIONS.map(([a, label]) => (
                      <button
                        key={a || "none"}
                        type="button"
                        className={`rte-modal-align-btn${imgDlg.align === a ? " active" : ""}`}
                        onClick={() => setImgDlg((d) => ({ ...d, align: a }))}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: preview */}
              <div className="rte-modal-col-right">
                <label className="rte-modal-label">Xem trước</label>
                <div className="rte-modal-preview">
                  {imgDlg.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imgDlg.src}
                      alt={imgDlg.alt || "preview"}
                      className="rte-modal-preview-img"
                    />
                  ) : (
                    <div className="rte-modal-preview-empty">
                      <span className="rte-modal-preview-icon">🖼</span>
                      <span className="rte-modal-preview-placeholder">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="rte-modal-footer">
              <button type="button" className="rte-modal-btn" onClick={() => setImgDlg(IMG_DLG_INIT)}>
                Hủy
              </button>
              <button
                type="button"
                className="rte-modal-btn rte-modal-btn-primary"
                disabled={!imgDlg.src}
                onClick={confirmImg}
              >
                {imgDlg.isEdit ? "Cập nhật ảnh" : "Chèn ảnh"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
