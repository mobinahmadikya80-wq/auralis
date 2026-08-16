import React from 'react';
import { UserCheck, Award, GraduationCap, Mail, BookOpen, ExternalLink, Star } from 'lucide-react';
import { getTeachers } from '../../content/loader';

export const TeachersPage: React.FC = () => {
  const faculty = getTeachers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <UserCheck className="w-3.5 h-3.5" />
          <span>اساتید بالینی و آکادمیک</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          هیئت علمی و مدرسان بالینی اورالیس
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          از شنوایی‌شناسان بالینی برجسته، پژوهشگران و استادان دانشگاه که به توسعه آموزش آزاد شنوایی‌شناسی در سراسر جهان متعهدند، بیاموزید.
        </p>
      </div>

      {/* Teachers Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faculty.map((f, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                    {f.name}
                  </h3>
                  <p className="text-xs text-cyan-500 font-semibold">{f.role}</p>
                  <p className="text-[11px] text-zinc-500">{f.institution}</p>
                </div>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {f.bio}
              </p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">تخصص‌های بالینی:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(f.specialties || []).map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                <span><strong>{f.publications}</strong> مقاله بالینی</span>
              </div>

              <a
                href={`mailto:${f.email}`}
                className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-zinc-950 font-bold transition-all flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>تماس با استاد</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
