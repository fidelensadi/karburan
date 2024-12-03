import React from 'react';
import { User } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showUploadHint?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', showUploadHint = false }) => {
  const user = useStore((state) => state.user);
  
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  if (!user?.settings.avatar) {
    return (
      <div className={`${sizeClasses[size]} bg-blue-100 rounded-full flex items-center justify-center relative group`}>
        <User className={`${iconSizes[size]} text-blue-600`} />
        {showUploadHint && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs">Modifier</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative group`}>
      <img
        src={user.settings.avatar}
        alt={user.name}
        className="rounded-full w-full h-full object-cover"
      />
      {showUploadHint && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs">Modifier</span>
        </div>
      )}
    </div>
  );
};