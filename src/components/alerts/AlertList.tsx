import React from 'react';
import { AlertTriangle, MapPin, BarChart2, Package2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Alert, AlertType } from '../../types/alerts';

const AlertIcon: React.FC<{ type: AlertType }> = ({ type }) => {
  const icons = {
    usage: BarChart2,
    location: MapPin,
    stock: Package2,
    security: AlertTriangle,
  };

  const Icon = icons[type];
  return <Icon className="h-5 w-5" />;
};

const getSeverityStyles = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-600 border-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    default:
      return 'bg-blue-100 text-blue-600 border-blue-200';
  }
};

export const AlertList: React.FC = () => {
  const alerts = useStore((state) => state.alerts);
  const markAlertAsRead = useStore((state) => state.markAlertAsRead);
  const dismissAlert = useStore((state) => state.dismissAlert);

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune alerte
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start p-4 rounded-lg border ${getSeverityStyles(
            alert.severity
          )} ${alert.read ? 'opacity-75' : ''}`}
        >
          <div className="flex-shrink-0 mr-3">
            <AlertIcon type={alert.type} />
          </div>
          <div className="flex-grow">
            <p className="font-medium">{alert.message}</p>
            <p className="text-sm opacity-75">
              {alert.timestamp.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => dismissAlert(alert.id)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};