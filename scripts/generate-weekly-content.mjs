#!/usr/bin/env node
/**
 * Weekly AI content generator for Auralis.
 *
 * Calls the Gemini API to generate ONE new clinical case and ONE new
 * weekly exam (structured JSON, schema-enforced), converts them to the
 * site's Markdown + YAML-frontmatter format, and writes them into
 * src/content/cases/ and src/content/exams/.
 *
 * This script only WRITES FILES. Committing/pushing is handled by the
 * calling GitHub Actions workflow (.github/workflows/weekly-content-generator.yml).
 *
 * Required env var: GEMINI_API_KEY
 */

import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY environment variable.');
  process.exit(1);
}

const GEMINI_MODEL = 'gemini-2.5-flash';
const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const CASES_DIR = path.join(ROOT, 'src/content/cases');
const EXAMS_DIR = path.join(ROOT, 'src/content/exams');

// A deliberately broad, varied pool of clinical-audiology topics so that
// consecutive weeks don't repeat the same subject area. One is picked at
// random each run.
const TOPICS = [
  'کاهش شنوایی ناشی از نویز شغلی (NIHL)',
  'پرسبیکوزیس و افت شنوایی مرتبط با سن',
  'اوتیت میانی حاد و ترشحی در کودکان',
  'اسکلروز اتوز (Otosclerosis)',
  'بیماری منییر و سرگیجه محیطی',
  'وزوز گوش (Tinnitus) مزمن',
  'BPPV و مانورهای تشخیصی-درمانی',
  'اختلال پردازش شنیداری مرکزی (APD) در کودکان',
  'غربالگری شنوایی نوزادان (Newborn Hearing Screening)',
  'اتوتوکسیسیتی داروهای شیمی‌درمانی',
  'افت شنوایی ناگهانی حسی‌عصبی ایدیوپاتیک (SSNHL)',
  'نوروپاتی شنوایی/دیس‌سینکرونی شنوایی (ANSD)',
  'شوانومای وستیبولار (Vestibular Schwannoma)',
  'فیتینگ سمعک و اصول WDRC',
  'کاندیداتوری و ارزیابی کاشت حلزون',
  'وستیبولوپاتی دوطرفه و توانبخشی وستیبولار',
  'اختلالات ژنتیکی کاهش شنوایی (Connexin 26 / GJB2)',
  'اوتیت خارجی و عوارض آن',
  'میازمای گوش میانی و کلستئاتوم',
  'ارزیابی الکتروفیزیولوژیک ABR/ASSR در نوزادان',
];
const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

const responseSchema = {
  type: 'object',
  properties: {
    case: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        patientAge: { type: 'integer' },
        patientGender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
        chiefComplaint: { type: 'string' },
        historyOfPresentIllness: { type: 'string' },
        otoscopyFindings: { type: 'string' },
        audiogram: {
          type: 'object',
          properties: {
            rightEarAir: { type: 'array', items: { type: 'object', properties: { frequency: { type: 'integer' }, decibels: { type: 'integer' } }, required: ['frequency', 'decibels'] } },
            rightEarBone: { type: 'array', items: { type: 'object', properties: { frequency: { type: 'integer' }, decibels: { type: 'integer' } }, required: ['frequency', 'decibels'] } },
            leftEarAir: { type: 'array', items: { type: 'object', properties: { frequency: { type: 'integer' }, decibels: { type: 'integer' } }, required: ['frequency', 'decibels'] } },
            leftEarBone: { type: 'array', items: { type: 'object', properties: { frequency: { type: 'integer' }, decibels: { type: 'integer' } }, required: ['frequency', 'decibels'] } },
            maskingUsedRight: { type: 'boolean' },
            maskingUsedLeft: { type: 'boolean' },
          },
          required: ['rightEarAir', 'leftEarAir'],
        },
        tympanometry: {
          type: 'object',
          properties: {
            typeRight: { type: 'string', enum: ['Type A', 'Type As', 'Type Ad', 'Type B', 'Type C'] },
            typeLeft: { type: 'string', enum: ['Type A', 'Type As', 'Type Ad', 'Type B', 'Type C'] },
            peakPressureRight: { type: 'number' },
            peakPressureLeft: { type: 'number' },
            complianceRight: { type: 'number' },
            complianceLeft: { type: 'number' },
          },
          required: ['typeRight', 'typeLeft', 'peakPressureRight', 'peakPressureLeft', 'complianceRight', 'complianceLeft'],
        },
        acousticReflexes: { type: 'string' },
        oaeResults: { type: 'string' },
        correctDiagnosis: { type: 'string' },
        differentialDiagnoses: { type: 'array', items: { type: 'string' } },
        diagnosticExplanation: { type: 'string' },
        recommendedManagement: { type: 'array', items: { type: 'string' } },
        quizQuestions: {
          type: 'array',
          minItems: 4,
          maxItems: 5,
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              options: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
              correctIndex: { type: 'integer' },
              explanation: { type: 'string' },
            },
            required: ['question', 'options', 'correctIndex', 'explanation'],
          },
        },
      },
      required: [
        'title', 'patientAge', 'patientGender', 'chiefComplaint', 'historyOfPresentIllness',
        'otoscopyFindings', 'audiogram', 'tympanometry', 'acousticReflexes', 'oaeResults',
        'correctDiagnosis', 'differentialDiagnoses', 'diagnosticExplanation', 'recommendedManagement', 'quizQuestions',
      ],
    },
    exam: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        durationMinutes: { type: 'integer' },
        mcqQuestions: {
          type: 'array',
          minItems: 8,
          maxItems: 10,
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              options: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
              correctIndex: { type: 'integer' },
              explanation: { type: 'string' },
            },
            required: ['question', 'options', 'correctIndex', 'explanation'],
          },
        },
        essayQuestions: {
          type: 'array',
          minItems: 2,
          maxItems: 3,
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              modelAnswerPoints: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 6 },
            },
            required: ['question', 'modelAnswerPoints'],
          },
        },
      },
      required: ['title', 'durationMinutes', 'mcqQuestions', 'essayQuestions'],
    },
  },
  required: ['case', 'exam'],
};

