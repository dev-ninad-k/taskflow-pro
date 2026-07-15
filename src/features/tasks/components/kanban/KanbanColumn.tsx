import { useDroppable } from '@dnd-kit/core';

import Card from '@/components/ui/Card';
import type { TaskStatus, Task } from '../../types';
import KanbanTaskCard from './KanbanTaskCard';

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
};

function KanbanColumn({ title, status, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card>
      <div className="mb-4 flex justify-between">
        <h2 className="font-bold text-lg">{title}</h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className="
          min-h-[300px]
          space-y-3
          rounded-md
          transition
        "
      >
        {tasks.length === 0 ? (
          <div
            className="
              flex
              h-[200px]
              items-center
              justify-center
              rounded-md
              border
              border-dashed
              text-sm
              text-gray-400
            "
          >
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => <KanbanTaskCard key={task.id} task={task} />)
        )}
      </div>
    </Card>
  );
}

export default KanbanColumn;
