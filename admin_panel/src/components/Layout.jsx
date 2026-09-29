import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
