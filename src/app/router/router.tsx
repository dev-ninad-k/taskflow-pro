import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/DashboardLayout';

import DashboardPage from '@/pages/DashboardPage';
import TasksPage from '@/pages/TasksPage';
import BoardPage from '@/pages/BoardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import KanbanPage from '@/pages/KanbanPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'board',
        element: <BoardPage />,
      },
      {
        path: '/kanban',
        element: <KanbanPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
