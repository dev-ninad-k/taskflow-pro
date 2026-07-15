import { useDraggable } from '@dnd-kit/core';
import type { Task } from '../../types';

type Props = {
  task: Task;
};

function KanbanTaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const priorityStyles = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-red-100 text-red-700',
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        rounded-lg
        bg-white
        p-4
        shadow-sm
        border
        border-gray-200
        cursor-grab
        transition
        hover:shadow-md
        active:cursor-grabbing
      "
    >
      <h3 className="font-semibold text-gray-900">{task.title}</h3>

      {task.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`
            rounded-full
            px-2
            py-1
            text-xs
            font-medium
            ${priorityStyles[task.priority]}
          `}
        >
          {task.priority}
        </span>

        <span className="text-xs text-gray-500">{task.status}</span>
      </div>
    </div>
  );
}

export default KanbanTaskCard;
