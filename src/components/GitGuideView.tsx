import { useState } from 'react';
import { Check, Copy, ShieldAlert } from 'lucide-react';
import { ORIGINAL_FILENAME } from '../data/initialPortfolio';
import { DeployMode } from '../types/portfolio';

interface GitGuideViewProps {
  repoUrl: string;
  netlifyUrl: string;
  deployMode: DeployMode;
}

export function GitGuideView({ repoUrl, netlifyUrl, deployMode }: GitGuideViewProps) {
  const [copied, setCopied] = useState(false);

  const commands = `# 1. Clone your portfolio repository
git clone ${repoUrl}
cd portfolio

# 2. Remove the old single-file HTML that caused 100% HTML on GitHub
git rm "${ORIGINAL_FILENAME}"

# 3. Extract the downloaded portfolio-python-bundle.zip into this folder
#    (Overwrite/add build.py, portfolio_data.py, templates/, styles.css, netlify.toml)

# 4. Run the Python static site generator locally to verify
python3 build.py

# 5. Commit and push to GitHub
git add .
git commit -m "Convert portfolio to Python static site generator"
git push origin main`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700 space-y-1">
          <div className="font-semibold text-slate-900">
            Security note about GitHub repository access
          </div>
          <p>
            Do not share your GitHub password or Personal Access Token in chat. Download the
            ready-to-push ZIP bundle using the button in the top bar and push it directly from
            your machine or upload the files in GitHub’s web interface.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Push Commands for Your Repository
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target repository: <span className="font-mono">{repoUrl}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0b6b62]" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Commands
              </>
            )}
          </button>
        </div>

        <pre className="bg-[#0f172a] text-slate-100 rounded-lg p-4 overflow-x-auto font-mono text-xs leading-6">
          {commands}
        </pre>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-semibold text-slate-900">
          Keeping Netlify (<span className="font-mono text-sm">{netlifyUrl}</span>) Online
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>
            Removing <span className="font-mono text-xs">{ORIGINAL_FILENAME}</span> and replacing it
            with <span className="font-mono text-xs">index.html</span> (or{' '}
            <span className="font-mono text-xs">dist/index.html</span>) makes your root URL load
            automatically on Netlify.
          </li>
          <li>
            The included <span className="font-mono text-xs">netlify.toml</span> configures Netlify
            to run{' '}
            <span className="font-mono text-xs">
              {deployMode === 'netlify-build'
                ? 'python3 build.py --output dist'
                : 'python3 build.py --output .'}
            </span>{' '}
            with Python 3.11 on every push.
          </li>
          <li>
            Wait 1–2 minutes after pushing to <span className="font-mono text-xs">main</span> for
            GitHub’s Linguist bar to refresh from 100% HTML to your new Python-led language mix.
          </li>
        </ol>
      </div>
    </div>
  );
}
