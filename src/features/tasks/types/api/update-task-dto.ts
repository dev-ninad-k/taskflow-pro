import type { TaskUpdatePayload } from './task-update-payload';

export type UpdateTaskDto = {
  id: string;
  data: TaskUpdatePayload;
};
