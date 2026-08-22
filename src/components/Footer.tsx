import React from 'react';
import { BrainCircuit, Heart, Rss, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs py-12 transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-white font-display">
                AURALIS
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
              اورالیس یک آرشیو آکادمیک آزاد و مجموعه شبیه‌سازی بالینی برای دانشجویان، پژوهشگران، اساتید و شنوایی‌شناسان سراسر جهانه؛ طراحی‌شده برای ارتقای آموزش علم شنوایی.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-500">
              <a 
                href="/rss.xml" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono hover:text-cyan-500 transition-colors"
                title="فید RSS اورالیس"
              >
                <Rss className="w-3 h-3 text-orange-500" />
                <span>فید RSS</span>
              </a>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono hover:text-cyan-500 transition-colors"
                title="نقشه سایت XML"
              >
                <FileCode className="w-3 h-3 text-cyan-500" />
                <span>نقشه سایت</span>
              </a>
            </div>
          </div>

          {/* Col 3: Academic Modules */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              مرکز آکادمیک
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-500 transition-colors text-left">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-cyan-500 transition-colors text-left">
                  دروس و سرفصل‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teachers')} className="hover:text-cyan-500 transition-colors text-left">
                  فهرست اساتید
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('videos')} className="hover:text-cyan-500 transition-colors text-left">
                  ویدیوهای آموزشی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research')} className="hover:text-cyan-500 transition-colors text-left">
                  مقالات پژوهشی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-cyan-500 transition-colors text-left">
                  کتاب‌های بالینی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Simulators & Tools */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              شبیه‌سازها و ابزارها
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('anatomy')} className="hover:text-cyan-500 transition-colors text-left">
                  آناتومی سه‌بعدی گوش
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulator')} className="hover:text-cyan-500 transition-colors text-left">
                  آزمایشگاه شبیه‌ساز آدیوگرام
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-cyan-500 transition-colors text-left">
                  ماشین‌حساب‌های بالینی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cases')} className="hover:text-cyan-500 transition-colors text-left">
                  موارد بالینی بیماران
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aitutor')} className="hover:text-cyan-500 transition-colors text-left">
                  دستیار هوشمند بالینی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Standards & Compliance */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              استانداردهای بالینی
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>تن خالص ANSI S3.6</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>آزمون ISO 8253</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>حد مواجهه NIOSH</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>Mueller-Killion SII</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>دسترس‌پذیر WCAG 2.1 AA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Accessibility Bar */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} پلتفرم آزاد اورالیس. رایگان برای استفاده‌ی آموزشی و پژوهشی غیرتجاری.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-cyan-500 transition-colors">
              درباره ما
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-cyan-500 transition-colors">
              تماس با ما
            </button>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">
              Robots.txt
            </a>
            <span className="flex items-center gap-1 text-zinc-400">
              <span>ساخته‌شده برای علم شنوایی‌شناسی</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
