import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDeviceType('mobile');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 1024) {
        setDeviceType('tablet');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setDeviceType('desktop');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop
  };
};
