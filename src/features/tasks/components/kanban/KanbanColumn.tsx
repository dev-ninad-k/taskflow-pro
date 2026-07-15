import { useDroppable } from '@dnd-kit/core';
import type { Task, TaskStatus } from '../../types';
import KanbanTaskCard from './KanbanTaskCard';

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
};

function KanbanColumn({ title, status, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const statusStyles = {
    todo: 'bg-gray-100 border-gray-300',
    'in-progress': 'bg-yellow-50 border-yellow-300',
    done: 'bg-green-50 border-green-300',
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-xl border p-4 min-h-[400px]
        transition
        ${statusStyles[status]}
        ${isOver ? 'ring-2 ring-blue-400' : ''}
      `}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
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
