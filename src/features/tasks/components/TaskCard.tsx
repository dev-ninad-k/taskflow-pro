import Card from '@/components/ui/Card';

import type { Task } from '../types';

import TaskStatusBadge from './TaskStatusBadge';

type Props = {
  task: Task;
};

function TaskCard({ task }: Props) {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{task.title}</h3>

          <TaskStatusBadge status={task.status} />
        </div>

        <p className="text-sm text-gray-600">
          {task.description || 'No description available'}
        </p>
      </div>
    </Card>
  );
}

export default TaskCard;
