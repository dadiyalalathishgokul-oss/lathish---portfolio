import {
  GeneratedFile,
  GenerationResult,
  GeneratorOptions,
  LanguageBreakdownItem,
  PortfolioData,
} from '../types/portfolio';

const encoder = new TextEncoder();

function byteLength(text: string): number {
  return encoder.encode(text).length;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function pyString(value: string): string {
  return JSON.stringify(value);
}

function generateStylesCss(): string {
  return `:root {
  --bg: #f4f7f6;
  --surface: #e6eeeb;
  --ink: #13242b;
  --muted: #4d626a;
  --accent: #0b6b62;
  --line: #c3d3ce;
  --head: "Sora", "Trebuchet MS", sans-serif;
  --body: "DM Sans", "Segoe UI", Arial, sans-serif;
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0f1b20;
    --surface: #172a31;
    --ink: #e8f0ee;
    --muted: #9bb2ba;
    --accent: #5fd0c3;
    --line: #2a4149;
    color-scheme: dark;
  }
}

:root[data-theme="dark"] {
  --bg: #0f1b20;
  --surface: #172a31;
  --ink: #e8f0ee;
  --muted: #9bb2ba;
  --accent: #5fd0c3;
  --line: #2a4149;
  color-scheme: dark;
}

html {
  scroll-padding-top: env(safe-area-inset-top, 0px);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font: 400 1.0625rem / 1.65 var(--body);
}

main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
}

h1 {
  font: 800 clamp(2.3rem, 8vw, 4.6rem) / 1.05 var(--head);
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
}

h2 {
  font: 700 1.35rem / 1.2 var(--head);
  margin: 0;
}

h3 {
  font: 700 1.2rem / 1.3 var(--head);
  margin: 0 0 0.5rem;
}

p {
  margin: 0 0 1rem;
  max-width: 62ch;
}

a {
  color: var(--accent);
  text-underline-offset: 3px;
}

a:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.lead {
  font-size: 1.25rem;
  color: var(--muted);
  max-width: 40ch;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1.5rem;
  color: var(--muted);
}

section {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1rem 2rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--line);
}

header {
  padding-bottom: 2.5rem;
}

.bars {
  display: grid;
  gap: 1rem;
  max-width: 30rem;
}

.bar {
  display: grid;
  grid-template-columns: 7rem 1fr 3.5rem;
  align-items: center;
  gap: 0.75rem;
}

.track {
  height: 0.75rem;
  background: var(--surface);
  border-radius: 0.4rem;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--accent);
  border-radius: 0.4rem;
}

.bar b {
  font-family: var(--head);
  text-align: right;
}

.project {
  padding: 0 0 1.75rem 1.25rem;
  border-left: 4px solid var(--accent);
  margin-bottom: 1.75rem;
}

.project:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}

.role {
  color: var(--muted);
}

ul {
  margin: 0;
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.4rem;
}

@media (max-width: 640px) {
  section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .bar {
    grid-template-columns: 5.5rem 1fr 3rem;
  }
}
`;
}

function generateTemplateHtml(includeJsonLd: boolean): string {
  const jsonLdSlot = includeJsonLd ? `\n    $json_ld_block` : '';
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>$page_title</title>
    <meta name="description" content="$meta_description" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />$json_ld_marker
  </head>
  <body>
    <main>
      <header>
        <h1>$name</h1>
        <p class="lead">$headline</p>
        <div class="meta">
          <span>$location</span>
          <a href="mailto:$email">$email</a>
        </div>
      </header>

      <section>
        <h2>About me</h2>
        <div>
          <p>$about</p>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div>
          <p><strong>$institution</strong><br />$degree</p>
          <div class="bars" role="img" aria-label="$grades_aria_label">
            $grades_html
          </div>
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          $skills_html
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <div>
          $projects_html
        </div>
      </section>

      <section>
        <h2>Certifications</h2>
        <div>
          <p><strong>$certification_title</strong><br />$certification_dates</p>
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div>
          <p>$contact_text <a href="mailto:$email">Email me</a>.</p>
        </div>
      </section>
    </main>
  </body>
</html>
`.replace('$json_ld_marker', jsonLdSlot);
}

function generatePortfolioDataPy(data: PortfolioData): string {
  const gradesLines = data.grades
    .map(
      (g) =>
        `        SemesterGrade(label=${pyString(g.label)}, score=${g.score}, max_score=${g.maxScore}),`,
    )
    .join('\n');

  const skillsLines = data.skills.map((s) => `        ${pyString(s)},`).join('\n');

  const projectsLines = data.projects
    .map(
      (p) =>
        `        Project(\n            title=${pyString(p.title)},\n            description=${pyString(p.description)},\n            role=${pyString(p.role)},\n        ),`,
    )
    .join('\n');

  return `"""Structured portfolio content rendered by build.py."""

from dataclasses import dataclass
from typing import List


@dataclass(frozen=True)
class SemesterGrade:
    label: str
    score: float
    max_score: float = 10.0

    @property
    def percent(self) -> float:
        if self.max_score <= 0:
            return 0.0
        return round((self.score / self.max_score) * 100.0, 2)


@dataclass(frozen=True)
class Project:
    title: str
    description: str
    role: str


@dataclass(frozen=True)
class PortfolioProfile:
    name: str
    headline: str
    location: str
    email: str
    about: str
    institution: str
    degree: str
    grades: List[SemesterGrade]
    skills: List[str]
    projects: List[Project]
    certification_title: str
    certification_dates: str
    contact_text: str
    site_url: str


PORTFOLIO = PortfolioProfile(
    name=${pyString(data.name)},
    headline=${pyString(data.headline)},
    location=${pyString(data.location)},
    email=${pyString(data.email)},
    about=${pyString(data.about)},
    institution=${pyString(data.institution)},
    degree=${pyString(data.degree)},
    grades=[
${gradesLines}
    ],
    skills=[
${skillsLines}
    ],
    projects=[
${projectsLines}
    ],
    certification_title=${pyString(data.certificationTitle)},
    certification_dates=${pyString(data.certificationDates)},
    contact_text=${pyString(data.contactText)},
    site_url=${pyString(data.netlifySiteUrl)},
)
`;
}

function generateBuildPy(options: GeneratorOptions): string {
  const defaultOut = options.deployMode === 'netlify-build' ? 'dist' : '.';
  const auditImport = options.includeSeoAudit
    ? `from seo_audit import audit_rendered_html, build_sitemap_xml\n`
    : '';
  const auditStep = options.includeSeoAudit
    ? `
    if profile.site_url:
        sitemap_path = output_dir / "sitemap.xml"
        sitemap_path.write_text(build_sitemap_xml(profile.site_url), encoding="utf-8")

    warnings = audit_rendered_html(rendered)
    for warning in warnings:
        print(f"[audit] {warning}")
`
    : '';

  const jsonLdFn = options.includeJsonLd
    ? `def render_json_ld(profile: PortfolioProfile) -> str:
    payload = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profile.name,
        "description": profile.headline,
        "email": f"mailto:{profile.email}",
        "url": profile.site_url,
        "affiliation": {
            "@type": "CollegeOrUniversity",
            "name": profile.institution,
        },
        "knowsAbout": profile.skills,
    }
    raw_json = json.dumps(payload, indent=2, ensure_ascii=False)
    return f'<script type="application/ld+json">\\n{raw_json}\\n    </script>'


`
    : '';

  const jsonLdMapping = options.includeJsonLd
    ? `        "json_ld_block": render_json_ld(profile),\n`
    : '';

  return `"""Static site generator for Dadiyala Lathish Gokul's portfolio."""

from __future__ import annotations

import argparse
from html import escape
import json
from pathlib import Path
import shutil
from string import Template
from typing import Iterable

from portfolio_data import PORTFOLIO, PortfolioProfile, Project, SemesterGrade
${auditImport}

ROOT_DIR = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT_DIR / "templates" / "portfolio.html"
STYLES_PATH = ROOT_DIR / "styles.css"


def render_grade_bars(grades: Iterable[SemesterGrade]) -> str:
    rows = []
    for grade in grades:
        rows.append(
            '<div class="bar">'
            f"<span>{escape(grade.label)}</span>"
            '<div class="track">'
            f'<div class="fill" style="width:{grade.percent}%"></div>'
            "</div>"
            f"<b>{grade.score}</b>"
            "</div>"
        )
    return "\\n            ".join(rows)


def render_grades_aria(grades: list[SemesterGrade]) -> str:
    if len(grades) >= 2:
        first, last = grades[0], grades[-1]
        return (
            f"CGPA changed from {first.score} in {first.label} "
            f"to {last.score} in {last.label}, out of {last.max_score:g}"
        )
    if grades:
        only = grades[0]
        return f"CGPA {only.score} in {only.label}, out of {only.max_score:g}"
    return "Academic grade overview"


def render_skills(skills: Iterable[str]) -> str:
    return "\\n          ".join(f"<li>{escape(skill)}</li>" for skill in skills)


def render_projects(projects: Iterable[Project]) -> str:
    cards = []
    for project in projects:
        cards.append(
            '<article class="project">'
            f"<h3>{escape(project.title)}</h3>"
            f"<p>{escape(project.description)}</p>"
            f'<p class="role">{escape(project.role)}</p>'
            "</article>"
        )
    return "\\n          ".join(cards)


${jsonLdFn}def render_html(profile: PortfolioProfile, template_text: str) -> str:
    template = Template(template_text)
    return template.safe_substitute(
        {
            "page_title": escape(f"{profile.name} – Portfolio"),
            "meta_description": escape(profile.headline),
            "name": escape(profile.name),
            "headline": escape(profile.headline),
            "location": escape(profile.location),
            "email": escape(profile.email),
            "about": escape(profile.about),
            "institution": escape(profile.institution),
            "degree": escape(profile.degree),
            "grades_aria_label": escape(render_grades_aria(profile.grades)),
            "grades_html": render_grade_bars(profile.grades),
            "skills_html": render_skills(profile.skills),
            "projects_html": render_projects(profile.projects),
            "certification_title": escape(profile.certification_title),
            "certification_dates": escape(profile.certification_dates),
            "contact_text": escape(profile.contact_text),
${jsonLdMapping}        }
    )


def build_site(output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    template_text = TEMPLATE_PATH.read_text(encoding="utf-8")
    rendered = render_html(PORTFOLIO, template_text)

    index_file = output_dir / "index.html"
    index_file.write_text(rendered, encoding="utf-8")

    target_styles = output_dir / "styles.css"
    if STYLES_PATH.resolve() != target_styles.resolve():
        shutil.copyfile(STYLES_PATH, target_styles)
${auditStep}
    return index_file


def main() -> None:
    parser = argparse.ArgumentParser(description="Build static portfolio HTML.")
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT_DIR / "${defaultOut}",
        help="Target directory for built static assets.",
    )
    args = parser.parse_args()
    out_file = build_site(args.output)
    print(f"Built portfolio at {out_file}")


if __name__ == "__main__":
    main()
`;
}

function generateSeoAuditPy(): string {
  return `"""HTML accessibility, metadata, and sitemap helpers for build.py."""

from __future__ import annotations

from datetime import date
from html.parser import HTMLParser
from typing import List


class _StructureInspector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.has_title = False
        self.has_description = False
        self.h1_count = 0
        self.in_title = False
        self.title_text = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta" and attr_map.get("name") == "description":
            content = (attr_map.get("content") or "").strip()
            if content:
                self.has_description = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
            if self.title_text.strip():
                self.has_title = True

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_text += data


def audit_rendered_html(html_text: str) -> List[str]:
    inspector = _StructureInspector()
    inspector.feed(html_text)
    warnings: List[str] = []

    if not inspector.has_title:
        warnings.append("Missing non-empty <title> element.")
    if not inspector.has_description:
        warnings.append("Missing meta description tag.")
    if inspector.h1_count != 1:
        warnings.append(f"Expected exactly 1 <h1> heading, found {inspector.h1_count}.")
    return warnings


def build_sitemap_xml(site_url: str) -> str:
    clean_url = site_url.rstrip("/")
    today = date.today().isoformat()
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n'
        "  <url>\\n"
        f"    <loc>{clean_url}/</loc>\\n"
        f"    <lastmod>{today}</lastmod>\\n"
        "  </url>\\n"
        "</urlset>\\n"
    )
