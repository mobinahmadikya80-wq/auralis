/**
 * Resolves a "public folder" asset path (e.g. content coming from
 * markdown frontmatter like `/uploads/course-icons/foo.jpg`) against the
 * site's actual deployed base path (Vite's `base` config, `/auralis/` in
 * production). Without this, absolute-looking paths resolve against the
 * domain root and 404 on GitHub Pages project sites.
 */
export function assetUrl(path?: string | null): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
