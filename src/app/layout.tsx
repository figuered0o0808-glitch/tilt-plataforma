import type { Metadata } from 'next';

import './globals.css';

import { PROGRAM_NAME, PROGRAM_TAGLINE } from '@/config/program';
import { AppProvider } from '@/state/AppState';

export const metadata: Metadata = {
  title: PROGRAM_NAME,
  description: PROGRAM_TAGLINE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
