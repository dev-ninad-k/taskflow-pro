import type { Task } from '../../types';
import KanbanTaskCard from './KanbanTaskCard';

type Props = {
  title: string;
  tasks: Task[];
};

const headerColors: Record<string, string> = {
  Todo: 'bg-slate-500',
  'In Progress': 'bg-amber-500',
  Done: 'bg-emerald-500',
};

function KanbanColumn({ title, tasks }: Props) {
  return (
    <div className="flex min-h-[600px] flex-col rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
      {/* Header */}
      <div
        className={`flex items-center justify-between rounded-t-xl px-4 py-3 text-white ${
          headerColors[title] ?? 'bg-blue-500'
        }`}
      >
        <h2 className="font-semibold">{title}</h2>

        <span className="rounded-full bg-white/20 px-2 py-1 text-sm">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex-1 space-y-3 p-4">
        {tasks.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400">
            No tasks
          </div>
        ) : (
          tasks.map((task) => <KanbanTaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
