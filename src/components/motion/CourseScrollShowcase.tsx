import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowLeft, SkipForward } from 'lucide-react';
import { CourseFrontmatter } from '../../content/loader';
import { assetUrl } from '../../utils/assetPath';

interface CourseScrollShowcaseProps {
  courses: (CourseFrontmatter & { id: string })[];
  onNavigateToCourse: (courseId: string) => void;
  onSkip: () => void;
}

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

/** One course "slide" — fades/slides in as scroll progress enters its slice, out as it leaves. */
const ShowcaseSlide: React.FC<{
  course: CourseFrontmatter & { id: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}> = ({ course, index, total, progress, onOpen }) => {
  const slice = 1 / total;
  const start = index * slice;
  const mid = start + slice * 0.5;
  const end = start + slice;
  // small settle windows so consecutive slides don't overlap harshly
  const inEnd = start + slice * 0.28;
  const outStart = end - slice * 0.28;

  const opacity = useTransform(progress, [start, inEnd, outStart, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, inEnd, outStart, end], [40, 0, 0, -40]);
  const iconScale = useTransform(progress, [start, mid, end], [0.55, 1.25, 0.55]);
  const iconRotate = useTransform(progress, [start, end], [-6, 6]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
    >
      <button
        onClick={onOpen}
        dir="auto"
        className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-right group cursor-pointer"
      >
        <motion.span
          style={{ scale: iconScale, rotate: iconRotate }}
          className="shrink-0 w-40 h-40 sm:w-56 sm:h-56 rounded-[2.5rem] overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 transition-colors"
        >
          {course.icon && (
            <img src={assetUrl(course.icon)} alt="" className="w-full h-full object-cover" />
          )}
        </motion.span>

        <div className="space-y-2 sm:space-y-3 text-center sm:text-right">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25">
            {course.category}
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display leading-snug">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 max-w-md mx-auto sm:mx-0">
            {course.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold group-hover:gap-2.5 transition-all">
            <span>مشاهده سرفصل درس</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
};

export const CourseScrollShowcase: React.FC<CourseScrollShowcaseProps> = ({
  courses,
  onNavigateToCourse,
  onSkip,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const activeIndex = useTransform(scrollYProgress, (p) =>
    Math.max(0, Math.min(courses.length - 1, Math.floor(p * courses.length))),
  );
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = activeIndex.on('change', (v) => setActiveIdx(v));
    return () => unsub();
  }, [activeIndex]);

  // --- Reduced-motion / no-JS-scroll-hijack fallback: plain static grid ---
  if (prefersReduced) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-display">دروس بالینی</h2>
          <button onClick={onSkip} className="text-xs font-bold text-cyan-500 hover:text-cyan-400">
            مشاهده همه سرفصل‌ها ←
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigateToCourse(c.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-cyan-400 transition-colors"
            >
              {c.icon && (
                <img src={assetUrl(c.icon)} alt="" className="w-14 h-14 rounded-xl object-cover" />
              )}
              <span dir="auto" className="text-[11px] text-center text-zinc-600 dark:text-zinc-300 line-clamp-2">
                {c.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${courses.length * 100}vh` }}
    >
      {/* Skip button — always visible/reachable for the whole duration of this section */}
      <button
        onClick={onSkip}
        className="fixed z-30 bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg transition-all"
      >
        <SkipForward className="w-3.5 h-3.5" />
        <span>رد کردن و مشاهده مستقیم سرفصل‌ها</span>
      </button>

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 rounded-[2rem]">
        {/* decorative ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.12), transparent 60%)'
        }} />

        {/* progress dots */}
        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {courses.map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? '20px' : '6px',
                backgroundColor: i === activeIdx ? '#22d3ee' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

        {courses.map((course, i) => (
          <ShowcaseSlide
            key={course.id}
            course={course}
            index={i}
            total={courses.length}
            progress={scrollYProgress}
            onOpen={() => onNavigateToCourse(course.id)}
          />
        ))}
      </div>
    </div>
  );
};
