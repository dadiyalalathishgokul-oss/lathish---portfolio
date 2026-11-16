import { useState } from 'react';
import { Check, Copy, Download, FileCode2, FileText } from 'lucide-react';
import { GeneratedFile } from '../types/portfolio';

interface FileExplorerProps {
  files: GeneratedFile[];
}

export function FileExplorer({ files }: FileExplorerProps) {
  const [selectedPath, setSelectedPath] = useState<string>(files[0]?.path ?? 'build.py');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const activeFile = files.find((f) => f.path === selectedPath) ?? files[0];

  const handleCopy = async (file: GeneratedFile) => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopiedPath(file.path);
      window.setTimeout(() => setCopiedPath(null), 1800);
    } catch {
      setCopiedPath(null);
    }
  };

  const handleDownloadSingle = (file: GeneratedFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = file.path.split('/').pop() ?? 'file.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const lines = activeFile ? activeFile.content.split('\n') : [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[290px_1fr] min-h-[580px]">
      <aside className="border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/70 p-4">
        <div className="text-xs font-semibold text-slate-500 px-2 pb-3">
          Generated Repository Files ({files.length})
        </div>
        <nav aria-label="Generated repository files" className="space-y-1">
          {files.map((file) => {
            const isSelected = activeFile?.path === file.path;
            return (
              <button
                key={file.path}
                type="button"
                onClick={() => setSelectedPath(file.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-white border border-slate-200 text-slate-900 font-medium'
                    : 'text-slate-700 hover:bg-white/70 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {file.language === 'Markdown' || file.language === 'Config' ? (
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <FileCode2 className="w-4 h-4 text-[#0b6b62] shrink-0" />
                  )}
                  <span className="font-mono text-xs truncate">{file.path}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 tabular-nums shrink-0">
                  {file.bytes} B
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {activeFile && (
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-200 bg-white">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono font-semibold text-slate-900 truncate">
                  {activeFile.path}
                </span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span className="text-xs text-slate-600">{activeFile.language}</span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span className="text-xs font-mono text-slate-600 tabular-nums">
                  {activeFile.bytes.toLocaleString()} bytes
                </span>
                {!activeFile.countedInLinguist && (
                  <>
                    <span className="text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-xs text-slate-500">Excluded from Linguist bar</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{activeFile.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCopy(activeFile)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedPath === activeFile.path ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0b6b62]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadSingle(activeFile)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                Save File
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-[#0f172a] text-slate-100 p-4">
            <table className="w-full border-collapse font-mono text-xs leading-6">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="select-none text-right pr-4 text-slate-500 tabular-nums w-10 align-top">
                      {index + 1}
                    </td>
                    <td className="whitespace-pre text-slate-100">{line || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
