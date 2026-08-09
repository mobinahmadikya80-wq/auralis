import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  badge?: string;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  onChange?: (id: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId: externalActiveId,
  onChange,
  variant = 'pills',
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(tabs[0]?.id || '');
  const isControlled = externalActiveId !== undefined;
  const currentActiveId = isControlled ? externalActiveId : internalActiveId;

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalActiveId(id);
    onChange?.(id);
  };

  const activeTabObj = tabs.find((t) => t.id === currentActiveId);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Tab Header Bar */}
      <div
        className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
          variant === 'segmented'
            ? 'p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800'
            : variant === 'underline'
            ? 'border-b border-zinc-200 dark:border-zinc-800 gap-4'
            : 'gap-2'
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveId;
          const Icon = tab.icon;

          if (variant === 'segmented') {
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`flex-1 min-w-[100px] px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-cyan-500/10 text-cyan-500 font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          }

          if (variant === 'underline') {
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`pb-3 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full" />
                )}
              </button>
            );
          }

          // Default 'pills'
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-zinc-950 font-extrabold shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                  isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-cyan-500/10 text-cyan-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content rendering if tab items have content prop */}
      {activeTabObj?.content && (
        <div className="pt-2 animate-fadeIn">
          {activeTabObj.content}
        </div>
      )}
    </div>
  );
};
