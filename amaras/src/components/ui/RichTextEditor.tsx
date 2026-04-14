'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder }: { value: string, onChange: (value: string) => void, placeholder?: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'border border-slate-200 rounded-lg p-4 bg-white min-h-[150px] [&_p]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return <div className="h-32 bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap border-b border-slate-200 pb-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-blue-100' : 'bg-white'}`}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-blue-100' : 'bg-white'}`}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100' : 'bg-white'}`}>H1</button>
      </div>
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}
