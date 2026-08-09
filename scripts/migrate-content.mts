import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { EDUCATIONAL_RESOURCES } from '../src/data/resources';
import { CLINICAL_CASES } from '../src/data/cases';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);
}

function writeMd(dir: string, slug: string, data: Record<string, any>, body: string) {
  const fm = yaml.dump(data, { lineWidth: 1000 });
  const content = `---\n${fm}---\n\n${body ?? ''}\n`;
  fs.writeFileSync(path.join(root, 'src/content', dir, `${slug}.md`), content, 'utf-8');
}

// Resources -> src/content/resources/*.md (body = contentMarkdown)
for (const r of EDUCATIONAL_RESOURCES) {
  const { contentMarkdown, id, ...rest } = r as any;
  writeMd('resources', id || slugify(r.title), rest, contentMarkdown || '');
}

// Cases -> src/content/cases/*.md (no separate body; everything in frontmatter)
for (const c of CLINICAL_CASES as any[]) {
  const { id, ...rest } = c;
  writeMd('cases', id || slugify(c.title), rest, '');
}

console.log('Migrated', EDUCATIONAL_RESOURCES.length, 'resources and', CLINICAL_CASES.length, 'cases.');
