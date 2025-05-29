import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
}) => {
  const baseStyle = 'bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg';
  const hoverStyle = hoverEffect
    ? 'transform transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyle} ${hoverStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
