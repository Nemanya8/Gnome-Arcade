import { WalletProvider } from '@/contexts/WalletContext';
import './globals.css';
import AppHeader from '@/components/AppHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <WalletProvider>
        <body>
          <AppHeader />
          <main>{children}</main>
        </body>
      </WalletProvider>
    </html>
  );
}

