import TaskCard from './TaskCard';
import type { Task } from '../types';

type Props = {
  tasks: Task[];
};

function TaskList({ tasks }: Props) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
