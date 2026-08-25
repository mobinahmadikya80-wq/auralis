import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Eye,
  Sparkles,
  PenLine,
} from 'lucide-react';
import { WEEKLY_EXAMS } from '../../data/exams';
import { WeeklyExam } from '../../types';

export const ExamsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<WeeklyExam | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [revealedEssays, setRevealedEssays] = useState<Record<string, boolean>>({});

  const openExam = (exam: WeeklyExam) => {
    setSelectedExam(exam);
    setMcqAnswers({});
    setRevealedEssays({});
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const toggleEssay = (id: string) => {
    setRevealedEssays((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- List View ---
  if (!selectedExam) {
    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تولید هفتگی و خودکار با هوش مصنوعی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
            آزمون‌های هفتگی شنوایی‌شناسی
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            هر هفته یک آزمون جدید با موضوعی متنوع از حیطه‌ی شنوایی‌شناسی بالینی — شامل سوالات چهارگزینه‌ای و
            سوالات تشریحی با راهنمای پاسخ.
          </p>
        </div>

        {WEEKLY_EXAMS.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center text-sm text-zinc-500 dark:text-zinc-400">
            هنوز آزمونی تولید نشده. اولین آزمون هفتگی به‌زودی اضافه می‌شود.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WEEKLY_EXAMS.map((exam) => (
              <button
                key={exam.id}
                onClick={() => openExam(exam)}
                className="text-right bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-400 dark:hover:border-cyan-500 transition-all group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {exam.durationMinutes} دقیقه
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 dir="auto" className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {exam.title}
                  </h3>
                  <p dir="auto" className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {exam.topic}
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span dir="ltr" className="font-mono">{exam.dateGenerated}</span>
                  <span>{exam.mcqQuestions.length} تستی · {exam.essayQuestions.length} تشریحی</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- Detail / Take-Exam View ---
  return (
    <div className="space-y-6">
      <button
        onClick={() => setSelectedExam(null)}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-cyan-500 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
        <span>بازگشت به لیست آزمون‌ها</span>
      </button>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
        <h2 dir="auto" className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white font-display">
          {selectedExam.title}
        </h2>
        <p dir="auto" className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {selectedExam.topic}
        </p>
      </div>

      {/* MCQ Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <CheckCircle2 className="w-4 h-4 text-cyan-500" />
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">سوالات چهارگزینه‌ای</span>
        </div>

        {selectedExam.mcqQuestions.map((q, qIdx) => {
          const userAns = mcqAnswers[q.id];
          const isAnswered = userAns !== undefined;

          return (
            <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <h4 dir="auto" className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">
                {qIdx + 1}. {q.question}
              </h4>

              <div className="space-y-1.5">
                {q.options.map((opt, idx) => {
                  let btnStyle = 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800';
                  if (isAnswered) {
                    if (idx === q.correctIndex) {
                      btnStyle = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-bold';
                    } else if (idx === userAns) {
                      btnStyle = 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 font-bold';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      dir="auto"
                      onClick={() => handleSelectOption(q.id, idx)}
                      className={`w-full text-right p-2.5 rounded-xl text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {isAnswered && idx === userAns && idx !== q.correctIndex && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div dir="auto" className="p-3 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <strong>توضیح:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Essay Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <PenLine className="w-4 h-4 text-violet-500" />
          <span className="text-xs font-bold text-violet-500 uppercase tracking-wider">سوالات تشریحی</span>
        </div>

        {selectedExam.essayQuestions.map((q, qIdx) => (
          <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <h4 dir="auto" className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">
              {qIdx + 1}. {q.question}
            </h4>

            {!revealedEssays[q.id] ? (
              <button
                onClick={() => toggleEssay(q.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-[11px] flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>نمایش نکات کلیدی پاسخ</span>
              </button>
            ) : (
              <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                {q.modelAnswerPoints.map((point, i) => (
                  <li key={i} dir="auto" className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
