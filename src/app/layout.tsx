import React from 'react';
import type { Metadata } from 'next';
import GlobalStyle from '@/style/GlobalStyle';

export const metadata: Metadata = {
  title: 'HAMI',
  description: 'Muldum Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}