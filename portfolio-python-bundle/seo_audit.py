"""HTML accessibility, metadata, and sitemap helpers for build.py."""

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
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        "  <url>\n"
        f"    <loc>{clean_url}/</loc>\n"
        f"    <lastmod>{today}</lastmod>\n"
        "  </url>\n"
        "</urlset>\n"
    )
