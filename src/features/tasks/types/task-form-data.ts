import type { TaskPriority } from './task-priority';
import type { TaskStatus } from './task-status';

export interface TaskFormData {
  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;
}
