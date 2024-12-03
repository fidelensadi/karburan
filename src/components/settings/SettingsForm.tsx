import React from 'react';
import { Bell, Moon, Globe, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Toggle } from './Toggle';

export const SettingsForm: React.FC = () => {
  const { user, updateUserSettings } = useStore();
  const settings = user?.settings;

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">Notifications Push</span>
        </div>
        <Toggle
          enabled={settings.notifications}
          onChange={(enabled) => updateUserSettings({ notifications: enabled })}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">Notifications SMS</span>
        </div>
        <Toggle
          enabled={settings.smsNotifications}
          onChange={(enabled) => updateUserSettings({ smsNotifications: enabled })}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Moon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">Thème Sombre</span>
        </div>
        <Toggle
          enabled={settings.theme === 'dark'}
          onChange={(enabled) => updateUserSettings({ theme: enabled ? 'dark' : 'light' })}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-gray-600" />
          <span className="text-gray-700">Langue</span>
        </div>
        <select
          value={settings.language}
          onChange={(e) => updateUserSettings({ language: e.target.value as 'fr' | 'en' })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};