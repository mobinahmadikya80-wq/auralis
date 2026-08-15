import * as yaml from 'js-yaml';

/**
 * Generic Markdown + YAML-frontmatter loader.
 *
 * All editable site content lives as one `.md` file per item under
 * `src/content/<collection>/`. Each file has a YAML frontmatter block
 * (edited by Decap CMS as form fields) followed by an optional Markdown
 * body (edited by Decap CMS as the rich-text/body field).
 *
 * `import.meta.glob` is resolved by Vite at BUILD TIME, so this works in
 * a 100% static site with no server: every file that exists in the repo
 * when `npm run build` runs gets bundled into the output.
 */

export interface ParsedContentFile<T> {
  slug: string;
  data: T;
  body: string;
}

function parseFrontmatter<T>(raw: string, slug: string): ParsedContentFile<T> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    // No frontmatter block found — treat the whole file as body with empty data.
    return { slug, data: {} as T, body: raw.trim() };
  }
  const [, frontmatter, body] = match;
  const data = (yaml.load(frontmatter) as T) ?? ({} as T);
  return { slug, data, body: body.trim() };
}

function loadCollection<T>(globResult: Record<string, string>): ParsedContentFile<T>[] {
  return Object.entries(globResult)
    .map(([path, raw]) => {
      const fileName = path.split('/').pop() ?? path;
      const slug = fileName.replace(/\.md$/, '');
      return parseFrontmatter<T>(raw, slug);
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

// Eagerly import every markdown file in every collection folder as raw text.
// (Vite statically analyzes this glob pattern at build time.)
const courseFiles = import.meta.glob('/src/content/courses/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const teacherFiles = import.meta.glob('/src/content/teachers/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const videoFiles = import.meta.glob('/src/content/videos/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const bookFiles = import.meta.glob('/src/content/books/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const researchFiles = import.meta.glob('/src/content/research/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const announcementFiles = import.meta.glob('/src/content/announcements/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const downloadFiles = import.meta.glob('/src/content/downloads/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const resourceFiles = import.meta.glob('/src/content/resources/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const caseFiles = import.meta.glob('/src/content/cases/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export interface CourseMaterialItem {
  title: string;
  fileUrl: string;
}

export interface CourseFrontmatter {
  title: string;
  code: string;
  category: string;
  level: string;
  instructor: string;
  modulesCount: number;
  duration: string;
  description: string;
  syllabus: string[];
  enrolled: number;
  videos: CourseMaterialItem[];
  slides: CourseMaterialItem[];
  notes: CourseMaterialItem[];
}

export interface TeacherFrontmatter {
  name: string;
  role: string;
  institution: string;
  specialties: string[];
  bio: string;
  publications: number;
  email: string;
  image: string;
}

export interface VideoFrontmatter {
  title: string;
  duration: string;
  author: string;
  category: string;
  views: string;
  description: string;
  youtubeId: string; // optional: leave empty if using fileUrl instead
  fileUrl: string; // optional: direct link to a video file on your own storage host (for real downloads)
}

export interface BookFrontmatter {
  title: string;
  authors: string;
  publisher: string;
  edition: string;
  rating: number;
  chapters: number;
  desc: string;
  topics: string[];
  fileUrl: string; // optional: direct link to a downloadable PDF/EPUB on your own storage host
}

export interface ResearchFrontmatter {
  title: string;
  journal: string;
  doi: string;
  date: string;
  authors: string;
  citations: number;
  abstract: string;
}

export interface AnnouncementFrontmatter {
  date: string;
  badge: string;
  title: string;
  summary: string;
  readTime: string;
}

export interface DownloadFrontmatter {
  name: string;
  type: string;
  extension: string;
  size: string;
  desc: string;
  iconName: string; // maps to a lucide-react icon in DownloadsPage
  fileUrl: string; // direct link to the actual file (e.g. hosted on your own storage host)
}

export function getCourses(): (CourseFrontmatter & { id: string })[] {
  return loadCollection<CourseFrontmatter>(courseFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getTeachers(): (TeacherFrontmatter & { id: string })[] {
  return loadCollection<TeacherFrontmatter>(teacherFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getVideos(): (VideoFrontmatter & { id: string })[] {
  return loadCollection<VideoFrontmatter>(videoFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getBooks(): (BookFrontmatter & { id: string })[] {
  return loadCollection<BookFrontmatter>(bookFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getResearchPapers(): (ResearchFrontmatter & { id: string })[] {
  return loadCollection<ResearchFrontmatter>(researchFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getAnnouncements(): (AnnouncementFrontmatter & { id: string })[] {
  return loadCollection<AnnouncementFrontmatter>(announcementFiles).map((f) => ({ id: f.slug, ...f.data }));
}

export function getDownloads(): (DownloadFrontmatter & { id: string })[] {
  return loadCollection<DownloadFrontmatter>(downloadFiles).map((f) => ({ id: f.slug, ...f.data }));
}

// Resources & Cases keep their existing richer types from src/types, since
// those pages (ResourceHub / ClinicalCasesView) already consume that shape.
export function getResourceFiles(): Record<string, string> {
  return resourceFiles;
}

export function getCaseFiles(): Record<string, string> {
  return caseFiles;
}

export { parseFrontmatter };
