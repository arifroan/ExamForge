import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Horizontal padding is strictly 2x vertical padding according to design guidelines
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'py-1.5 px-3 text-xs min-h-[36px]',
    md: 'py-2.5 px-5 text-sm min-h-[44px]',
    lg: 'py-3 px-6 text-base min-h-[48px]'
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-sm border border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm border border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2',
    outline: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent focus-visible:ring-2 focus-visible:ring-slate-300',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm border border-rose-600 focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2'
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg whitespace-nowrap transition-colors select-none disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
      ) : leftIcon ? (
        <span className="mr-2 shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
    </button>
  );
};
