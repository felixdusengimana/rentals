import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading, className, outline, children, ...props }) => {
  return (
    <button
      {...props}
      className={`btn ${outline ? 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white' : 'bg-blue-500 text-white hover:bg-blue-700'} ${isLoading ? 'cursor-wait' : ''} flex items-center justify-center px-4 py-2 rounded-md transition duration-200 ${className}`}
      disabled={isLoading || props.disabled}
    >
      {children}
      {isLoading && <span className="ml-2 animate-spin border-2 border-t-2 border-blue-500 border-transparent rounded-full w-4 h-4"></span>}
    </button>
  );
};

export default Button;
