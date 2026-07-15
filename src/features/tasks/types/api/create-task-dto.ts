import type { TaskPriority, TaskStatus } from '../domain';

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
