'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { WalletProvider } from '@/contexts/WalletContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>
        {children}
      </WalletProvider>
    </NextThemesProvider>
  )
}

