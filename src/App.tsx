import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Save, 
  Copy, 
  Download, 
  Trash2, 
  FileCode, 
  Eye, 
  Maximize2, 
  Minimize2,
  Bold,
  Italic,
  List,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Quote
} from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';

const DEFAULT_MARKDOWN = `# SYSTEM_INIT: CyberMark v1.0
## STATUS: ONLINE

Welcome to **CyberMark**, the advanced markdown editor for professionals.

### Features
- [x] Real-time Preview
- [x] Syntax Highlighting
- [x] Cyber-aesthetic Interface
- [ ] World Domination (Pending)

\`\`\`javascript
function hackThePlanet() {
  console.log("Access Granted.");
  return true;
}
\`\`\`

> "Security is not a product, but a process." - Bruce Schneier

| Command | Description | Status |
|---------|-------------|--------|
| CTRL+S  | Save        | Active |
| CTRL+C  | Copy        | Active |

Start typing to override system protocols...
`;

export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor'); // Mobile only
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cybermark_content');
    if (saved) setMarkdown(saved);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cybermark_content', markdown);
  }, [markdown]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    // In a real app, we'd show a toast here
    alert('SYSTEM: Content copied to clipboard.');
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybermark_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('WARNING: Purge all data? This action cannot be undone.')) {
      setMarkdown('');
    }
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);
    
    setMarkdown(newText);
    
    // Reset focus and cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-cyber-black' : ''}`}>
      {/* Header */}
      <header className="border-b border-cyber-gray bg-cyber-dark p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="text-cyber-green w-6 h-6" />
          <h1 className="font-mono text-xl font-bold tracking-tighter text-white">
            CYBER<span className="text-cyber-green">MARK</span>
          </h1>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyber-gray text-cyber-green text-xs font-mono border border-cyber-green-dim">
            v1.0.4
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-cyber-gray rounded text-gray-400 hover:text-white transition-colors hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <a 
            href="https://github.com/QMS85/cybermark" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-gray-500 hover:text-cyber-green font-mono mr-2 hidden sm:block"
          >
            [SOURCE_CODE]
          </a>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-cyber-gray bg-cyber-black p-2 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <ToolbarButton icon={<Bold size={16} />} label="Bold" onClick={() => insertText('**', '**')} />
        <ToolbarButton icon={<Italic size={16} />} label="Italic" onClick={() => insertText('*', '*')} />
        <ToolbarButton icon={<Heading1 size={16} />} label="Heading" onClick={() => insertText('# ')} />
        <div className="w-px h-6 bg-cyber-gray mx-1" />
        <ToolbarButton icon={<List size={16} />} label="List" onClick={() => insertText('- ')} />
        <ToolbarButton icon={<Quote size={16} />} label="Quote" onClick={() => insertText('> ')} />
        <ToolbarButton icon={<Code size={16} />} label="Code" onClick={() => insertText('`', '`')} />
        <div className="w-px h-6 bg-cyber-gray mx-1" />
        <ToolbarButton icon={<LinkIcon size={16} />} label="Link" onClick={() => insertText('[', '](url)')} />
        <ToolbarButton icon={<ImageIcon size={16} />} label="Image" onClick={() => insertText('![alt](', ')')} />
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2 ml-4">
          <ActionButton icon={<Copy size={16} />} label="Copy" onClick={handleCopy} />
          <ActionButton icon={<Download size={16} />} label="Save" onClick={handleDownload} />
          <ActionButton icon={<Trash2 size={16} />} label="Clear" onClick={handleClear} danger />
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="sm:hidden flex border-b border-cyber-gray">
        <button 
          className={`flex-1 py-3 font-mono text-sm flex items-center justify-center gap-2 ${activeTab === 'editor' ? 'text-cyber-green border-b-2 border-cyber-green bg-cyber-gray/20' : 'text-gray-500'}`}
          onClick={() => setActiveTab('editor')}
        >
          <FileCode size={16} /> EDITOR
        </button>
        <button 
          className={`flex-1 py-3 font-mono text-sm flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'text-cyber-green border-b-2 border-cyber-green bg-cyber-gray/20' : 'text-gray-500'}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={16} /> PREVIEW
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Editor Pane */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 flex flex-col bg-cyber-black/80 backdrop-blur-sm ${activeTab === 'preview' ? 'hidden sm:flex' : 'flex'}`}
        >
          <div className="bg-cyber-gray/30 px-4 py-1 text-xs font-mono text-gray-500 flex justify-between items-center border-b border-cyber-gray border-dashed">
            <span>INPUT_STREAM</span>
            <span>{markdown.length} BYTES</span>
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full bg-transparent text-gray-300 font-mono p-4 resize-none focus:outline-none focus:ring-0 text-sm leading-relaxed selection:bg-cyber-green-dim selection:text-white"
            placeholder="Initiate sequence..."
            spellCheck={false}
          />
        </motion.div>

        {/* Divider (Desktop) */}
        <div className="w-px bg-cyber-gray hidden sm:block" />

        {/* Preview Pane */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`flex-1 flex flex-col bg-cyber-black/50 backdrop-blur-sm ${activeTab === 'editor' ? 'hidden sm:flex' : 'flex'}`}
        >
          <div className="bg-cyber-gray/30 px-4 py-1 text-xs font-mono text-gray-500 flex justify-between items-center border-b border-cyber-gray border-dashed">
            <span>RENDER_OUTPUT</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" /> LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 markdown-preview">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-gray bg-cyber-dark p-2 text-xs font-mono text-gray-600 flex justify-between items-center">
        <div>SYSTEM_READY</div>
        <div className="flex gap-4">
          <span>MEM: {Math.round(markdown.length / 1024 * 100) / 100} KB</span>
          <span>Ln {markdown.split('\n').length}, Col {markdown.length}</span>
        </div>
      </footer>
    </div>
  );
}

function ToolbarButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded hover:bg-cyber-gray text-gray-400 hover:text-cyber-green transition-colors"
      title={label}
    >
      {icon}
    </button>
  );
}

function ActionButton({ icon, label, onClick, danger }: { icon: React.ReactNode, label: string, onClick: () => void, danger?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all
        ${danger 
          ? 'bg-red-900/20 text-red-500 hover:bg-red-900/40 border border-red-900/50' 
          : 'bg-cyber-gray text-cyber-green hover:bg-cyber-green/10 border border-cyber-green-dim'
        }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
