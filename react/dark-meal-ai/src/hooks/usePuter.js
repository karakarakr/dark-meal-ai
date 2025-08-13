import { useEffect, useState } from 'react';

export function usePuter() {
  const [puter, setPuter] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;

    script.onload = () => {
      if (window.puter) {
        setPuter(window.puter);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return puter;
}
