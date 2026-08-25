import { WeeklyExam } from '../types';
import { getExamFiles, parseFrontmatter } from '../content/loader';

// Content is authored as one Markdown file per weekly exam under
// src/content/exams/*.md (auto-generated weekly by a GitHub Action, and
// also editable via the Decap CMS admin panel at /admin).
export const WEEKLY_EXAMS: WeeklyExam[] = Object.entries(getExamFiles())
  .map(([path, raw]) => {
    const slug = (path.split('/').pop() ?? path).replace(/\.md$/, '');
    const { data } = parseFrontmatter<Omit<WeeklyExam, 'id'>>(raw, slug);
    return { id: slug, ...data } as WeeklyExam;
  })
  // Newest first (slugs are date-prefixed, e.g. exam_2026-08-24_tinnitus.md)
  .sort((a, b) => b.id.localeCompare(a.id));
