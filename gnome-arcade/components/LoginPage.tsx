'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { isConnected, isLoading, connect } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/arcade');
    }
  }, [isConnected, router]);

  const handleConnect = async () => {
    await connect();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Gnome Arcade</h1>
      <Button 
        onClick={handleConnect} 
        disabled={isLoading || isConnected}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
      >
        {isLoading ? 'Connecting...' : 'Connect With Adena'}
      </Button>
    </div>
  );
}

