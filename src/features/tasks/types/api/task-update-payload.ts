import type { TaskStatus, TaskPriority } from '../domain';

/**
 * Only fields that are allowed to be updated from UI
 * NOT full Task
 */
export interface TaskUpdatePayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}
