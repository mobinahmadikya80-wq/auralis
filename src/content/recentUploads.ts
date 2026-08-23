import {
  getCourses,
  CourseMaterialItem,
} from './loader';

export type RecentUploadType = 'video' | 'slides' | 'note';

export interface RecentUploadItem {
  id: string;
  type: RecentUploadType;
  typeLabel: string;
  title: string;
  courseTitle: string;
  courseCode: string;
  courseId: string;
  fileUrl?: string;
  /** Human-readable feed line, e.g. «ویدیو جلسه ۱ از درس … اضافه شده» */
  message: string;
}

/**
 * Flatten course videos/slides/notes into a "recent uploads" feed.
 * Newest-first approximation: reverse course order, then reverse item index.
 */
export function getRecentUploads(limit = 60): RecentUploadItem[] {
  const typeMeta: Record<RecentUploadType, string> = {
    video: 'ویدیو',
    slides: 'اسلاید',
    note: 'جزوه',
  };

  const items: RecentUploadItem[] = [];
  const courses = getCourses().slice().reverse();

  for (const course of courses) {
    const groups: Array<{ type: RecentUploadType; list: CourseMaterialItem[] }> = [
      { type: 'video', list: course.videos || [] },
      { type: 'slides', list: course.slides || [] },
      { type: 'note', list: course.notes || [] },
    ];
    for (const { type, list } of groups) {
      const reversed = list.slice().reverse();
      reversed.forEach((item, revIdx) => {
        const idx = list.length - 1 - revIdx;
        const typeLabel = typeMeta[type];
        items.push({
          id: `upload-${course.id}-${type}-${idx}`,
          type,
          typeLabel,
          title: item.title,
          courseTitle: course.title,
          courseCode: course.code,
          courseId: course.id,
          fileUrl: item.fileUrl,
          message: `${typeLabel} «${item.title}» از درس «${course.title}» اضافه شده`,
        });
      });
    }
  }

  return items.slice(0, limit);
}
