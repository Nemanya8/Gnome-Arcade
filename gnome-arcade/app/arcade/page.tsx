'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Arcade() {
  const { isConnected, disconnect, account } = useWallet();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Gnome Arcade</h1>
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
        </CardHeader>
        <CardContent>
          {account ? (
            <div className="space-y-2">
              <p><strong>Address:</strong> {account.address}</p>
              <p><strong>Coins:</strong> {account.coins}</p>
              <p><strong>Chain ID:</strong> {account.chainId}</p>
              <p><strong>Account Number:</strong> {account.accountNumber}</p>
              <p><strong>Sequence:</strong> {account.sequence}</p>
              <p><strong>Status:</strong> {account.status}</p>
              {account.publicKey && (
                <div>
                  <p><strong>Public Key Type:</strong> {account.publicKey['@type']}</p>
                  <p><strong>Public Key Value:</strong> {account.publicKey.value}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Loading account information...</p>
          )}
        </CardContent>
      </Card>
      <Button onClick={handleDisconnect} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Disconnect Wallet
      </Button>
    </div>
  );
}

