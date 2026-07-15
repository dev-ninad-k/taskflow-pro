import Card from '@/components/ui/Card';
import type { Task } from '@/features/tasks/types';

type Props = {
  tasks: Task[];
};

function RecentTasksCard({ tasks }: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">Recent Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No recent tasks.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{task.title}</p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`
        rounded-full px-2 py-1 text-xs font-medium
        ${
          task.status === 'done'
            ? 'bg-green-100 text-green-700'
            : task.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
        }
      `}
                >
                  {task.status}
                </span>

                <span
                  className={`
        rounded-full px-2 py-1 text-xs font-medium
        ${
          task.priority === 'high'
            ? 'bg-red-100 text-red-700'
            : task.priority === 'medium'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
        }
      `}
                >
                  {task.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default RecentTasksCard;
