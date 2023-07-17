import '@/c/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/c/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My NextJS And Strapi Blog',
    description: 'This is a NextJS and Strapi starter blog created by @kristijorgji',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src={'/js/theme-toggle.js'} />
            </head>
            <body className={inter.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
