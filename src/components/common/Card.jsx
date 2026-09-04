import React from 'react';

export const Card = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'subtle' | 'elevated' | 'glass' | 'interactive' | 'accent'
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';

  const variantStyles = {
    default: 'bg-white border border-cream-200/80 shadow-soft p-5',
    subtle: 'bg-sand-50/70 border border-cream-200/60 p-5',
    elevated: 'bg-white border border-cream-200/60 shadow-soft-lg p-6',
    interactive: 'bg-white border border-cream-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 cursor-pointer p-5',
    accent: 'bg-gradient-to-br from-sage-50 to-sand-50 border border-sage-200/70 p-6 shadow-soft',
    terracottaSubtle: 'bg-terracotta-50/60 border border-terracotta-200/60 p-5'
  };

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
