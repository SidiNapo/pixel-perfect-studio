import { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Heading1,
  Heading2,
  Quote,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { icon: 'separator' },
    { icon: Heading1, command: 'formatBlock', value: 'h1', title: 'Heading 1' },
    { icon: Heading2, command: 'formatBlock', value: 'h2', title: 'Heading 2' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
    { icon: 'separator' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: 'separator' },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { icon: 'separator' },
    {
      icon: Link,
      command: 'createLink',
      title: 'Insert Link',
      onClick: () => {
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
      },
    },
    { icon: Code, command: 'formatBlock', value: 'pre', title: 'Code Block' },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-input">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-secondary/30">
        {toolbarButtons.map((btn, i) =>
          btn.icon === 'separator' ? (
            <div key={i} className="w-px h-6 bg-border mx-1" />
          ) : (
            <Button
              key={i}
              type="button"
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={() =>
                btn.onClick
                  ? btn.onClick()
                  : execCommand(btn.command!, btn.value)
              }
              title={btn.title}
            >
              <btn.icon className="w-4 h-4" />
            </Button>
          )
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 text-foreground focus:outline-none prose prose-invert max-w-none
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3
          [&_p]:mb-4 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic
          [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
          [&_a]:text-primary [&_a]:underline"
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
