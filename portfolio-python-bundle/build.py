"""Static site generator for Dadiyala Lathish Gokul's portfolio."""

from __future__ import annotations

import argparse
from html import escape
import json
from pathlib import Path
import shutil
from string import Template
from typing import Iterable

from portfolio_data import PORTFOLIO, PortfolioProfile, Project, SemesterGrade
from seo_audit import audit_rendered_html, build_sitemap_xml


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
    return "\n            ".join(rows)


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
    return "\n          ".join(f"<li>{escape(skill)}</li>" for skill in skills)


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
    return "\n          ".join(cards)


def render_json_ld(profile: PortfolioProfile) -> str:
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
    return f'<script type="application/ld+json">\n{raw_json}\n    </script>'


def render_html(profile: PortfolioProfile, template_text: str) -> str:
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
        "json_ld_block": render_json_ld(profile),
        }
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

    if PORTFOLIO.site_url:
        sitemap_path = output_dir / "sitemap.xml"
        sitemap_path.write_text(build_sitemap_xml(PORTFOLIO.site_url), encoding="utf-8")

    warnings = audit_rendered_html(rendered)
    for warning in warnings:
        print(f"[audit] {warning}")

    return index_file


def main() -> None:
    parser = argparse.ArgumentParser(description="Build static portfolio HTML.")
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT_DIR / ".",
        help="Target directory for built static assets.",
    )
    args = parser.parse_args()
    out_file = build_site(args.output)
    print(f"Built portfolio at {out_file}")


if __name__ == "__main__":
    main()
