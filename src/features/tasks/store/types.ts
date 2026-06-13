// features/tasks/store/types.ts

import type { Task } from '@/features/tasks/types';
import type { TaskFilters } from './filter-types';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
}
