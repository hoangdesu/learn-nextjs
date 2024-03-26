import { ReactNode } from 'react';
import SideNav from '../ui/dashboard/sidenav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div>
        <SideNav />
      </div>
      <div>
        <h1>Content from layout.tsx</h1>
        <div>{children}</div>
      </div>
    </div>

    // same as not having a layout file
    // <>{children}</>
  );
}
