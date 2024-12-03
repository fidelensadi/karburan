import React from 'react';
import { Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AlertBadge: React.FC = () => {
  const alerts = useStore((state) => state.alerts);
  const unreadCount = alerts.filter((alert) => !alert.read).length;

  if (unreadCount === 0) return null;

  return (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-600" />
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {unreadCount}
      </div>
    </div>
  );
};