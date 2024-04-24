import { useEffect, useState } from 'react';

export const useResizeWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getSize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);
  return viewportWidth;
};