`;
}

function generateRenderedIndexHtml(
  data: PortfolioData,
  options: GeneratorOptions,
  inlineStyles: boolean,
  cssText: string,
): string {
  const gradesAria =
    data.grades.length >= 2
      ? `CGPA changed from ${data.grades[0].score} in ${data.grades[0].label} to ${data.grades[data.grades.length - 1].score} in ${data.grades[data.grades.length - 1].label}, out of ${data.grades[data.grades.length - 1].maxScore}`
      : data.grades.length === 1
        ? `CGPA ${data.grades[0].score} in ${data.grades[0].label}, out of ${data.grades[0].maxScore}`
        : 'Academic grade overview';

  const gradesHtml = data.grades
    .map((grade) => {
      const pct =
        grade.maxScore > 0 ? Math.round((grade.score / grade.maxScore) * 10000) / 100 : 0;
      return `<div class="bar"><span>${escapeHtml(grade.label)}</span><div class="track"><div class="fill" style="width:${pct}%"></div></div><b>${grade.score}</b></div>`;
    })
    .join('\n            ');

  const skillsHtml = data.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join('\n          ');

  const projectsHtml = data.projects
    .map(
      (p) =>
        `<article class="project"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p><p class="role">${escapeHtml(p.role)}</p></article>`,
    )
    .join('\n          ');

  const jsonLdBlock = options.includeJsonLd
    ? `\n    <script type="application/ld+json">\n${JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: data.name,
          description: data.headline,
          email: `mailto:${data.email}`,
          url: data.netlifySiteUrl,
          affiliation: {
            '@type': 'CollegeOrUniversity',
            name: data.institution,
          },
          knowsAbout: data.skills,
        },
        null,
        2,
      )}\n    </script>`
    : '';

  const styleTag = inlineStyles
    ? `<style>\n${cssText}\n    </style>`
    : `<link rel="stylesheet" href="styles.css" />`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${escapeHtml(`${data.name} – Portfolio`)}</title>
    <meta name="description" content="${escapeHtml(data.headline)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
    ${styleTag}${jsonLdBlock}
  </head>
  <body>
    <main>
      <header>
        <h1>${escapeHtml(data.name)}</h1>
        <p class="lead">${escapeHtml(data.headline)}</p>
        <div class="meta">
          <span>${escapeHtml(data.location)}</span>
          <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
        </div>
      </header>

      <section>
        <h2>About me</h2>
        <div>
          <p>${escapeHtml(data.about)}</p>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div>
          <p><strong>${escapeHtml(data.institution)}</strong><br />${escapeHtml(data.degree)}</p>
          <div class="bars" role="img" aria-label="${escapeHtml(gradesAria)}">
            ${gradesHtml}
          </div>
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          ${skillsHtml}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <div>
          ${projectsHtml}
        </div>
      </section>

      <section>
        <h2>Certifications</h2>
        <div>
          <p><strong>${escapeHtml(data.certificationTitle)}</strong><br />${escapeHtml(data.certificationDates)}</p>
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <div>
          <p>${escapeHtml(data.contactText)} <a href="mailto:${escapeHtml(data.email)}">Email me</a>.</p>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

function generateNetlifyToml(options: GeneratorOptions): string {
  if (options.deployMode === 'netlify-build') {
    return `[build]
  command = "python3 build.py --output dist"
  publish = "dist"

