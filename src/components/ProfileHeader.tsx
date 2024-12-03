import React from 'react';
import { useStore } from '../store/useStore';
import { Avatar } from './Avatar';

export const ProfileHeader: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-4">
        <Avatar size="md" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};