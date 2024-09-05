import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { Metadata } from 'next';

// Export a static metadata object
// All pages inherited by this layout will use it
export const metadata: Metadata = {
  // title: 'Acme Dashboard | NextJS 14 Tutorial',

  // can also use template for dynamic title
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard | NextJS 14 Tutorial',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://nextjs14-acme-dashboard.hoangdesu.com'), // set a base URL prefix that require a fully qualified URL
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
