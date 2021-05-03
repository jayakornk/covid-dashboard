import { useEffect, useState } from 'react';

export const isServer = (): boolean => typeof window === 'undefined';

function getWindowDimensions() {
  if (!isServer()) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

export default function useWindowDimensions(): {
  width: number;
  height: number;
} {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (!isServer()) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}
