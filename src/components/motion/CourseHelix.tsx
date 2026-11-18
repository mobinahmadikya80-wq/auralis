import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, Microscope, Upload } from 'lucide-react';
import { CourseFrontmatter } from '../../content/loader';
import { getRecentUploads } from '../../content/recentUploads';
import { assetUrl } from '../../utils/assetPath';

/**
 * CourseHelix — Helix-style spiral showcase (modelled on the "Helix" motion
 * from motionin.design: an endless descending spiral of photographs winding
 * down a black void; scrolling descends the spiral; hovering a print swings
 * it to the centre and a caption below updates with its title and a
 * "FRAME n / N" counter).
 *
 * The section is a tall scroll area (~300vh) with a sticky full-screen
 * viewport. Scroll progress rotates a CSS-3D helix (preserve-3d, rotateY /
 * translateZ / translateY); frames on the far side get smaller (perspective),
 * more transparent and slightly blurred. Frames are billboarded — each one
 * counter-rotates so it always faces the camera — so the Persian titles stay
 * readable instead of mirroring on the far side. Hovering (or tapping) a
 * frame swings it to the centre; clicking an already-centred frame opens it
 * (course detail, or the lab tab). Three tabs swap the spiral's frames:
 * courses, labs, latest uploaded lessons. Respects prefers-reduced-motion
 * (static grid fallback). The animation loop only writes transform / opacity
 * / filter — no layout work.
 */

/** One lab entry, as defined inline in HomePage (quickFeatures). */
export interface HelixLab {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tab: string;
  /** Tailwind gradient classes, e.g. 'from-cyan-500 to-blue-600'. */
  color: string;
}

interface CourseHelixProps {
  courses: (CourseFrontmatter & { id: string })[];
  labs: HelixLab[];
  onNavigateToCourse: (courseId: string) => void;
  onNavigate: (tab: string) => void;
}

type TabId = 'courses' | 'labs' | 'latest';

type HelixFrame =
  | { kind: 'course'; id: string; title: string; subtitle: string; image: string; courseId: string }
  | { kind: 'lab'; id: string; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; gradient: string; tab: string }
  | { kind: 'latest'; id: string; title: string; subtitle: string; image: string; courseId: string };

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useViewportWidth(): number {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'courses', label: 'سرفصل‌ها', icon: BookOpen },
  { id: 'labs', label: 'آزمایشگاه', icon: Microscope },
  { id: 'latest', label: 'آخرین درس‌های آپلود شده', icon: Upload },
];

const SECTION_HEIGHT_VH = 300;
const TILT_DEG = 12;
const MAX_BLUR_PX = 4;

