import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, LogOut } from 'lucide-react';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 text-blue-600"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </button>
        </div>

        <ProfileHeader />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Téléphone
              </label>
              <p className="text-gray-900">{user?.phone}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Carte
              </label>
              <p className="text-gray-900">{user?.cardNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solde Actuel
              </label>
              <p className="text-gray-900">{user?.balance.toFixed(2)} L</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Se déconnecter</span>
        </button>
      </main>
    </div>
  );
};