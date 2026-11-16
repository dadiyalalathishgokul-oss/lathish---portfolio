import { ORIGINAL_FILENAME, ORIGINAL_HTML_BYTES } from '../data/initialPortfolio';
import { LanguageBreakdownItem } from '../types/portfolio';

interface LinguistBarProps {
  breakdown: LanguageBreakdownItem[];
  totalCountedBytes: number;
}

export function LinguistBar({ breakdown, totalCountedBytes }: LinguistBarProps) {
  const pythonEntry = breakdown.find((item) => item.language === 'Python');
  const pythonPct = pythonEntry?.percentage ?? 0;
  const meetsTarget = pythonPct >= 40;

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            GitHub Linguist Language Breakdown
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            GitHub calculates repository languages by UTF-8 byte share of recognized source files.
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-500">Current Repo</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">100.0% HTML</div>
          </div>
          <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
          <div className="text-right">
            <div className="text-xs text-slate-500">Projected Python Share</div>
            <div
              className={`text-lg font-bold tabular-nums ${
                meetsTarget ? 'text-[#0b6b62]' : 'text-amber-700'
              }`}
            >
              {pythonPct.toFixed(1)}% Python
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
        <div>
          <div className="flex items-baseline justify-between text-xs text-slate-600 mb-2">
            <span className="font-medium text-slate-800">Before (Current Repository)</span>
            <span className="font-mono tabular-nums">
              {ORIGINAL_FILENAME} · {ORIGINAL_HTML_BYTES.toLocaleString()} B
            </span>
          </div>
          <div
            className="h-3 w-full rounded-md overflow-hidden bg-slate-100 flex"
            role="img"
            aria-label="Before: 100% HTML"
          >
            <div className="h-full w-full bg-[#e34c26]" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#e34c26]" aria-hidden="true" />
              <span className="font-medium text-slate-800">HTML</span>
              <span className="font-mono tabular-nums">100.0%</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between text-xs text-slate-600 mb-2">
            <span className="font-medium text-slate-800">After (Python SSG Bundle)</span>
            <span className="font-mono tabular-nums">
              {totalCountedBytes.toLocaleString()} counted B
            </span>
          </div>
          <div
            className="h-3 w-full rounded-md overflow-hidden bg-slate-100 flex gap-px"
            role="img"
            aria-label={breakdown
              .map((item) => `${item.language} ${item.percentage}%`)
              .join(', ')}
          >
            {breakdown.map((item) => (
              <div
                key={item.language}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full transition-all duration-200"
                title={`${item.language}: ${item.percentage}% (${item.bytes} bytes)`}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
            {breakdown.map((item) => (
              <span key={item.language} className="inline-flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-800">{item.language}</span>
                <span className="font-mono tabular-nums">
                  {item.percentage.toFixed(1)}% ({item.bytes.toLocaleString()} B)
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {!meetsTarget && (
        <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5">
          Python share is currently below 40%. Enable the SEO Audit module or switch Deploy Mode to
          Netlify Auto-Build in the Configuration tab to increase Python share above 45%.
        </p>
      )}
    </section>
  );
}
