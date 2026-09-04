import React from 'react';
import { User, Sparkles, Sprout, Feather, Compass, Heart, Palette, Leaf } from 'lucide-react';

export const Avatar = ({
  name = 'User',
  seed = 'sprout',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  statusDot = null // 'emerald' | 'amber' | 'rose'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10'
  };

  const getIcon = () => {
    switch (seed) {
      case 'sparkles': return <Sparkles className={iconSizeMap[size]} />;
      case 'sprout': return <Sprout className={iconSizeMap[size]} />;
      case 'feather': return <Feather className={iconSizeMap[size]} />;
      case 'compass': return <Compass className={iconSizeMap[size]} />;
      case 'heart': return <Heart className={iconSizeMap[size]} />;
      case 'palette': return <Palette className={iconSizeMap[size]} />;
      default: return <Leaf className={iconSizeMap[size]} />;
    }
  };

  const dotColorMap = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={`${sizeMap[size]} rounded-full bg-gradient-to-tr from-sage-200 to-cream-200 border-2 border-white shadow-soft flex items-center justify-center text-sage-800 font-semibold ${className}`}
        title={name}
      >
        {getIcon()}
      </div>
      {statusDot && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${dotColorMap[statusDot] || 'bg-emerald-500'}`}
        />
      )}
    </div>
  );
};
