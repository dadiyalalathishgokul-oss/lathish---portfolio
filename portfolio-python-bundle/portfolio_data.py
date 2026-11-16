"""Structured portfolio content rendered by build.py."""

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
    name="Dadiyala Lathish Gokul",
    headline="Second-year B.Tech student in Computer Science and Engineering (AI & ML) at Jain University.",
    location="Tirupati, Andhra Pradesh",
    email="dadiyalalathishgokul@gmail.com",
    about="I’m looking for a fresher role or internship where I can apply my programming, data structures and algorithms, and project experience. I like solving problems, learning new things, and contributing to a team.",
    institution="Jain University",
    degree="B.Tech, Computer Science and Engineering (AI & ML), currently in 2nd year",
    grades=[
        SemesterGrade(label="Semester 1", score=7.05, max_score=10),
        SemesterGrade(label="Semester 2", score=7.862, max_score=10),
    ],
    skills=[
        "Data structures and algorithms",
        "Back-end and database development",
        "User interface design and development",
    ],
    projects=[
        Project(
            title="Jain Transit",
            description="A smart transportation website that helps students track college buses, view live bus timings, and find important transit information for easier travel.",
            role="My role: designed and contributed to the back end and the database.",
        ),
        Project(
            title="Wonderla Sentinel",
            description="An interactive, AI-powered experimental website that explores creative ideas, artificial intelligence, and new digital experiences.",
            role="My role: contributed to design and development, focusing on the user interface, interactive features, and a user-friendly experience.",
        ),
    ],
    certification_title="Data Structures and Algorithms (DSA) course and certificate",
    certification_dates="1 May 2025 – 7 August 2025",
    contact_text="Open to internships and entry-level roles.",
    site_url="https://portfolio-lathish.netlify.app",
)