/** The card content of one frame: image + name underneath (courses/latest), or gradient + icon + name (labs). */
const HelixFrameInner: React.FC<{ frame: HelixFrame }> = ({ frame }) => {
  if (frame.kind === 'lab') {
    const Icon = frame.icon;
    return (
      <div
        className={`flex h-[170px] sm:h-[202px] flex-col items-center justify-center gap-2.5 bg-gradient-to-br ${frame.gradient} p-3 text-center`}
      >
        <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
        <span dir="auto" className="line-clamp-2 text-[13px] sm:text-sm font-bold leading-snug text-white">
          {frame.title}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-zinc-900">
      <div className="h-[118px] sm:h-[148px] w-full overflow-hidden bg-zinc-800">
        {frame.image ? (
          <img src={assetUrl(frame.image)} alt="" draggable={false} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/30 to-indigo-500/30">
            <BookOpen className="h-8 w-8 text-cyan-300" />
          </div>
        )}
      </div>
      <div className="flex h-[52px] sm:h-[54px] items-center px-3">
        <span dir="auto" className="line-clamp-2 text-[12px] sm:text-[13px] font-bold leading-snug text-white">
          {frame.title}
        </span>
      </div>
    </div>
  );
};

/** Section heading + "view all" + the three tabs. Shared by the spiral and the reduced-motion grid. */
const HelixHeader: React.FC<{
  tab: TabId;
  onTab: (t: TabId) => void;
  onViewAll: () => void;
}> = ({ tab, onTab, onViewAll }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-2xl font-bold text-white font-display">گشتی در اورالیس</h2>
        <p className="text-xs text-zinc-400">
          اسکرول کنید تا در مارپیچ پایین بروید؛ روی هر قاب بایستید تا به مرکز بیاید، و برای باز کردن آن کلیک کنید.
        </p>
      </div>
      <button
        onClick={onViewAll}
        className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <span>مشاهده همه سرفصل‌ها</span>
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
    </div>

    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="دسته‌بندی مارپیچ">
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onTab(t.id)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              active
                ? 'bg-white text-zinc-900 shadow'
                : 'border border-white/10 bg-white/10 text-zinc-300 hover:bg-white/20'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

export const CourseHelix: React.FC<CourseHelixProps> = ({ courses, labs, onNavigateToCourse, onNavigate }) => {
  const [tab, setTab] = useState<TabId>('courses');
  const prefersReduced = useReducedMotion();
  const vw = useViewportWidth();
  const isMobile = vw < 640;
  // Spiral radius: wide enough to read, narrow enough that side frames stay
  // mostly on screen. Drops per frame (the helix descends as it winds).
  const R = Math.max(130, Math.min(430, vw * 0.36));
  const drop = isMobile ? 56 : 84;

  const courseById = useMemo(() => {
    const m = new Map<string, CourseFrontmatter & { id: string }>();
    courses.forEach((c) => m.set(c.id, c));
    return m;
  }, [courses]);

  // Latest uploaded lessons — same source as RecentUploadsPage
  // (getRecentUploads, newest first): video sessions only, capped at 8.
  // Each frame shows the session title, the parent course name as subtitle,
  // and the parent course's icon image.
  const latestFrames = useMemo<HelixFrame[]>(() => {
    return getRecentUploads(80)
      .filter((u) => u.type === 'video')
      .slice(0, 8)
      .map((u) => {
        const course = courseById.get(u.courseId);
        return {
          kind: 'latest' as const,
          id: u.id,
          title: u.title,
          subtitle: u.courseTitle,
          image: course?.icon ?? '',
          courseId: u.courseId,
        };
      })
      .filter((f) => f.image !== '');
  }, [courseById]);

  const frames: HelixFrame[] = useMemo(() => {
    if (tab === 'labs') {
      return labs.map((l) => ({
        kind: 'lab' as const,
        id: `lab-${l.tab}`,
        title: l.title,
        subtitle: l.desc,
        icon: l.icon,
        gradient: l.color,
        tab: l.tab,
      }));
    }
    if (tab === 'latest') return latestFrames;
    return courses.map((c) => ({
      kind: 'course' as const,
      id: c.id,
      title: c.title,
      subtitle: `${c.category} • ${c.duration}`,
      image: c.icon ?? '',
      courseId: c.id,
    }));
  }, [tab, courses, labs, latestFrames]);

  const N = frames.length;
  // Frames spread over roughly one full turn of the helix, whatever N is.
  const step = N > 0 ? 360 / N : 55;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const displayRef = useRef(0);
  const focusRef = useRef<number | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);

  const setFocus = useCallback((i: number | null) => {
    focusRef.current = i;
    setFocusedIdx(i);
  }, []);

  // Scroll-driven animation loop (rAF): eases the displayed progress toward
  // the scroll progress, or toward the focused frame while one is hovered /
  // tapped. Only runs while the section is near the viewport.
  useEffect(() => {
    if (prefersReduced) return;
    let raf = 0;
    let lastSet = -1;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom > -vh && rect.top < vh * 1.5) {
          const total = rect.height - vh;
          const scrollP = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
          const focus = focusRef.current;
          const target = focus != null && N > 1 ? focus / (N - 1) : scrollP;
          const rate = focus != null ? 0.08 : 0.2;
          displayRef.current += (target - displayRef.current) * rate;
          if (Math.abs(target - displayRef.current) < 0.0004) displayRef.current = target;
          const rounded = Math.round(displayRef.current * 1000) / 1000;
          if (rounded !== lastSet) {
            lastSet = rounded;
            setProgress(rounded);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced, N]);

  // Scrolling always wins over a hovered / tapped focus.
  useEffect(() => {
    if (prefersReduced) return;
    const onScroll = () => {
      if (focusRef.current != null) setFocus(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReduced, setFocus]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const activeIdx = N === 0 ? -1 : Math.min(N - 1, Math.max(0, Math.round(progress * (N - 1))));
  const activeFrame = activeIdx >= 0 ? frames[activeIdx] : null;

  // Helix rotation + the counter-lift that keeps the active frame centred.
  const rot = progress * (N - 1) * step;
  const lift = progress * (N - 1) * drop;

  const handleTab = (t: TabId) => {
    setFocus(null);
    setTab(t);
  };

  const navigateFrame = (frame: HelixFrame) => {
    if (frame.kind === 'lab') onNavigate(frame.tab);
    else onNavigateToCourse(frame.courseId);
  };

  const handleFrameClick = (frame: HelixFrame, i: number) => {
    // Desktop: hover already focused it, so a click opens it. Touch: first
    // tap swings it to the centre, second tap opens it.
    if (focusedIdx === i || activeIdx === i) navigateFrame(frame);
    else setFocus(i);
  };

  const handleFrameEnter = (i: number) => {
    if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setFocus(i), 150);
  };

  const handleFrameLeave = () => {
    if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
    setFocus(null);
  };

  const frameStyle = (i: number): React.CSSProperties => {
    const angle = i * step;
    // World angle of this frame relative to the camera, normalised to [-180, 180].
    let phi = angle - rot;
    phi = ((phi + 180) % 360 + 360) % 360 - 180;
    // 0 at the front, 1 at the back.
    const depth = (1 - Math.cos((phi * Math.PI) / 180)) / 2;
    const isFocused = focusedIdx === i;
    const isActive = activeIdx === i;
    const opacity = isFocused ? 1 : 1 - depth * 0.8;
    const blur = isFocused ? 0 : depth * MAX_BLUR_PX;
    const scale = (1 - depth * 0.1) * (isFocused ? 1.12 : isActive ? 1.04 : 1);
    return {
      transform: `rotateY(${angle}deg) translateZ(${R}px) translateY(${-i * drop}px) rotateY(${rot - angle}deg) translate(-50%, -50%) scale(${scale.toFixed(3)})`,
      opacity: Number(opacity.toFixed(3)),
      filter: blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : undefined,
      willChange: 'transform, opacity',
    };
  };

  // --- Reduced-motion fallback: the same frames as a plain static grid. ---
  if (prefersReduced) {
    return (
      <section className="space-y-6 rounded-[2rem] bg-zinc-950 p-5 sm:p-8">
        <HelixHeader tab={tab} onTab={handleTab} onViewAll={() => onNavigate('courses')} />
        {N === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-400">موردی برای نمایش نیست.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {frames.map((frame) => (
              <button
                key={frame.id}
                type="button"
                onClick={() => navigateFrame(frame)}
                className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-right transition-colors hover:border-cyan-400/60"
              >
                <HelixFrameInner frame={frame} />
              </button>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${SECTION_HEIGHT_VH}vh` }}>
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden rounded-[2rem] bg-zinc-950 pb-24 sm:pb-28">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at 50% 45%, rgba(34,211,238,0.12), transparent 60%)' }}
        />

        {/* Header + tabs */}
        <div className="relative z-20 px-5 pt-6 sm:px-10 sm:pt-8">
          <HelixHeader tab={tab} onTab={handleTab} onViewAll={() => onNavigate('courses')} />
        </div>

        {/* 3D stage */}
        <div className="relative flex-1" style={{ perspective: '1100px' }}>
          {N === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p className="text-center text-sm text-zinc-400">موردی برای نمایش نیست.</p>
            </div>
          ) : (
            <div
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{
                transform: `translateY(${lift.toFixed(1)}px) rotateX(${TILT_DEG}deg) rotateY(${(-rot).toFixed(2)}deg)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {frames.map((frame, i) => {
                const isFocused = focusedIdx === i;
                const isActive = activeIdx === i;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => handleFrameClick(frame, i)}
                    onMouseEnter={() => handleFrameEnter(i)}
                    onMouseLeave={handleFrameLeave}
                    aria-label={frame.title}
                    className={`absolute left-0 top-0 w-[190px] cursor-pointer overflow-hidden rounded-2xl border bg-zinc-900 text-right shadow-2xl sm:w-[250px] ${
                      isFocused
                        ? 'border-cyan-400/70 ring-2 ring-cyan-400/80'
                        : isActive
                          ? 'border-white/25 ring-1 ring-cyan-400/50'
                          : 'border-white/15'
                    }`}
                    style={frameStyle(i)}
                  >
                    <HelixFrameInner frame={frame} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Caption bar — updates with the active frame */}
        <div className="relative z-20 px-5 sm:px-10">
          <div className="mx-auto max-w-2xl border-t border-white/10 pt-3 text-center">
            {activeFrame ? (
              <>
                <p dir="auto" className="text-sm sm:text-base font-bold text-white">
                  {activeFrame.title}
                </p>
                <p dir="auto" className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs text-zinc-400">
                  {activeFrame.subtitle}
                </p>
                <p className="mt-1 text-[11px] font-bold text-cyan-400">
                  قاب {toFa(activeIdx + 1)} از {toFa(N)}
                </p>
              </>
            ) : (
              <p className="text-xs text-zinc-500">موردی برای نمایش نیست.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
