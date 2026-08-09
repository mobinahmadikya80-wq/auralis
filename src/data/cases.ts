import { ClinicalCase } from '../types';
import { getCaseFiles, parseFrontmatter } from '../content/loader';

// Content is authored as one Markdown file per clinical case under
// src/content/cases/*.md (editable via the Decap CMS admin panel at /admin).
// Everything for a case lives in the YAML frontmatter (nested objects/lists,
// e.g. audiogram, tympanometry, quizQuestions, are all valid YAML).
export const CLINICAL_CASES: ClinicalCase[] = Object.entries(getCaseFiles())
  .map(([path, raw]) => {
    const slug = (path.split('/').pop() ?? path).replace(/\.md$/, '');
    const { data } = parseFrontmatter<Omit<ClinicalCase, 'id'>>(raw, slug);
    return { id: slug, ...data } as ClinicalCase;
  })
  .sort((a, b) => a.id.localeCompare(b.id));
