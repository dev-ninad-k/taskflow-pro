import Sidebar from '@/components/navigation/Sidebar';
import Topbar from '@/components/navigation/Topbar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  console.log('DashboardLayout render');
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
