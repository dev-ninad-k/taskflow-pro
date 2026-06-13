import type { TaskStatus } from '../types';

type Props = {
  status: TaskStatus;
};

function TaskStatusBadge({ status }: Props) {
  const styles = {
    todo: 'bg-gray-100 text-gray-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    done: 'bg-green-100 text-green-700',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default TaskStatusBadge;
