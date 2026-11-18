import React from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  GraduationCap, 
  Microscope, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Users, 
  Download,
  Calendar,
  CheckCircle2,
  Ear,
  Search
} from 'lucide-react';
import { EducationalResource } from '../../types';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../motion/ScrollReveal';
import { TiltCard } from '../motion/TiltCard';
import { Magnetic } from '../motion/Magnetic';
import { getCourses } from '../../content/loader';
import { assetUrl } from '../../utils/assetPath';
import { CourseHelix } from '../motion/CourseHelix';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectResource: (res: EducationalResource) => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectResource, onNavigateToCourse }) => {
  const coursesWithIcons = getCourses().filter((c) => !!c.icon);

  const stats = [
    { label: 'دروس بالینی', value: '+۳۸' },
    { label: 'نمایش ویدیویی', value: '+۱۴۰' },
    { label: 'مقاله داوری‌شده', value: '+۲۵۰' },
    { label: 'دانشجوی فعال', value: '+۱۲,۵۰۰' },
  ];

  const quickFeatures = [
    {
      title: 'آناتومی سه‌بعدی تعاملی گوش',
      desc: 'ساختارهای گوش خارجی، میانی، داخلی و نقشه فرکانسی تونوتوپیک غشای پایه را کاوش کنید.',
      icon: Ear,
      tab: 'anatomy',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'آزمایشگاه شبیه‌ساز آدیوگرام',
      desc: 'آستانه‌های هدایت هوایی و استخوانی را ثبت کنید، PTA را محاسبه و Carhart notch یا noise notch را تشخیص دهید.',
      icon: Activity,
      tab: 'simulator',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'مجموعه ابزارهای بالینی',
      desc: 'محاسبه امتیاز SII به روش Count-the-dots، تبدیل RETSPL به dB SPL و ماشین‌حساب دوز نویز NIOSH.',
      icon: Sparkles,
      tab: 'tools',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="space-y-12">

      {/* Course Helix — full-screen Helix-style spiral (courses / labs / latest uploads).
          The Helix is the home page's opening view, exactly like the reference:
          full-screen black spiral, small options + caption at the bottom, toolbar below. */}
      {coursesWithIcons.length > 0 && (
        <CourseHelix
          courses={coursesWithIcons}
          labs={quickFeatures}
          onNavigateToCourse={onNavigateToCourse}
          onNavigate={onNavigate}
        />
      )}

      {/* Stats Counter Bar */}
      <ScrollReveal direction="up" delay={0.1}>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-black text-cyan-500 font-display">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* Quick Interactive Features Grid */}
      <section className="space-y-6">
        <ScrollReveal direction="up">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-display">
                آزمایشگاه‌ها و موتورهای یادگیری بالینی
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                شبیه‌سازهای عملی طراحی‌شده برای دانشجویان، دستیاران و شنوایی‌شناسان بالینی.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <StaggerItem key={idx}>
                <TiltCard
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer h-full flex flex-col justify-between group"
                  onClick={() => onNavigate(feat.tab)}
                >
                  <div className="space-y-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${feat.color} text-white w-fit shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-bold text-cyan-500 group-hover:translate-x-1 transition-transform">
                    <span>ورود به ماژول</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <ScrollReveal direction="up">
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-right">
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white font-display">
              آماده‌ای مهارت تشخیصی‌ت رو محک بزنی؟
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
              موارد بالینی واقعی را با اتوسکوپی، تمپانومتری، نمودارهای لیتنسی ABR و بسته‌های آدیومتری گفتار حل کن.
            </p>
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={() => onNavigate('cases')}
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 shrink-0 transition-all cursor-pointer"
            >
              حل موارد بیماران
            </button>
          </Magnetic>
        </div>
      </ScrollReveal>

    </div>
  );
};

