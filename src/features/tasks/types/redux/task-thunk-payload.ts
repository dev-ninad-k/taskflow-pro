import type { CreateTaskDto } from '../api';

export type CreateTaskThunkPayload = {
  task: CreateTaskDto;
  tempId: string;
};
