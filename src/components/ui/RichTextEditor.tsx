'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import React, { useEffect, useState } from 'react';

export default function RichTextEditor({ value, onChange, placeholder }: { value: string, onChange: (value: string) => void, placeholder?: string }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
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

  const addLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  if (!editor) return <div className="h-32 bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-200 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>•</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>1.</button>
        <button type="button" onClick={() => setShowLinkInput(!showLinkInput)} className={`px-2 py-1 rounded text-sm ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100'}`}>🔗</button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 rounded text-sm bg-white hover:bg-slate-100">↩</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 rounded text-sm bg-white hover:bg-slate-100">↪</button>
      </div>
      
      {showLinkInput && (
        <div className="flex gap-2 p-2 border-b border-slate-200 bg-slate-50">
          <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." className="flex-1 px-2 py-1 text-sm border rounded" />
          <button type="button" onClick={addLink} className="px-2 py-1 text-sm bg-blue-600 text-white rounded">Add</button>
          <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="px-2 py-1 text-sm bg-red-500 text-white rounded">Remove</button>
        </div>
      )}
      
      <EditorContent editor={editor} />
    </div>
  );
}