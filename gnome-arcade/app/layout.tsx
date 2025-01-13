import { WalletProvider } from '@/contexts/WalletContext';
import './globals.css';
import AppHeader from '@/components/AppHeader';

export const metadata = {
  title: 'Gnome Arcade',
  description: 'Arcade games based on gno.land chain',
  icons: {
    icon: '/gnome-logo.svg',
  },
};

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

