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
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white ckeditor-wrapper prose-custom">
      <style jsx global>{`
        .ckeditor-wrapper .ck-editor__editable {
          min-height: 150px;
          padding: 12px 16px;
        }
        /* Fix text color and direction */
        .ck-content {
          color: #334155 !important;
          text-align: left !important;
          direction: ltr !important;
        }
        .ck-content h1, .ck-content h2, .ck-content h3 {
          font-weight: bold;
          margin: 1rem 0;
        }
        .ck-content p {
          margin-bottom: 1rem;
        }
        .ck-content img {
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
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
