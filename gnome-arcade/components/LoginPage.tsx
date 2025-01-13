'use client'

import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LoginPage() {
  const { isConnected, isLoading, connect } = useWallet();
  const router = useRouter();
  const [connectionAttempted, setConnectionAttempted] = useState(false);

  const handleConnect = async () => {
    const connected = await connect();
    setConnectionAttempted(true);
    if (connected) {
      router.push('/arcade');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Gnome Arcade</h1>
      <Button 
        onClick={handleConnect} 
        disabled={isLoading || isConnected}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect With Adena'}
      </Button>
      {connectionAttempted && !isConnected && (
        <p className="mt-4 text-red-500">Connection failed. Please try again.</p>
      )}
    </div>
  );
}

