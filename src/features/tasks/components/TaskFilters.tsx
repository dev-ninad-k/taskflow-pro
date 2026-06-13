import Input from '@/components/ui/Input';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import { setSearch, setStatusFilter } from '../store/tasks-slice';

function TaskFilters() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.tasks.filters);

  return (
    <div className="mb-6 flex gap-4">
      <Input
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <select
        className="rounded-md border border-gray-300 px-3 py-2"
        value={filters.status}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
      >
        <option value="all">All</option>

        <option value="todo">Todo</option>

        <option value="in-progress">In Progress</option>

        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskFilters;
