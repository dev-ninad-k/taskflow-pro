import { DndContext, type DragEndEvent } from '@dnd-kit/core';

import type { Task } from '../../types';
import KanbanColumn from './KanbanColumn';
import { useAppDispatch } from '@/app/store/hooks';
import { optimisticallyUpdateTask, restoreTask } from '../../store/tasks-slice';
import { updateTaskThunk } from '../../store/tasks-thunks';
import type { TaskStatus } from '../../types';

type Props = {
  tasks: Task[];
};

function KanbanBoard({ tasks }: Props) {
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');
  const dispatch = useAppDispatch();

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);

    const newStatus = String(over.id) as TaskStatus;

    const previousTask = tasks.find((task) => task.id === taskId);

    if (!previousTask) return;

    if (previousTask.status === newStatus) return;

    dispatch(
      optimisticallyUpdateTask({
        id: taskId,
        changes: {
          status: newStatus,
          completed: newStatus === 'done',
        },
      }),
    );

    const result = await dispatch(
      updateTaskThunk({
        id: taskId,
        data: {
          status: newStatus,
        },
      }),
    );

    if (updateTaskThunk.rejected.match(result)) {
      dispatch(restoreTask(previousTask));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid gap-6 lg:grid-cols-3">
        <KanbanColumn title="Todo" status="todo" tasks={todoTasks} />

        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={inProgressTasks}
        />

        <KanbanColumn title="Done" status="done" tasks={doneTasks} />
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
