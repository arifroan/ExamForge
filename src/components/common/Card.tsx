import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm ${
        hoverable ? 'transition-all duration-200 hover:border-slate-300 hover:shadow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
