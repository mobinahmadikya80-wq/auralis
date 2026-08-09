import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  UserCheck, 
  Sparkles,
  BarChart,
  FileCheck
} from 'lucide-react';
import { getCourses } from '../../content/loader';

export const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const courses = getCourses();

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Audiology Academic Curriculum</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Clinical Audiology Courses & Syllabus
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Structured academic courses designed according to AAA and ASHA standards. Perfect for Au.D. students, clinical interns, and practicing audiologists.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {c.code} • {c.category}
                </span>
                <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {c.duration}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                  {c.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold uppercase text-zinc-400 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-cyan-500" /> Key Syllabus Learning Modules:
                </span>
                <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                  {c.syllabus.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs">
              <div className="text-zinc-500">
                Instructor: <strong className="text-zinc-800 dark:text-zinc-200">{c.instructor}</strong>
              </div>

              <button
                onClick={() => alert(`Course Syllabus for "${c.title}" registered in workspace!`)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <span>Access Course</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
