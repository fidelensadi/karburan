import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Header } from '../components/Header';
import { AlertList } from '../components/alerts/AlertList';

export const Alerts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Alertes</h1>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 text-blue-600"
          >
            <Settings className="h-5 w-5" />
            <span>Configurer</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <AlertList />
        </div>
      </main>
    </div>
  );
};