const prompt = `شما یک استاد ارشد شنوایی‌شناسی بالینی (Au.D.) با تجربه‌ی تدریس دانشگاهی هستید.
موضوع این هفته: «${topic}»

یک مورد بالینی (Clinical Case) واقع‌گرایانه و آموزشی درباره‌ی این موضوع بساز، به همراه یک آزمون هفتگی جداگانه (weekly exam) که به‌طور کلی‌تر حیطه‌ی شنوایی‌شناسی مرتبط با همین موضوع را می‌سنجد.

الزامات:
- همه‌ی متن‌ها باید به زبان فارسی روان و دقیق پزشکی باشند.
- مقادیر آدیومتری (audiogram) باید عددی، واقع‌بینانه و همخوان با تشخیص نهایی باشند (فرکانس‌های استاندارد: 250, 500, 1000, 2000, 4000, 8000؛ مقادیر dB HL بین -10 تا 120).
- تمپانومتری، رفلکس آکوستیک و OAE باید با تصویر بالینی سازگار باشند.
- سوالات چهارگزینه‌ای باید سطح استدلال بالینی (نه فقط حفظیات) داشته باشند و فقط یک گزینه‌ی صحیح داشته باشند.
- سوالات تشریحی آزمون هفتگی باید نکات کلیدی پاسخ (model answer points) به‌صورت فهرست‌وار داشته باشند، نه پاسخ کامل انشایی.
- عنوان آزمون هفتگی باید با «آزمون هفتگی:» شروع شود.
- خروجی را دقیقاً طبق schema ارائه‌شده و فقط به‌صورت JSON معتبر برگردان — بدون هیچ متن اضافه.`;

async function callGemini() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
          responseSchema,
        },
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 1000)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  if (!text.trim()) {
    throw new Error('Gemini returned an empty response.');
  }
  return JSON.parse(text);
}

function slugify(str) {
  return str
    .toString()
    .trim()
    .replace(/[\u0600-\u06FF\s]+/g, '-') // Persian text / whitespace -> dash
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function withIds(list, prefix) {
  return list.map((item, i) => ({ id: `${prefix}${i + 1}`, ...item }));
}

function toFrontmatterFile(dataObj) {
  const yamlBody = yaml.dump(dataObj, { lineWidth: -1, noRefs: true });
  return `---\n${yamlBody}---\n`;
}

async function main() {
  console.log(`Generating weekly content for topic: ${topic}`);
  const { case: caseData, exam: examData } = await callGemini();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const englishSlugSeed = slugify(caseData.title) || slugify(topic) || `case-${Date.now()}`;

  // --- Clinical Case file ---
  caseData.quizQuestions = withIds(caseData.quizQuestions || [], 'q');
  const caseSlug = `case_ai_${today}_${englishSlugSeed}`.slice(0, 90);
  const casePath = path.join(CASES_DIR, `${caseSlug}.md`);
  fs.mkdirSync(CASES_DIR, { recursive: true });
  fs.writeFileSync(casePath, toFrontmatterFile(caseData), 'utf-8');
  console.log(`Wrote case: ${casePath}`);

  // --- Weekly Exam file ---
  const examOut = {
    title: examData.title,
    topic,
    dateGenerated: today,
    durationMinutes: examData.durationMinutes,
    mcqQuestions: withIds(examData.mcqQuestions || [], 'q'),
    essayQuestions: withIds(examData.essayQuestions || [], 'e'),
  };
  const examSlug = `exam_${today}_${slugify(topic) || 'general'}`.slice(0, 90);
  const examPath = path.join(EXAMS_DIR, `${examSlug}.md`);
  fs.mkdirSync(EXAMS_DIR, { recursive: true });
  fs.writeFileSync(examPath, toFrontmatterFile(examOut), 'utf-8');
  console.log(`Wrote exam: ${examPath}`);

  console.log('Done.');
}

main().catch((err) => {
  console.error('Weekly content generation failed:', err);
  process.exit(1);
});
