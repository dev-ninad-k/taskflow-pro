import { Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div>
      <h2>TaskFlow Pro</h2>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/tasks">Tasks</Link> |{' '}
        <Link to="/board">Board</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