[build.environment]
  PYTHON_VERSION = "3.11"
`;
  }
  return `[build]
  command = "python3 build.py --output ."
  publish = "."

[build.environment]
  PYTHON_VERSION = "3.11"
`;
}

function generateGitignore(options: GeneratorOptions): string {
  const base = `__pycache__/
*.py[cod]
.DS_Store
`;
  if (options.deployMode === 'netlify-build') {
    return `${base}dist/
`;
  }
  return base;
}

function generateReadme(data: PortfolioData, options: GeneratorOptions): string {
  const outputHint = options.deployMode === 'netlify-build' ? 'dist/index.html' : 'index.html';
  return `# ${data.name} – Portfolio

Personal portfolio generated from structured Python data models (\`portfolio_data.py\`) and an HTML template (\`templates/portfolio.html\`) via \`build.py\`.

## Local Build

\`\`\`bash
python3 build.py
\`\`\`

This compiles the portfolio into \`${outputHint}\` with external styles in \`styles.css\`.

## Deployment

Configured via \`netlify.toml\` to build with Python 3 and publish automatically on Netlify.
`;
}

export function generateRepository(
  data: PortfolioData,
  options: GeneratorOptions,
): GenerationResult {
  const stylesCss = generateStylesCss();
  const templateHtml = generateTemplateHtml(options.includeJsonLd);
  const portfolioDataPy = generatePortfolioDataPy(data);
  const buildPy = generateBuildPy(options);
  const seoAuditPy = generateSeoAuditPy();
  const netlifyToml = generateNetlifyToml(options);
  const gitignore = generateGitignore(options);
  const readme = generateReadme(data, options);
  const committedIndexHtml = generateRenderedIndexHtml(data, options, false, stylesCss);
  const previewHtml = generateRenderedIndexHtml(data, options, true, stylesCss);

  const files: GeneratedFile[] = [
    {
      path: 'build.py',
      language: 'Python',
      content: buildPy,
      bytes: byteLength(buildPy),
      countedInLinguist: true,
      description: 'Python 3 static site generator compiling portfolio_data.py into HTML',
    },
    {
      path: 'portfolio_data.py',
      language: 'Python',
      content: portfolioDataPy,
      bytes: byteLength(portfolioDataPy),
      countedInLinguist: true,
      description: 'Dataclass definitions and structured portfolio content',
    },
  ];

  if (options.includeSeoAudit) {
    files.push({
      path: 'seo_audit.py',
      language: 'Python',
      content: seoAuditPy,
      bytes: byteLength(seoAuditPy),
      countedInLinguist: true,
      description: 'HTML structure audit and sitemap.xml generator',
    });
  }

  files.push({
    path: 'templates/portfolio.html',
    language: 'HTML',
    content: templateHtml,
    bytes: byteLength(templateHtml),
    countedInLinguist: true,
    description: 'Semantic HTML5 template populated by build.py',
  });

  if (options.deployMode === 'static-root') {
    files.push({
      path: 'index.html',
      language: 'HTML',
      content: committedIndexHtml,
      bytes: byteLength(committedIndexHtml),
      countedInLinguist: true,
      description: 'Built root HTML page for zero-config static hosting',
    });
  }

  files.push(
    {
      path: 'styles.css',
      language: 'CSS',
      content: stylesCss,
      bytes: byteLength(stylesCss),
      countedInLinguist: true,
      description: 'Extracted stylesheet (light & dark theme variables)',
    },
    {
      path: 'netlify.toml',
      language: 'Config',
      content: netlifyToml,
      bytes: byteLength(netlifyToml),
      countedInLinguist: false,
      description: 'Netlify Python build command and publish directory config',
    },
    {
      path: '.gitignore',
      language: 'Config',
      content: gitignore,
      bytes: byteLength(gitignore),
      countedInLinguist: false,
      description: 'Ignores Python bytecode and build artifacts',
    },
    {
      path: 'README.md',
      language: 'Markdown',
      content: readme,
      bytes: byteLength(readme),
      countedInLinguist: false,
      description: 'Repository documentation (excluded by GitHub Linguist)',
    },
  );

  let pythonBytes = 0;
  let htmlBytes = 0;
  let cssBytes = 0;

  for (const file of files) {
    if (!file.countedInLinguist) continue;
    if (file.language === 'Python') pythonBytes += file.bytes;
    if (file.language === 'HTML') htmlBytes += file.bytes;
    if (file.language === 'CSS') cssBytes += file.bytes;
  }

  const totalCountedBytes = pythonBytes + htmlBytes + cssBytes;
  const pct = (bytes: number) =>
    totalCountedBytes > 0 ? Math.round((bytes / totalCountedBytes) * 1000) / 10 : 0;

  const breakdown: LanguageBreakdownItem[] = [
    {
      language: 'Python',
      bytes: pythonBytes,
      percentage: pct(pythonBytes),
      color: '#3572A5',
    },
    {
      language: 'HTML',
      bytes: htmlBytes,
      percentage: pct(htmlBytes),
      color: '#e34c26',
    },
    {
      language: 'CSS',
      bytes: cssBytes,
      percentage: pct(cssBytes),
      color: '#563d7c',
    },
  ];

  return {
    files,
    breakdown,
    totalCountedBytes,
    previewHtml,
  };
}
