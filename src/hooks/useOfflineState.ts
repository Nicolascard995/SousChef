import { useState, useEffect } from 'react';

export const useOfflineState = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<Array<() => void>>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Procesar cola offline
      offlineQueue.forEach(action => action());
      setOfflineQueue([]);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  const addToOfflineQueue = (action: () => void) => {
    setOfflineQueue(prev => [...prev, action]);
  };

  return {
    isOnline,
    offlineQueue,
    addToOfflineQueue
  };
};
