import { Plus, RotateCcw, Trash2 } from 'lucide-react';
import { GeneratorOptions, PortfolioData } from '../types/portfolio';

interface PortfolioEditorProps {
  data: PortfolioData;
  options: GeneratorOptions;
  onChangeData: (next: PortfolioData) => void;
  onChangeOptions: (next: GeneratorOptions) => void;
  onReset: () => void;
}

export function PortfolioEditor({
  data,
  options,
  onChangeData,
  onChangeOptions,
  onReset,
}: PortfolioEditorProps) {
  const updateField = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    onChangeData({ ...data, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Build Configuration</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust output mode and Python modules
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold text-slate-700">
            Netlify Deployment Mode
          </legend>
          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="radio"
              name="deployMode"
              checked={options.deployMode === 'static-root'}
              onChange={() => onChangeOptions({ ...options, deployMode: 'static-root' })}
              className="mt-1 accent-[#0b6b62]"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">
                Static Root + Python SSG
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Commits built <span className="font-mono">index.html</span> in root alongside{' '}
                <span className="font-mono">build.py</span>. Keeps Netlify working with zero config
                while hitting ~46% Python.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="radio"
              name="deployMode"
              checked={options.deployMode === 'netlify-build'}
              onChange={() => onChangeOptions({ ...options, deployMode: 'netlify-build' })}
              className="mt-1 accent-[#0b6b62]"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">
                Netlify Auto-Build (<span className="font-mono">dist/</span> ignored)
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Netlify runs <span className="font-mono">python3 build.py --output dist</span> on
                push. Higher Python share (~54–60%) since compiled HTML stays out of Git.
              </div>
            </div>
          </label>
        </fieldset>

        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="text-xs font-semibold text-slate-700">Python Generator Modules</div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeSeoAudit}
              onChange={(e) =>
                onChangeOptions({ ...options, includeSeoAudit: e.target.checked })
              }
              className="mt-1 accent-[#0b6b62]"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">
                Include <span className="font-mono">seo_audit.py</span>
              </div>
              <div className="text-xs text-slate-600">
                Adds HTML accessibility/meta validation and generates{' '}
                <span className="font-mono">sitemap.xml</span>.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeJsonLd}
              onChange={(e) =>
                onChangeOptions({ ...options, includeJsonLd: e.target.checked })
              }
              className="mt-1 accent-[#0b6b62]"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">
                Emit Schema.org JSON-LD
              </div>
              <div className="text-xs text-slate-600">
                Generates structured Person metadata inside the compiled page head.
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Portfolio Content (<span className="font-mono text-sm">portfolio_data.py</span>)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-filled from your GitHub repository. Edits update the Python model and HTML output live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-700">Location</span>
            <input
              type="text"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-700">Netlify URL</span>
            <input
              type="url"
              value={data.netlifySiteUrl}
              onChange={(e) => updateField('netlifySiteUrl', e.target.value)}
              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-slate-700">Headline</span>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => updateField('headline', e.target.value)}
            className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-slate-700">About Me</span>
          <textarea
            rows={3}
            value={data.about}
            onChange={(e) => updateField('about', e.target.value)}
            className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
          />
        </label>

        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Projects</span>
            <button
              type="button"
              onClick={() =>
                updateField('projects', [
                  ...data.projects,
                  {
                    title: 'New Python Project',
                    description: 'Describe what this project builds and solves.',
                    role: 'My role: designed and implemented the application.',
                  },
                ])
              }
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0b6b62] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>

          <div className="space-y-3">
            {data.projects.map((project, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      const next = [...data.projects];
                      next[idx] = { ...project, title: e.target.value };
                      updateField('projects', next);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
                  />
                  {data.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'projects',
                          data.projects.filter((_, i) => i !== idx),
                        )
                      }
                      aria-label={`Remove ${project.title}`}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={project.description}
                  onChange={(e) => {
                    const next = [...data.projects];
                    next[idx] = { ...project, description: e.target.value };
                    updateField('projects', next);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
                />
                <input
                  type="text"
                  value={project.role}
                  onChange={(e) => {
                    const next = [...data.projects];
                    next[idx] = { ...project, role: e.target.value };
                    updateField('projects', next);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b6b62]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
