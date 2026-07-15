import Input from '@/components/ui/Input';
import { useAppDispatch } from '@/app/store/hooks';
import { setSearch, setStatusFilter } from '../store/tasks-slice';
import { useSelector } from 'react-redux';
import { selectFilters } from '../store/selectors';
import type { TaskStatus } from '../types';

function TaskFilters() {
  const dispatch = useAppDispatch();

  const filters = useSelector(selectFilters);

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
        onChange={(e) =>
          dispatch(setStatusFilter(e.target.value as TaskStatus | 'all'))
        }
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
