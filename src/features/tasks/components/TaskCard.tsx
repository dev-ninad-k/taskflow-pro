import Card from '@/components/ui/Card';

import type { Task } from '../types';

import TaskStatusBadge from './TaskStatusBadge';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { updateTaskThunk } from '../store/tasks-thunks';
import { deleteTaskThunk } from '../store/tasks-thunks';
import {
  optimisticallyUpdateTask,
  restoreTask,
  removeOptimisticTask,
} from '../store/tasks-slice';
import { useState } from 'react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EditTaskModal from './EditTaskModal';

type Props = {
  task: Task;
};

function TaskCard({ task }: Props) {
  const dispatch = useAppDispatch();
  const updatingIds = useAppSelector((s) => s.tasks.server.updatingIds);
  const deletingIds = useAppSelector((s) => s.tasks.server.deletingIds);

  const isUpdating = updatingIds.includes(task.id);
  const isDeleting = deletingIds.includes(task.id);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{task.title}</h3>

          <TaskStatusBadge status={task.status} />
        </div>

        <p className="text-sm text-gray-600">
          {task.description?.trim()
            ? task.description
            : 'No description available'}
        </p>
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="rounded-md bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            type="button"
            disabled={isUpdating || isDeleting}
            onClick={async () => {
              const previousTask = { ...task };
              const newStatus = task.status === 'done' ? 'todo' : 'done';

              dispatch(
                optimisticallyUpdateTask({
                  id: task.id,
                  changes: {
                    status: newStatus,
                    completed: newStatus === 'done',
                  },
                }),
              );

              const result = await dispatch(
                updateTaskThunk({
                  id: task.id,
                  data: {
                    status: newStatus,
                  },
                }),
              );
              if (updateTaskThunk.rejected.match(result)) {
                dispatch(restoreTask(previousTask));
              }
            }}
            className="rounded-md bg-green-600 px-3 py-1 text-white text-sm 
             hover:bg-green-700 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Toggle'}
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={() => setShowDeleteConfirm(true)}
            className="rounded-md bg-red-600 px-3 py-1 text-white text-sm 
             hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        {showDeleteConfirm && (
          <ConfirmDialog
            title="Delete task?"
            description="This action cannot be undone."
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={async () => {
              setShowDeleteConfirm(false);

              const previousTask = { ...task };

              dispatch(removeOptimisticTask(task.id));

              const result = await dispatch(deleteTaskThunk(task.id));

              if (deleteTaskThunk.rejected.match(result)) {
                dispatch(restoreTask(previousTask));
              }
            }}
          />
        )}
        {showEditModal && (
          <EditTaskModal task={task} onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </Card>
  );
}

export default TaskCard;
