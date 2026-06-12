import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside
      style={{
        width: '220px',
        padding: '1rem',
        borderRight: '1px solid #ddd',
      }}
    >
      <h2>TaskFlow Pro</h2>

      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/tasks">Tasks</NavLink>
          </li>

          <li>
            <NavLink to="/board">Board</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
