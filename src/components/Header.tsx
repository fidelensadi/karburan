import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel } from 'lucide-react';
import { Avatar } from './Avatar';
import { AlertBadge } from './alerts/AlertBadge';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Fuel className="h-8 w-8" />
            <span className="text-xl font-bold">Karburan</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/alerts')} className="p-2">
              <AlertBadge />
            </button>
            <button onClick={() => navigate('/profile')} className="p-2">
              <Avatar size="sm" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};