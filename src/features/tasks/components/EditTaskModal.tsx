import { useState } from 'react';
import type { Task } from '../types';
import { useAppDispatch } from '@/app/store/hooks';
import { updateTaskThunk } from '../store/tasks-thunks';

type Props = {
  task: Task;
  onClose: () => void;
};

function EditTaskModal({ task, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = async () => {
    await dispatch(
      updateTaskThunk({
        id: task.id,
        data: {
          title,
          description,
          status,
          priority,
        },
      }),
    );

    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Edit Task</h2>

        <div className="mt-4 space-y-4">
          <input
            className="w-full rounded-md border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full rounded-md border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full rounded-md border p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
          >
            <option value="todo">Todo</option>

            <option value="in-progress">In Progress</option>

            <option value="done">Done</option>
          </select>

          <select
            className="w-full rounded-md border p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as typeof priority)}
          >
            <option value="low">Low</option>

            <option value="medium">Medium</option>

            <option value="high">High</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
