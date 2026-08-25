import React from 'react';
import { 
  X, 
  Home,
  Ear, 
  Activity, 
  Calculator, 
  Stethoscope, 
  Sparkles, 
  Bookmark, 
  BrainCircuit,
  GraduationCap,
  UserCheck,
  Video,
  FileText,
  Presentation,
  Library,
  Microscope,
  Megaphone,
  Download,
  Info,
  Mail,
  Search,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  savedCount
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'ناوبری اصلی',
      items: [
        { id: 'home', label: 'صفحه اصلی', icon: Home, desc: 'نمای کلی و برجسته‌ها' },
        { id: 'search', label: 'جست‌وجوی جامع', icon: Search, desc: 'جست‌وجو در همه منابع' },
        { id: 'courses', label: 'دروس و سرفصل‌ها', icon: GraduationCap, desc: 'برنامه درسی شنوایی‌شناسی' },
        { id: 'teachers', label: 'اساتید بالینی', icon: UserCheck, desc: 'اساتید و پژوهشگران' },
      ]
    },
    {
      title: 'ابزارها و آزمایشگاه‌های تعاملی',
      items: [
        { id: 'anatomy', label: 'آناتومی سه‌بعدی گوش', icon: Ear, desc: 'نقشه فرکانسی تونوتوپیک' },
        { id: 'simulator', label: 'شبیه‌ساز آدیوگرام', icon: Activity, desc: 'آزمایشگاه آدیوگرام تن خالص' },
        { id: 'tools', label: 'ماشین‌حساب‌های بالینی', icon: Calculator, desc: 'ابزارهای SII، نویز و RETSPL' },
        { id: 'cases', label: 'موارد بالینی', icon: Stethoscope, desc: 'بسته تشخیصی بیماران' },
        { id: 'exams', label: 'آزمون‌های هفتگی', icon: ClipboardList, desc: 'آزمون تولیدشده با هوش مصنوعی' },
        { id: 'aitutor', label: 'دستیار هوشمند بالینی', icon: Sparkles, desc: 'مدرس مجهز به هوش مصنوعی', badge: 'AI' },
      ]
    },
    {
      title: 'گنجینه رسانه و منابع',
      items: [
        { id: 'videos', label: 'ویدیوهای آموزشی', icon: Video, desc: 'ویدیوهای اتوسکوپی و ABR' },
        { id: 'pdf', label: 'راهنماهای بالینی PDF', icon: FileText, desc: 'دستورالعمل‌های ANSI/BSA' },
        { id: 'slides', label: 'اسلایدهای درسی', icon: Presentation, desc: 'فایل‌های پاورپوینت' },
        { id: 'books', label: 'کتاب‌های مرجع', icon: Library, desc: 'کتاب‌های الکترونیکی' },
        { id: 'research', label: 'مقالات پژوهشی', icon: Microscope, desc: 'مطالعات داوری‌شده' },
        { id: 'announcements', label: 'اخبار و رویدادها', icon: Megaphone, desc: 'همایش‌ها و به‌روزرسانی‌ها' },
        { id: 'downloads', label: 'آرشیو دانلودها', icon: Download, desc: 'فایل‌های اکسل و صوتی' },
        { id: 'saved', label: 'دفتر مطالعه ذخیره‌شده', icon: Bookmark, desc: 'یادداشت‌های نشان‌شده', count: savedCount },
      ]
    },
    {
      title: 'پلتفرم',
      items: [
        { id: 'about', label: 'درباره اورالیس', icon: Info, desc: 'رسالت و استانداردها' },
        { id: 'contact', label: 'ارتباط با پشتیبانی', icon: Mail, desc: 'سوالات دانشگاهی' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer */}
      <div className="relative w-84 max-w-[85vw] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
        
        <div className="space-y-6">
          {/* Top Branding & Close */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-base text-zinc-900 dark:text-white font-display">AURALIS</span>
                <p className="text-[10px] text-zinc-500">منوی ناوبری</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-5">
            {sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 pb-1">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full text-right px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${
                          isActive ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-400">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500 text-zinc-950 font-bold">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metadata Info */}
        <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">پلتفرم متن‌باز اورالیس نسخه ۱.۰</p>
          <p>ساخته‌شده برای آموزش علم شنوایی‌شناسی</p>
        </div>

      </div>
    </div>
  );
};
