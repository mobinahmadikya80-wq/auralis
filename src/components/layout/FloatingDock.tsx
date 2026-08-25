import React from 'react';
import { motion } from 'motion/react';
import { 
  Ear, 
  Activity, 
  Calculator, 
  Stethoscope, 
  Sparkles, 
  Bookmark,
  Home,
  ClipboardList
} from 'lucide-react';

interface FloatingDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  setActiveTab,
  savedCount
}) => {
  const dockItems = [
    { id: 'home', label: 'خانه', icon: Home },
    { id: 'anatomy', label: 'گوش سه‌بعدی', icon: Ear },
    { id: 'simulator', label: 'آزمایشگاه', icon: Activity },
    { id: 'tools', label: 'ابزارها', icon: Calculator },
    { id: 'cases', label: 'موارد', icon: Stethoscope },
    { id: 'exams', label: 'آزمون‌ها', icon: ClipboardList },
    { id: 'aitutor', label: 'دستیار AI', icon: Sparkles, highlight: true },
    { id: 'saved', label: 'ذخیره‌ها', icon: Bookmark, count: savedCount },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-2xl bg-zinc-900/90 dark:bg-zinc-900/95 border border-zinc-700/80 dark:border-zinc-800 shadow-2xl backdrop-blur-xl flex items-center gap-1 sm:gap-2 transition-all"
    >
      {dockItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.18, y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`relative flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl cursor-pointer group ${
              isActive
                ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/25'
                : item.highlight
                ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : ''}`} />
            <span className="text-[10px] tracking-tight mt-0.5 hidden sm:inline">{item.label}</span>

            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="dockActiveDot"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-zinc-950 dark:bg-white"
              />
            )}

            {/* Badge Counter for Saved */}
            {item.count !== undefined && item.count > 0 && !isActive && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-500 text-zinc-950 text-[8px] font-bold flex items-center justify-center">
                {item.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};
