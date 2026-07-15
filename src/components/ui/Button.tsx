import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, className = '', type, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      {...props}
      className={`
        rounded-md px-4 py-2 font-medium text-white transition
        bg-blue-600 hover:bg-blue-700
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
