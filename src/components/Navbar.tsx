import React from 'react';
import { 
  Ear, 
  Search, 
  BookOpen, 
  Activity, 
  Calculator, 
  Stethoscope, 
  Sparkles, 
  Bookmark, 
  BrainCircuit,
  Command,
  Menu
} from 'lucide-react';
import { DarkModeToggle } from './layout/DarkModeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommandPalette: () => void;
  onOpenSidebar: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCommandPalette,
  onOpenSidebar,
  savedCount
}) => {
  const navItems = [
    { id: 'library', label: 'مرکز منابع', icon: BookOpen },
    { id: 'anatomy', label: 'آناتومی سه‌بعدی گوش', icon: Ear },
    { id: 'simulator', label: 'آزمایشگاه آدیوگرام', icon: Activity },
    { id: 'tools', label: 'ابزارهای محاسباتی', icon: Calculator },
    { id: 'cases', label: 'مطالعات موردی', icon: Stethoscope },
    { id: 'aitutor', label: 'دستیار هوشمند', icon: Sparkles, badge: 'AI' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSidebar}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              title="باز کردن منوی ناوبری"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('library')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/10 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white font-display">
                    AURALIS
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 uppercase tracking-widest hidden sm:inline-block">
                    آرشیو باز
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-500' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Trigger, Dark Mode Toggle & Saved Items */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">جست‌وجو در آرشیو...</span>
              <kbd className="hidden md:flex items-center gap-0.5 text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400 font-mono">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            <DarkModeToggle />

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative p-2 rounded-xl text-xs transition-colors border ${
                activeTab === 'saved'
                  ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
              title="موارد و یادداشت‌های ذخیره‌شده"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto gap-1 py-2 border-t border-zinc-200/60 dark:border-zinc-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
