export interface SemesterGrade {
  label: string;
  score: number;
  maxScore: number;
}

export interface PortfolioProject {
  title: string;
  description: string;
  role: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  location: string;
  email: string;
  about: string;
  institution: string;
  degree: string;
  grades: SemesterGrade[];
  skills: string[];
  projects: PortfolioProject[];
  certificationTitle: string;
  certificationDates: string;
  contactText: string;
  githubRepoUrl: string;
  netlifySiteUrl: string;
}

export type DeployMode = 'static-root' | 'netlify-build';

export interface GeneratorOptions {
  deployMode: DeployMode;
  includeSeoAudit: boolean;
  includeJsonLd: boolean;
}

export type FileLanguage = 'Python' | 'HTML' | 'CSS' | 'Config' | 'Markdown';

export interface GeneratedFile {
  path: string;
  language: FileLanguage;
  content: string;
  bytes: number;
  countedInLinguist: boolean;
  description: string;
}

export interface LanguageBreakdownItem {
  language: 'Python' | 'HTML' | 'CSS';
  bytes: number;
  percentage: number;
  color: string;
}

export interface GenerationResult {
  files: GeneratedFile[];
  breakdown: LanguageBreakdownItem[];
  totalCountedBytes: number;
  previewHtml: string;
}
