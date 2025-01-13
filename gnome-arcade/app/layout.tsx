import { WalletProvider } from '@/contexts/WalletContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <WalletProvider>
        <body>{children}</body>
      </WalletProvider>
    </html>
  );
}

