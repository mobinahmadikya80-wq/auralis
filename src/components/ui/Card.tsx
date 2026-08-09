import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'gradient' | 'bordered';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-3xl border transition-all duration-200 overflow-hidden';

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantStyles = {
    default: 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm',
    flat: 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800',
    gradient: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 border-zinc-800 text-white shadow-xl',
    bordered: 'bg-transparent border-zinc-300 dark:border-zinc-700',
  };

  const hoverStyles = hoverEffect
    ? 'hover:border-cyan-500/50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
