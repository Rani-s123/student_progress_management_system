import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'default',
          'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100': variant === 'success',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100': variant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100': variant === 'error',
          'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100': variant === 'info',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
};