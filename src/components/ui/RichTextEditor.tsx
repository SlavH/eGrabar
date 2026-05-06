'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { uploadImageAdapter } from '@/lib/ckeditorUploadAdapter';

const CKEditorComponent = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor),
  { ssr: false }
);

let ClassicEditor: any;
async function loadEditor() {
  if (!ClassicEditor) {
    const mod = await import('@ckeditor/ckeditor5-build-classic');
    ClassicEditor = mod.default;
  }
  return ClassicEditor;
}

export default function RichTextEditor({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  const editorRef = useRef<any>(null);
  const [Editor, setEditor] = useState<any>(null);

  useEffect(() => {
    loadEditor().then((ed) => {
      setEditor(() => ed);
    });
  }, []);

  const handleReady = useCallback((editor: any) => {
    editorRef.current = editor;
    
    // @ts-ignore
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadImageAdapter(loader);
    };

    if (value) editor.setData(value);
    if (placeholder) {
      editor.ui.view.editable.element?.setAttribute('placeholder', placeholder);
    }
  }, [value, placeholder]);

  const handleChange = useCallback((_event: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  }, [onChange]);

  if (!Editor) {
    return <div className="h-48 bg-slate-50 border border-slate-200 rounded-lg animate-pulse" />;
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white ckeditor-wrapper">
      <style jsx global>{`
        .ckeditor-wrapper .ck-editor__editable {
          min-height: 150px;
          padding: 12px 16px;
        }
        .ckeditor-wrapper .ck-editor__editable[placeholder]:empty::before {
          content: attr(placeholder);
          color: #9ca3af;
          float: left;
          pointer-events: none;
        }
        .ckeditor-wrapper .ck.ck-toolbar {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
          background: #fff;
        }
      `}</style>
      <CKEditorComponent
        editor={Editor}
        data={value}
        onReady={handleReady}
        onChange={handleChange}
      />
    </div>
  );
}
