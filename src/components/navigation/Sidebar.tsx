import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkClass =
    'block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100';
  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <h1 className="mb-6 text-2xl font-bold text-blue-600">TaskFlow</h1>

      <nav className="space-y-2">
        <NavLink className={linkClass} to="/">
          Dashboard
        </NavLink>

        <NavLink className={linkClass} to="/tasks">
          Tasks
        </NavLink>

        <NavLink className={linkClass} to="/board">
          Board
        </NavLink>

        <NavLink className={linkClass} to="/kanban">
          Kanban Board
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
