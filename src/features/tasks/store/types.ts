import type { Task, TaskStatus } from '../types';

export interface TasksState {
  entities: {
    tasksById: Record<string, Task>;
    taskIds: string[];
  };

  server: {
    loading: boolean;
    creating: boolean;
    updatingIds: string[];
    deletingIds: string[];
    error: string | null;
  };

  ui: {
    filters: {
      search: string;
      status: TaskStatus | 'all';
    };
  };
}
