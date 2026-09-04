import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'subtle' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm'
  };

  const variantStyles = {
    primary: 'bg-sage-600 text-white hover:bg-sage-700 active:bg-sage-800 focus:ring-sage-500 shadow-sm hover:shadow',
    secondary: 'bg-cream-100 text-clay-800 hover:bg-cream-200 active:bg-cream-300 focus:ring-cream-400 border border-cream-200',
    subtle: 'bg-sage-50 text-sage-800 hover:bg-sage-100 active:bg-sage-200 focus:ring-sage-400 border border-sage-200',
    terracotta: 'bg-terracotta-500 text-white hover:bg-terracotta-600 active:bg-terracotta-700 focus:ring-terracotta-400 shadow-sm',
    outline: 'border border-sage-300 text-sage-800 hover:bg-sage-50 active:bg-sage-100 focus:ring-sage-400',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 focus:ring-rose-400',
    ghost: 'text-clay-700 hover:bg-cream-100 active:bg-cream-200 focus:ring-cream-300'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
    </button>
  );
};
