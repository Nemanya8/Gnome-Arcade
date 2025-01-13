import { AdenaSDK,  AdenaWalletProvider } from '@adena-wallet/sdk';

const walletProvider = new  AdenaWalletProvider();
export const adenaSDK = new AdenaSDK(walletProvider);
