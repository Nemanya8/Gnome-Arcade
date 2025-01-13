'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdenaSDK, AdenaWalletProvider } from '@adena-wallet/sdk';

const walletProvider = new AdenaWalletProvider();
const adenaSDK = new AdenaSDK(walletProvider);

interface WalletContextType {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      adenaSDK.connectWallet().then(() => {
        setIsConnected(true);
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    adenaSDK.disconnectWallet();
    setIsConnected(false);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await adenaSDK.getConnectionState();
      if (connected === 2) {
        setIsConnected(true);
      }
    };
    checkConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, connect, disconnect }}>
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

