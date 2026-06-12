import type { Task } from '@/features/tasks/types';

import type { TaskDto } from './dto';

export function mapTaskDtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    title: dto.title,

    description: '',

    status: dto.completed ? 'done' : 'todo',

    priority: 'medium',

    completed: dto.completed,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
