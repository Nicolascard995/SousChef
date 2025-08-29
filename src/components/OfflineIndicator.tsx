import { useOfflineState } from '../hooks/useOfflineState';
import { Wifi, WifiOff, Clock } from 'lucide-react';

const OfflineIndicator = () => {
  const { isOnline, offlineQueue } = useOfflineState();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-3 rounded-lg shadow-lg z-50">
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">Sin conexión</span>
        {offlineQueue.length > 0 && (
          <div className="flex items-center gap-1 bg-destructive-foreground/20 px-2 py-1 rounded">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{offlineQueue.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
