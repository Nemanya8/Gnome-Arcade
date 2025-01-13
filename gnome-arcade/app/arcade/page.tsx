'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';

export default function Arcade() {
  const { isConnected, disconnect } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Gnome Arcade</h1>
      <p className="mb-4">You are now connected with your Adena wallet.</p>
      <Button onClick={handleDisconnect} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Disconnect Wallet
      </Button>
    </div>
  );
}

