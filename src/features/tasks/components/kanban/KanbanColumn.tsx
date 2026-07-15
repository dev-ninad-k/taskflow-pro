import { useDroppable } from '@dnd-kit/core';
import type { Task } from '../../types';
import KanbanTaskCard from './KanbanTaskCard';
import type { TaskStatus } from '../../types';

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
};

function KanbanColumn({ title, status, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const styles = {
    todo: {
      header: 'bg-gray-100 text-gray-700',
      border: 'border-gray-300',
    },
    'in-progress': {
      header: 'bg-yellow-100 text-yellow-700',
      border: 'border-yellow-300',
    },
    done: {
      header: 'bg-green-100 text-green-700',
      border: 'border-green-300',
    },
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-lg border
        ${styles[status].border}
        bg-white
        p-4
        min-h-[400px]
      `}
    >
      <div
        className={`
          mb-4 flex items-center justify-between
          rounded-md px-3 py-2
          ${styles[status].header}
        `}
      >
        <h2 className="font-semibold">{title}</h2>

        <span className="rounded-full bg-white px-2 py-1 text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center text-sm text-gray-400">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => <KanbanTaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
