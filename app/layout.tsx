import type { Metadata } from 'next';
import { Ubuntu, Montserrat } from 'next/font/google';
import '@/styles/globals.css';

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  title: 'FlowrSpot',
  description: 'Flower spotting while hiking & traveling',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
