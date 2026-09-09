import type { Metadata } from 'next';

import './globals.css';

import { PROGRAM_NAME, PROGRAM_TAGLINE } from '@/config/program';
import { t } from '@/i18n/strings';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { AppProvider } from '@/state/AppState';

export const metadata: Metadata = {
  title: {
    default: PROGRAM_NAME,
    template: `%s | ${PROGRAM_NAME}`,
  },
  description: `${PROGRAM_TAGLINE}. ${t.comum.rodape.descricao}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AppProvider>
      </body>
    </html>
  );
}
