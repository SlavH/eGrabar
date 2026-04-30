declare module '@ckeditor/ckeditor5-react' {
  import { Component } from 'react';
  interface CKEditorProps {
    editor: any;
    data?: string;
    onReady?: (editor: any) => void;
    onChange?: (event: any, editor: any) => void;
    onBlur?: (event: any, editor: any) => void;
    onFocus?: (event: any, editor: any) => void;
    onError?: (error: Error) => void;
    disabled?: boolean;
    config?: Record<string, any>;
  }
  export class CKEditor extends Component<CKEditorProps> {}
}

declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditorBuild: any;
  export default ClassicEditorBuild;
}
