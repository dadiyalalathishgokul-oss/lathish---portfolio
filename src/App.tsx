/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { FileExplorer } from './components/FileExplorer';
import { GitGuideView } from './components/GitGuideView';
import { LinguistBar } from './components/LinguistBar';
import { PortfolioEditor } from './components/PortfolioEditor';
import { PortfolioPreview } from './components/PortfolioPreview';
import { INITIAL_PORTFOLIO } from './data/initialPortfolio';
import { GeneratorOptions, PortfolioData } from './types/portfolio';
import { generateRepository } from './utils/generator';
import { buildZipBlob } from './utils/zipExport';

type WorkspaceTab = 'files' | 'preview' | 'configure' | 'deploy';

const DEFAULT_OPTIONS: GeneratorOptions = {
  deployMode: 'static-root',
  includeSeoAudit: true,
  includeJsonLd: true,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('files');
  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [options, setOptions] = useState<GeneratorOptions>(DEFAULT_OPTIONS);

  const generation = useMemo(
    () => generateRepository(portfolio, options),
    [portfolio, options],
  );

  const handleDownloadZip = () => {
    const blob = buildZipBlob(
      generation.files.map((file) => ({
        path: file.path,
        content: file.content,
      })),
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'portfolio-python-bundle.zip';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPortfolio(INITIAL_PORTFOLIO);
    setOptions(DEFAULT_OPTIONS);
  };

  const navItems: { id: WorkspaceTab; label: string }[] = [
    { id: 'files', label: 'Generated Files' },
    { id: 'preview', label: 'Live Preview' },
    { id: 'configure', label: 'Configure' },
    { id: 'deploy', label: 'Git Guide' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('files');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Portfolio Python Migrator
          </a>

          <nav
            aria-label="Workspace views"
            className="flex items-center gap-6 overflow-x-auto"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`py-5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#0b6b62] text-slate-900'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleDownloadZip}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0b6b62] hover:bg-[#095750] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Download Bundle (.zip)
          </button>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-balance">
              Convert 100% HTML Portfolio to Python Static Site Generator
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Source repository: <span className="font-mono">{portfolio.githubRepoUrl}</span>
              <span className="mx-2 text-slate-300" aria-hidden="true">
                ·
              </span>
              Live site: <span className="font-mono">{portfolio.netlifySiteUrl}</span>
            </p>
          </div>
        </div>

        <LinguistBar
          breakdown={generation.breakdown}
          totalCountedBytes={generation.totalCountedBytes}
        />

        {activeTab === 'files' && <FileExplorer files={generation.files} />}
        {activeTab === 'preview' && (
          <PortfolioPreview
            previewHtml={generation.previewHtml}
            netlifySiteUrl={portfolio.netlifySiteUrl}
          />
        )}
        {activeTab === 'configure' && (
          <PortfolioEditor
            data={portfolio}
            options={options}
            onChangeData={setPortfolio}
            onChangeOptions={setOptions}
            onReset={handleReset}
          />
        )}
        {activeTab === 'deploy' && (
          <GitGuideView
            repoUrl={portfolio.githubRepoUrl}
            netlifyUrl={portfolio.netlifySiteUrl}
            deployMode={options.deployMode}
          />
        )}
      </main>
    </div>
  );
}
