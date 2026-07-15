import { useSelector } from 'react-redux';
import KanbanBoard from '@/features/tasks/components/kanban/KanbanBoard';
import { selectTasks } from '@/features/tasks/store/selectors';

function KanbanPage() {
  const tasks = useSelector(selectTasks);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kanban Board</h1>

        <p className="text-sm text-gray-500">Manage tasks by workflow status</p>
      </div>

      <KanbanBoard tasks={tasks} />
    </div>
  );
}

export default KanbanPage;
