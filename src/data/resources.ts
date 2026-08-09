import { EducationalResource } from '../types';
import { getResourceFiles, parseFrontmatter } from '../content/loader';

// Content is authored as one Markdown file per resource under
// src/content/resources/*.md (editable via the Decap CMS admin panel at /admin).
// The YAML frontmatter holds the structured fields; the Markdown body becomes
// `contentMarkdown`.
export const EDUCATIONAL_RESOURCES: EducationalResource[] = Object.entries(getResourceFiles())
  .map(([path, raw]) => {
    const slug = (path.split('/').pop() ?? path).replace(/\.md$/, '');
    const { data, body } = parseFrontmatter<Omit<EducationalResource, 'id' | 'contentMarkdown'>>(raw, slug);
    return { id: slug, ...data, contentMarkdown: body || undefined } as EducationalResource;
  })
  .sort((a, b) => a.id.localeCompare(b.id));
