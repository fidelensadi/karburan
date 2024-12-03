import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Avatar } from '../Avatar';

export const AvatarUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserSettings } = useStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserSettings({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="relative group"
      >
        <Avatar size="lg" showUploadHint />
      </button>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <Camera className="h-5 w-5" />
        <span>Changer la photo</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};