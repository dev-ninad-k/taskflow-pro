import type { Task } from '../../types';

type Props = {
  task: Task;
};

function KanbanTaskCard({ task }: Props) {
  return (
    <div>
      <h3>{task.title}</h3>

      <p>{task.priority}</p>
    </div>
  );
}

export default KanbanTaskCard;
