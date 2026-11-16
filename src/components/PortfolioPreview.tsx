import { useState } from 'react';
import { Monitor, Moon, Smartphone, Sun } from 'lucide-react';

interface PortfolioPreviewProps {
  previewHtml: string;
  netlifySiteUrl: string;
}

export function PortfolioPreview({ previewHtml, netlifySiteUrl }: PortfolioPreviewProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  const themedHtml = previewHtml.replace(
    '<html lang="en">',
    `<html lang="en" data-theme="${theme}">`,
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-200">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Rendered Portfolio Output Preview
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Target site: {netlifySiteUrl}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewport === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewport === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                theme === 'dark'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-6 flex justify-center">
        <iframe
          title="Portfolio Preview"
          srcDoc={themedHtml}
          sandbox="allow-same-origin"
          className={`bg-white border border-slate-200 rounded-lg transition-all duration-200 ${
            viewport === 'mobile' ? 'w-[390px] h-[680px]' : 'w-full h-[680px]'
          }`}
        />
      </div>
    </div>
  );
}
