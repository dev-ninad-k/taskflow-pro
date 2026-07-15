import { getTasks } from '@/services/api/endpoints/tasks';
import type { Task } from '@/features/tasks/types';
import type { TaskDto } from './dto';
import { mapTaskDtoToTask } from './mapper';
import type { CreateTaskDto } from '../types';
import { apiClient } from '@/services/api/client';

export async function fetchTasks(): Promise<Task[]> {
  const data = await getTasks();

  return data.map((task: TaskDto) => mapTaskDtoToTask(task));
}
export async function createTask(data: CreateTaskDto) {
  const response = await apiClient.post('/todos', {
    title: data.title,
    completed: data.status === 'done',
  });
  return {
    id: response.data.id,
    title: response.data.title,

    description: data.description,
    status: data.status,
    priority: data.priority,

    completed: data.status === 'done',

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
