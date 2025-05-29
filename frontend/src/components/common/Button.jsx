import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-md',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle} ${widthStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
