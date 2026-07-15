import type { Task } from '@/features/tasks/types';

import type { TaskDto } from './dto';

export function mapTaskDtoToTask(dto: TaskDto): Task {
  return {
    id: String(dto.id),
    title: dto.title,

    description: '',

    status: dto.completed ? 'done' : 'todo',

    priority: 'medium',

    completed: dto.completed ?? false,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
