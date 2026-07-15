import type { TaskPriority } from './task-priority';
import type { TaskStatus } from './task-status';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
