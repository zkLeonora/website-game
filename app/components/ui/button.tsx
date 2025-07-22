// app/components/ui/button.tsx
'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded font-bold text-white',
        variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700',
        className
      )}
    />
  );
}
