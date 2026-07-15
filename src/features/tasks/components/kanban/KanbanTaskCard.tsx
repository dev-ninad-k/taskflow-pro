import { useDraggable } from '@dnd-kit/core';

import type { Task } from '../../types';

type Props = {
  task: Task;
};

function KanbanTaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        cursor-grab
        rounded-lg
        border
        bg-white
        p-4
        shadow-sm
        transition
        hover:shadow-md
        active:cursor-grabbing
      "
    >
      <h3 className="font-medium">{task.title}</h3>

      <p className="mt-2 text-sm text-gray-500">{task.priority}</p>
    </div>
  );
}

export default KanbanTaskCard;
