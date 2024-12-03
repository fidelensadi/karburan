import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { SettingsForm } from '../components/settings/SettingsForm';
import { AvatarUpload } from '../components/settings/AvatarUpload';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <AvatarUpload />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <SettingsForm />
        </div>
      </main>
    </div>
  );
};