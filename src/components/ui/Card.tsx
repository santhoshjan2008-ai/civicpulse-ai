import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  selected?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, selected = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] p-5 transition-all duration-200',
          hoverable && 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 cursor-pointer',
          selected && 'ring-2 ring-brand-600 border-brand-500 shadow-brand-500/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

