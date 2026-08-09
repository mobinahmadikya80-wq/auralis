import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  FileText, 
  Activity, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { CLINICAL_CASES } from '../data/cases';
import { ClinicalCase } from '../types';

export const ClinicalCasesView: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<ClinicalCase>(CLINICAL_CASES[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showDiagnosticAnswer, setShowDiagnosticAnswer] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Real Patient Cases & Diagnostic Reasoning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display mt-2">
              Clinical Case Battery & Grand Rounds
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Examine real patient histories, otoscopic findings, audiometric plots, and tympanometry curves. Test your clinical judgment with interactive diagnostic questions.
            </p>
          </div>

          {/* Case Selector Dropdown */}
          <div className="w-full md:w-80">
            <label className="text-xs font-bold text-zinc-400 uppercase">Select Case Study:</label>
            <select
              value={selectedCase.id}
              onChange={(e) => {
                const found = CLINICAL_CASES.find(c => c.id === e.target.value);
                if (found) {
                  setSelectedCase(found);
                  setQuizAnswers({});
                  setShowDiagnosticAnswer(false);
                }
              }}
              className="w-full mt-1 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none"
            >
              {CLINICAL_CASES.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Case Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Patient Presentation & Test Battery (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Patient Bio Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" /> Patient Demographics
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-500">
                {selectedCase.patientAge} Years Old • {selectedCase.patientGender}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                Chief Complaint
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mt-1 italic bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                "{selectedCase.chiefComplaint}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                History of Present Illness (HPI)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
                {selectedCase.historyOfPresentIllness}
              </p>
            </div>
          </div>

          {/* Test Battery Findings */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Clinical Diagnostic Battery Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-cyan-500 uppercase">Otoscopy</span>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedCase.otoscopyFindings}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-blue-500 uppercase">Tympanometry</span>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Right: <strong>{selectedCase.tympanometry.typeRight}</strong> ({selectedCase.tympanometry.complianceRight} ml)<br/>
                  Left: <strong>{selectedCase.tympanometry.typeLeft}</strong> ({selectedCase.tympanometry.complianceLeft} ml)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-purple-500 uppercase">Acoustic Reflexes</span>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedCase.acousticReflexes}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-amber-500 uppercase">OAE Test</span>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedCase.oaeResults}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Panel: Diagnostic Quiz & Reveal (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Diagnostic Reasoning Quiz */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Clinical Case Questions
              </span>
            </div>

            {selectedCase.quizQuestions.map((q) => {
              const userAns = quizAnswers[q.id];
              const isAnswered = userAns !== undefined;
              const isCorrect = userAns === q.correctIndex;

              return (
                <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">
                    {q.question}
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
                          onClick={() => handleSelectOption(q.id, idx)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && idx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          {isAnswered && idx === userAns && idx !== q.correctIndex && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-3 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Diagnostic Reveal Toggle */}
            <div className="pt-2">
              {!showDiagnosticAnswer ? (
                <button
                  onClick={() => setShowDiagnosticAnswer(true)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>Reveal Final Diagnosis & Treatment Plan</span>
                </button>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 space-y-4 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Final Diagnosis</span>
                    <h4 className="text-base font-extrabold text-emerald-900 dark:text-emerald-300 mt-0.5">
                      {selectedCase.correctDiagnosis}
                    </h4>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedCase.diagnosticExplanation}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Management Plan</span>
                    <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                      {selectedCase.recommendedManagement.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
