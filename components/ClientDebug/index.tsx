import { useEffect, useState } from 'react';

export default function ClientDebug() {
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      isStandalone: (window.navigator as any).standalone || false,
      hasNextData: !!document.getElementById('__NEXT_DATA__'),
      baseUrl: window.location.origin,
      pathname: window.location.pathname
    };
    
    setDebugInfo(JSON.stringify(info, null, 2));
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-nord-0 text-xs p-2 max-h-32 overflow-auto">
      <pre className="text-text-secondary">{debugInfo}</pre>
    </div>
  );
}