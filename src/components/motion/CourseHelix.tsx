import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
 * viewport. It is full-bleed (breaks out of the page's max-width container)
 * and edge-to-edge black, like the reference — no card, no rounded corners,
 * no top header. The only UI is a small row of category options plus the
 * caption at the bottom, above the site's fixed bottom toolbar.
 * The section is pulled up 100px (mt-[-100px]) so the sticky viewport
 * starts at the viewport top even under the site header — otherwise the
 * header's height pushes the bottom bar (tabs + caption) below the fold
 * at initial load. On narrow screens the spiral radius and frame size
 * shrink so frames stay inside the viewport instead of escaping to the
 * corners/edges.
 * Scroll progress rotates a CSS-3D helix (preserve-3d, rotateY /
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

function useHeaderHeight(): number {
  const [h, setH] = useState(64);
  useEffect(() => {
    const el = document.getElementById('site-header');
    if (!el) return;
    const update = () => setH(Math.round(el.getBoundingClientRect().height));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  return h;
}

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'courses', label: 'سرفصل‌ها', icon: BookOpen },
  { id: 'labs', label: 'آزمایشگاه', icon: Microscope },
  { id: 'latest', label: 'آخرین درس‌های آپلود شده', icon: Upload },
];

const SECTION_HEIGHT_VH = 300;
const TILT_DEG = 12;
const PERSPECTIVE_PX = 1700;
const MAX_BLUR_PX = 4;

/** The card content of one frame: image + name underneath (courses/latest), or gradient + icon + name (labs). */
const HelixFrameInner: React.FC<{ frame: HelixFrame }> = ({ frame }) => {
  if (frame.kind === 'lab') {
    const Icon = frame.icon;
    return (
      <div
        className={`flex h-[150px] sm:h-[202px] flex-col items-center justify-center gap-2.5 bg-gradient-to-br ${frame.gradient} p-3 text-center`}
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
      <div className="h-[100px] sm:h-[148px] w-full overflow-hidden bg-zinc-800">
        {frame.image ? (
          <img src={assetUrl(frame.image)} alt="" draggable={false} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/30 to-indigo-500/30">
            <BookOpen className="h-8 w-8 text-cyan-300" />
          </div>
        )}
      </div>
      <div className="flex h-[48px] sm:h-[54px] items-center px-3">
        <span dir="auto" className="line-clamp-2 text-[12px] sm:text-[13px] font-bold leading-snug text-white">
          {frame.title}
        </span>
      </div>
    </div>
  );
};

/** The three category options, small and subtle at the bottom (like the Helix reference's minimal UI), plus a small "view all" link. Shared by the spiral and the reduced-motion grid. */
const HelixMiniTabs: React.FC<{
  tab: TabId;
  onTab: (t: TabId) => void;
  onViewAll: () => void;
}> = ({ tab, onTab, onViewAll }) => (
  <div className="flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="دسته‌بندی مارپیچ">
    {TABS.map((t) => {
      const Icon = t.icon;
      const active = tab === t.id;
      return (
        <button
          key={t.id}
          role="tab"
          aria-selected={active}
          onClick={() => onTab(t.id)}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
            active
              ? 'bg-white text-zinc-900 shadow'
              : 'border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
          }`}
        >
          <Icon className="w-3 h-3" />
          <span>{t.label}</span>
        </button>
      );
    })}
    <button
      onClick={onViewAll}
      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-cyan-400/90 transition-colors hover:text-cyan-300"
    >
      <span>مشاهده همه سرفصل‌ها</span>
      <ArrowLeft className="w-3 h-3" />
    </button>
  </div>
);

export const CourseHelix: React.FC<CourseHelixProps> = ({ courses, labs, onNavigateToCourse, onNavigate }) => {
  const [tab, setTab] = useState<TabId>('courses');
  const prefersReduced = useReducedMotion();
  const vw = useViewportWidth();
  const headerH = useHeaderHeight();
  const isMobile = vw < 640;
  const frameW = isMobile ? 160 : 250;
  // Spiral radius: chosen so that the side-most frames always stay fully
  // inside the viewport (R + half a frame + margin <= half the width).
  const R = Math.max(60, Math.min(430, vw / 2 - frameW / 2 - 14));
  // The helix descends as it winds (vertical drop per frame).
  const drop = isMobile ? 44 : 84;

  const courseById = useMemo(() => {
    const m = new Map<string, CourseFrontmatter & { id: string }>();
    courses.forEach((c) => m.set(c.id, c));
    return m;
  }, [courses]);

  // Latest uploaded lessons — same source as RecentUploadsPage
  // (getRecentUploads, newest first): video sessions only, capped at 8.
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
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Continuous "frame index" the spiral is currently showing (0 … N-1).
  // All per-frame animation is written straight to the DOM from the rAF
  // loop (no React re-render per animation frame), so it stays smooth.
  const displayRef = useRef(0);
  const settledRef = useRef(true);
  const focusRef = useRef<number | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRef = useRef(0);
  const hoverTimerRef = useRef<number | null>(null);
  // Pointer travel since the last hover-focus: a pointer that merely *rests*
  // while the spiral turns under it must not trigger the next frame.
  const moveAccumRef = useRef(0);

  const setFocus = useCallback((i: number | null) => {
    focusRef.current = i;
    setFocusedIdx(i);
  }, []);

  // Writes the helix transforms for a (fractional) frame index `d`.
  const apply = useCallback(
    (d: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rot = d * step;
      // lift keeps the current frame level; tiltShift pulls the helix back down
      // so the front frame sits at the stage's vertical centre despite the tilt.
      const tiltRad = (TILT_DEG * Math.PI) / 180;
      const tiltShift =
        (R * Math.sin(tiltRad) * PERSPECTIVE_PX) / (PERSPECTIVE_PX - R * Math.cos(tiltRad));
      const lift = d * drop + tiltShift;
      stage.style.transform = `translateY(${lift.toFixed(1)}px) rotateX(${TILT_DEG}deg) rotateY(${(-rot).toFixed(2)}deg)`;
      const focus = focusRef.current;
      const nearest = Math.round(d);
      frameRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step;
        // Angle of this frame relative to the camera, in [-180, 180].
        let phi = angle - rot;
        phi = ((phi + 180) % 360 + 360) % 360 - 180;
        // 0 at the front, 1 at the back.
        const depth = (1 - Math.cos((phi * Math.PI) / 180)) / 2;
        const isFocused = focus === i;
        const isActive = nearest === i;
        const opacity = isFocused ? 1 : 1 - depth * 0.8;
        const blur = isFocused ? 0 : depth * MAX_BLUR_PX;
        const scale = (1 - depth * 0.1) * (isFocused ? 1.12 : isActive ? 1.04 : 1);
        el.style.transform = `rotateY(${angle}deg) translateZ(${R}px) translateY(${-i * drop}px) rotateY(${(rot - angle).toFixed(2)}deg) scale(${scale.toFixed(3)}) translate(-50%, -50%)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
        // Frames nearer the camera paint above the ones behind them.
        el.style.zIndex = isFocused ? '999' : String(Math.round((1 - depth) * 100));
      });
      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActiveIdx(nearest);
      }
    },
    [step, drop, R],
  );

  // Re-apply right after any change that affects geometry (tab swap, resize).
  useLayoutEffect(() => {
    frameRefs.current.length = N;
    displayRef.current = Math.min(displayRef.current, Math.max(0, N - 1));
    if (activeRef.current > N - 1) {
      activeRef.current = Math.max(0, N - 1);
      setActiveIdx(activeRef.current);
    }
    if (prefersReduced) return;
    apply(displayRef.current);
  }, [apply, N, frames, prefersReduced]);

  // Scroll-driven animation loop (rAF): eases the displayed index toward the
  // frame the scroll position selects (always a whole frame, so the spiral
  // comes to rest with one frame dead-centre), or toward the focused frame
  // while one is hovered / tapped. Only runs while the section is near.
  useEffect(() => {
    if (prefersReduced) return;
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom > -vh && rect.top < vh * 1.5) {
          const total = rect.height - (vh - headerH);
          const scrollP = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
          const focus = focusRef.current;
          const maxI = Math.max(0, N - 1);
          const target = focus != null ? focus : Math.round(scrollP * maxI);
          const rate = focus != null ? 0.1 : 0.14;
          const diff = target - displayRef.current;
          settledRef.current = Math.abs(diff) < 0.05;
          if (Math.abs(diff) > 0.0005) {
            displayRef.current = Math.abs(diff) < 0.002 ? target : displayRef.current + diff * rate;
            apply(displayRef.current);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced, N, apply, headerH]);

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

  const safeActive = N === 0 ? -1 : Math.min(N - 1, Math.max(0, activeIdx));
  const activeFrame = safeActive >= 0 ? frames[safeActive] : null;

  const handleTab = (t: TabId) => {
    setFocus(null);
    setTab(t);
  };

  const navigateFrame = (frame: HelixFrame) => {
    if (frame.kind === 'lab') onNavigate(frame.tab);
    else onNavigateToCourse(frame.courseId);
  };

  const handleFrameClick = (frame: HelixFrame, i: number) => {
    // A frame that is already centred (or focused) opens; otherwise the first
    // click / tap swings it to the centre.
    if (focusedIdx === i || safeActive === i) navigateFrame(frame);
    else setFocus(i);
  };

  // Hover = intent: the pointer must rest on the frame, and frames sliding
  // under a still pointer while the spiral is moving are ignored (otherwise
  // the frame swings away from the cursor, the cursor lands on another one,
  // and the spiral oscillates).
  const handleFrameEnter = (i: number) => {
    if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
    let tries = 0;
    const attempt = () => {
      const el = frameRefs.current[i];
      if (!el || !el.matches(':hover') || moveAccumRef.current < 24) return;
      if (!settledRef.current && tries++ < 8) {
        hoverTimerRef.current = window.setTimeout(attempt, 120);
        return;
      }
      moveAccumRef.current = 0;
      setFocus(i);
    };
    hoverTimerRef.current = window.setTimeout(attempt, 220);
  };

  const handleFrameLeave = () => {
    if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
  };

  const handleStageMove = (e: React.MouseEvent) => {
    moveAccumRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
  };

  const handleStageLeave = () => {
    if (hoverTimerRef.current != null) window.clearTimeout(hoverTimerRef.current);
    if (focusRef.current != null) setFocus(null);
  };

  // --- Reduced-motion fallback: the same frames as a plain static grid. ---
  if (prefersReduced) {
    return (
      <section className="space-y-6 rounded-3xl bg-zinc-950 p-5 sm:p-8">
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
        <HelixMiniTabs tab={tab} onTab={handleTab} onViewAll={() => onNavigate('courses')} />
      </section>
    );
  }

  return (
    // -mt-8 cancels the <main> top padding (py-8) so the section starts right
    // under the sticky header; the sticky viewport then occupies exactly the
    // space between the header and the bottom of the screen.
    <div
      ref={sectionRef}
      className="relative -mt-8 mx-[calc(50%-50vw)]"
      style={{ height: `${SECTION_HEIGHT_VH}svh` }}
    >
      <div
        className="sticky flex w-full flex-col overflow-hidden bg-zinc-950 pb-24 sm:pb-28"
        style={{ top: headerH, height: `calc(100svh - ${headerH}px)` }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at 50% 45%, rgba(34,211,238,0.12), transparent 60%)' }}
        />

        {/* 3D stage */}
        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{
            perspective: `${PERSPECTIVE_PX}px`,
            // Frames fade out at the stage's top/bottom edge instead of being
            // chopped (or sliding over the tabs / caption underneath).
            maskImage: 'linear-gradient(to bottom, transparent 0, #000 7%, #000 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 7%, #000 90%, transparent 100%)',
          }}
          onMouseMove={handleStageMove}
          onMouseLeave={handleStageLeave}
        >
          {N === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p className="text-center text-sm text-zinc-400">موردی برای نمایش نیست.</p>
            </div>
          ) : (
            <div
              ref={stageRef}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {frames.map((frame, i) => {
                const isFocused = focusedIdx === i;
                const isActive = safeActive === i;
                return (
                  <button
                    key={frame.id}
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => handleFrameClick(frame, i)}
                    onMouseEnter={() => handleFrameEnter(i)}
                    onMouseLeave={handleFrameLeave}
                    aria-label={frame.title}
                    className={`absolute left-0 top-0 w-[160px] cursor-pointer overflow-hidden rounded-2xl border bg-zinc-900 text-right shadow-2xl sm:w-[250px] ${
                      isFocused
                        ? 'border-cyan-400/70 ring-2 ring-cyan-400/80'
                        : isActive
                          ? 'border-white/25 ring-1 ring-cyan-400/50'
                          : 'border-white/15'
                    }`}
                    // transform-origin 0 0 = the frame's anchor on the helix: the billboard
                    // counter-rotation and the scale must pivot on the card's centre
                    // (after translate(-50%,-50%)), not on the box's own middle.
                    style={{ transformOrigin: '0 0', willChange: 'transform, opacity' }}
                  >
                    <HelixFrameInner frame={frame} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom bar — small options + caption, like the Helix reference */}
        <div className="relative z-20 space-y-2.5 px-5 sm:px-10">
          <HelixMiniTabs tab={tab} onTab={handleTab} onViewAll={() => onNavigate('courses')} />
          <div className="mx-auto max-w-2xl border-t border-white/10 pt-2.5 text-center">
            {activeFrame ? (
              <>
                <p dir="auto" className="text-sm sm:text-base font-bold text-white">
                  {activeFrame.title}
                </p>
                <p dir="auto" className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs text-zinc-400">
                  {activeFrame.subtitle}
                </p>
                <p className="mt-1 text-[11px] font-bold text-cyan-400">
                  قاب {toFa(safeActive + 1)} از {toFa(N)}
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
