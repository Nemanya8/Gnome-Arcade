'use client'

import { CircleDollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import Image from 'next/image';

export default function AppHeader() {
  const router = useRouter();
  const { isConnected, disconnect, account, connect } = useWallet();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  return (
    isConnected && (
    <header className="flex items-center justify-between px-32 py-4 bg-emerald-800 text-white">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => router.push('/arcade')}
      >
        <div className="bg-white rounded-lg p-0">
          <Image 
        src="/gnome-logo.svg" 
        alt="Gnome Arcade Logo" 
        width={50} 
        height={50}
          />
        </div>
        <h1 className="ml-2 text-2xl font-bold">Gnome Arcade</h1>
      </div>
      {isConnected && account ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-100 text-black font-bold border-emerald-600 hover:bg-gray-200 text-lg">
                {shortenAddress(account.address)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push('/account')} className="text-lg">
                <CircleDollarSign className="mr-2 h-5 w-5" />
                <span>Faucet</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/account')} className="text-lg">
                <User className="mr-2 h-5 w-5" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDisconnect} className="text-lg">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      ) : (
        <Button onClick={connect} className="bg-emerald-700 text-white hover:bg-emerald-600">
          Connect Wallet
        </Button>
      )}
    </header>
    )
  );
}

