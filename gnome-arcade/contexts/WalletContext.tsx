'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdenaSDK, AdenaWalletProvider } from '@adena-wallet/sdk';

const walletProvider = new AdenaWalletProvider();
const adenaSDK = new AdenaSDK(walletProvider);

type AccountStatusType = 'ACTIVE' | 'IN_ACTIVE';

interface AccountInfo {
  accountNumber: string;
  address: string;
  coins: string;
  chainId: string;
  sequence: string;
  status: AccountStatusType;
  publicKey: {
    '@type': string;
    value: string;
  } | null;
}

interface WalletContextType {
  isConnected: boolean;
  isLoading: boolean;
  account: AccountInfo | null;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<AccountInfo | null>(null);

  const saveToLocalStorage = (connected: boolean, accountData: AccountInfo | null) => {
    localStorage.setItem('walletConnected', JSON.stringify(connected));
    localStorage.setItem('walletAccount', JSON.stringify(accountData));
  };

  const loadFromLocalStorage = () => {
    const savedConnected = localStorage.getItem('walletConnected');
    const savedAccount = localStorage.getItem('walletAccount');

    if (savedConnected) {
      setIsConnected(JSON.parse(savedConnected));
    }

    if (savedAccount) {
      setAccount(JSON.parse(savedAccount));
    }
  };

  const connect = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await adenaSDK.connectWallet();
      const accountResponse = await adenaSDK.getAccount();
      if (accountResponse.data) {
        setIsConnected(true);
        setAccount(accountResponse.data);
        saveToLocalStorage(true, accountResponse.data);
      }
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setIsLoading(false);
      return false;
    }
  };

  const disconnect = async (): Promise<void> => {
    try {
      await adenaSDK.disconnectWallet();
      setIsConnected(false);
      setAccount(null);
      saveToLocalStorage(false, null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      loadFromLocalStorage();
      const connected = await adenaSDK.getConnectionState();
      if (connected === 2) {
        const accountResponse = await adenaSDK.getAccount();
        if (accountResponse.data) {
          setIsConnected(true);
          setAccount(accountResponse.data);
          saveToLocalStorage(true, accountResponse.data);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, isLoading, account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
