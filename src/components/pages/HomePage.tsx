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
  Award, 
  Users, 
  Download,
  Calendar,
  CheckCircle2,
  Ear,
  Search,
  Upload
} from 'lucide-react';
import { EDUCATIONAL_RESOURCES } from '../../data/resources';
import { EducationalResource } from '../../types';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../motion/ScrollReveal';
import { TiltCard } from '../motion/TiltCard';
import { Magnetic } from '../motion/Magnetic';
import { getCourses } from '../../content/loader';
import { assetUrl } from '../../utils/assetPath';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectResource: (res: EducationalResource) => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectResource, onNavigateToCourse }) => {
  const featuredResources = EDUCATIONAL_RESOURCES.filter(r => r.featured).slice(0, 4);
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
    {
      title: 'دستیار هوشمند بالینی',
      desc: 'برای سوالات مربوط به الکتروفیزیولوژی، لیتنسی ABR و مسائل دهلیزی از دستیار هوش مصنوعی ما کمک بگیرید.',
      icon: Sparkles,
      tab: 'aitutor',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="space-y-12">
      
      {/* Hero Banner Container */}
      <ScrollReveal direction="up" duration={0.7}>
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 text-white border border-zinc-800 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>برترین پلتفرم آزاد علم و عمل بالینی شنوایی‌شناسی</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-[1.15]">
              تسلط بر علم شنوایی‌شناسی و <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">عمل بالینی</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              به کتاب‌های درسی، جلسات ویدیویی، پروتکل‌های الکتروفیزیولوژی ABR، بسته‌های موارد بیماران واقعی و ابزارهای آدیومتری کالیبره‌شده با استاندارد ANSI، همه در یک فضای کاری یکپارچه دسترسی داشته باشید.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>مشاهده سرفصل‌ها</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>ورود به آزمایشگاه آدیوگرام</span>
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <button
                  onClick={() => onNavigate('recent-uploads')}
                  className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>فایل‌های اخیراً آپلود‌شده</span>
                </button>
              </Magnetic>
            </div>

            {/* Direct course-icon shortcuts */}
            {coursesWithIcons.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {coursesWithIcons.map((course) => (
                  <Magnetic key={course.id} strength={0.2}>
                    <button
                      onClick={() => onNavigateToCourse(course.id)}
                      title={course.title}
                      aria-label={course.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-zinc-700 hover:border-cyan-400 hover:scale-110 transition-all shadow-md cursor-pointer"
                    >
                      <img
                        src={assetUrl(course.icon)}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </Magnetic>
                ))}
              </div>
            )}
          </div>

          {/* Decorative ambient orb */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        </section>
      </ScrollReveal>

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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Featured Resources Section */}
      <section className="space-y-6">
        <ScrollReveal direction="up">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-display">
                منابع بالینی برگزیده
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                فصل‌ها، مقالات و جلسات ویدیویی منتخب و پرکاربرد.
              </p>
            </div>
            <button
              onClick={() => onNavigate('library')}
              className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1"
            >
              <span>مشاهده کل آرشیو</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredResources.map((res) => (
            <StaggerItem key={res.id}>
              <TiltCard
                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer space-y-4 group"
                onClick={() => onSelectResource(res)}
              >
                <div className="flex items-center justify-between">
                  <span dir="auto" className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {res.topic}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {res.readTimeOrDuration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 dir="auto" className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {res.title}
                  </h3>
                  <p dir="auto" className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span dir="auto">نویسنده: {res.author}</span>
                  <span className="text-cyan-500 font-bold group-hover:translate-x-1 transition-transform">مطالعه ←</span>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
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
