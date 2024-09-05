import { ReactNode } from 'react';
import SideNav from '../ui/dashboard/sidenav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Home',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>

    // same as not having a layout file
    // <>{children}</>
  );
}
