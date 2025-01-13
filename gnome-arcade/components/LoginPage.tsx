'use client'

import { useRouter } from 'next/navigation';
import { useWallet } from '../contexts/WalletContext';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { isConnected, connect } = useWallet();
  const router = useRouter();

  const handleConnect = async () => {
    await connect();
    if (isConnected) {
      router.push('/arcade');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Gnome Arcade</h1>
      <Button onClick={handleConnect} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Connect With Adena
      </Button>
    </div>
  );
}

