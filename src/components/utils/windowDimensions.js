import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
    return null;
  }, []);

  return windowDimensions;
};

export const useIsMobile = () => {
  const windowDimensions = useWindowDimensions();
  const mobile = !(windowDimensions.width > MOBILE_BREAKPOINT);
  return mobile;
};

export default useWindowDimensions;
