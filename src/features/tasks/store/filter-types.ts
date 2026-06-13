import type { TaskStatus } from '../types';

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all';
}
