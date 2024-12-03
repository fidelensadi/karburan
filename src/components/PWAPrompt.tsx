import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export const PWAPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">Installer Karburan</h3>
          <p className="text-sm text-gray-600">
            Installez l'application pour un accès rapide hors-ligne
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPrompt(false)}
            className="px-4 py-2 text-gray-600"
          >
            Plus tard
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Installer</span>
          </button>
        </div>
      </div>
    </div>
  );
};