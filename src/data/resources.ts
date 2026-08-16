import { EducationalResource } from '../types';
import { getResourceFiles, parseFrontmatter, getCourseDerivedResourceEntries } from '../content/loader';

// Content is authored as one Markdown file per resource under
// src/content/resources/*.md (editable via the Decap CMS admin panel at /admin).
// The YAML frontmatter holds the structured fields; the Markdown body becomes
// `contentMarkdown`.
const standaloneResources: EducationalResource[] = Object.entries(getResourceFiles())
  .map(([path, raw]) => {
    const slug = (path.split('/').pop() ?? path).replace(/\.md$/, '');
    const { data, body } = parseFrontmatter<Omit<EducationalResource, 'id' | 'contentMarkdown'>>(raw, slug);
    return { id: slug, ...data, contentMarkdown: body || undefined } as EducationalResource;
  });

// Automatically-generated entries mirrored from every course's
// Videos/Slides/Notes materials, so the Resource Hub always matches
// whatever courses exist — nothing needs to be re-entered by hand.
const courseDerivedResources: EducationalResource[] = getCourseDerivedResourceEntries().map((e) => ({
  ...e,
  topic: e.topic as EducationalResource['topic'],
  level: e.level as EducationalResource['level'],
}));

export const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  ...standaloneResources,
  ...courseDerivedResources,
].sort((a, b) => a.id.localeCompare(b.id));

