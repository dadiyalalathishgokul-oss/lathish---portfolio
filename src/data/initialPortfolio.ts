import { PortfolioData } from '../types/portfolio';

export const ORIGINAL_HTML_BYTES = 4984;
export const ORIGINAL_FILENAME = 'Dadiyala Lathish Gokul – Portfolio.html';

export const INITIAL_PORTFOLIO: PortfolioData = {
  name: 'Dadiyala Lathish Gokul',
  headline:
    'Second-year B.Tech student in Computer Science and Engineering (AI & ML) at Jain University.',
  location: 'Tirupati, Andhra Pradesh',
  email: 'dadiyalalathishgokul@gmail.com',
  about:
    'I’m looking for a fresher role or internship where I can apply my programming, data structures and algorithms, and project experience. I like solving problems, learning new things, and contributing to a team.',
  institution: 'Jain University',
  degree: 'B.Tech, Computer Science and Engineering (AI & ML), currently in 2nd year',
  grades: [
    { label: 'Semester 1', score: 7.05, maxScore: 10 },
    { label: 'Semester 2', score: 7.862, maxScore: 10 },
  ],
  skills: [
    'Data structures and algorithms',
    'Back-end and database development',
    'User interface design and development',
  ],
  projects: [
    {
      title: 'Jain Transit',
      description:
        'A smart transportation website that helps students track college buses, view live bus timings, and find important transit information for easier travel.',
      role: 'My role: designed and contributed to the back end and the database.',
    },
    {
      title: 'Wonderla Sentinel',
      description:
        'An interactive, AI-powered experimental website that explores creative ideas, artificial intelligence, and new digital experiences.',
      role: 'My role: contributed to design and development, focusing on the user interface, interactive features, and a user-friendly experience.',
    },
  ],
  certificationTitle: 'Data Structures and Algorithms (DSA) course and certificate',
  certificationDates: '1 May 2025 – 7 August 2025',
  contactText: 'Open to internships and entry-level roles.',
  githubRepoUrl: 'https://github.com/dadiyalalathishgokul-oss/portfolio.git',
  netlifySiteUrl: 'https://portfolio-lathish.netlify.app',
};
