import { getTasks } from '@/services/api/endpoints/tasks';

import type { Task } from '@/features/tasks/types';

import type { TaskDto } from './dto';
import { mapTaskDtoToTask } from './mapper';

export async function fetchTasks(): Promise<Task[]> {
  const data = await getTasks();

  return data.map((task: TaskDto) => mapTaskDtoToTask(task));
}
