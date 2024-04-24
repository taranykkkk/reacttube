import { useEffect } from 'react';

export const useClickOutSide = (ref, callback) => {
  const handleClick = (event) => {
    if (!ref.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};
