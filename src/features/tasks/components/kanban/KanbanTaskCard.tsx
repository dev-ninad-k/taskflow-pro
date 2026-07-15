import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types';

type Props = {
  task: Task;
};

function KanbanTaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priorityStyles = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-red-100 text-red-700',
  };

  const statusStyles = {
    todo: 'bg-gray-100 text-gray-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    done: 'bg-green-100 text-green-700',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-lg
        border
        bg-white
        p-4
        shadow-sm
        transition
        cursor-grab
        active:cursor-grabbing
        hover:-translate-y-1
        hover:shadow-md
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>

        {task.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span
            className={`
              rounded-full px-2 py-1 text-xs font-medium
              ${statusStyles[task.status]}
            `}
          >
            {task.status}
          </span>

          <span
            className={`
              rounded-full px-2 py-1 text-xs font-medium
              ${priorityStyles[task.priority]}
            `}
          >
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
}

export default KanbanTaskCard;
