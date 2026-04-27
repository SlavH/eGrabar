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
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-4',
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
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>•</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>1.</button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded text-sm bg-white hover:bg-slate-100" disabled={!editor.can().undo()}>↩</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded text-sm bg-white hover:bg-slate-100" disabled={!editor.can().redo()}>↪</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}