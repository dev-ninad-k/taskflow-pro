import type { Task } from '../../types';
import KanbanColumn from './KanbanColumn';

type Props = {
  tasks: Task[];
};

function KanbanBoard({ tasks }: Props) {
  const todoTasks = tasks.filter((task) => task.status === 'todo');

  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');

  const doneTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KanbanColumn title="Todo" tasks={todoTasks} />

      <KanbanColumn title="In Progress" tasks={inProgressTasks} />

      <KanbanColumn title="Done" tasks={doneTasks} />
    </div>
  );
}

export default KanbanBoard;
