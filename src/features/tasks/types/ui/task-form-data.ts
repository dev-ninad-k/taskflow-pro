import type { TaskPriority } from '../domain/task-priority';
import type { TaskStatus } from '../domain/task-status';

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
