import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/app/store/hooks';
import Card from '@/components/ui/Card';
import { useAppSelector } from '@/app/store/hooks';
import { createTaskThunk } from '../store/tasks-thunks';
import type { TaskStatus, TaskPriority } from '../types';
import { addOptimisticTask } from '../store/tasks-slice';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const isValid = title.trim().length > 0 && description.trim().length > 0;
  const isSubmitting = useAppSelector((state) => state.tasks.server.creating);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempId = `temp-${Date.now()}`;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }
    setError('');
    // 1. optimistic update
    dispatch(
      addOptimisticTask({
        id: tempId,
        title: trimmedTitle,
        description,
        status: taskStatus,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );
    // 2. API call
    await dispatch(
      createTaskThunk({
        task: {
          title: trimmedTitle,
          description,
          status: taskStatus,
          priority,
        },
        tempId,
      }),
    );
    // 3. reset form
    setTitle('');
    setDescription('');
    setTaskStatus('todo');
    setPriority('medium');
  };

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) {
              setError('');
            }
          }}
        />

        <textarea
          className="w-full rounded-md border border-gray-300 p-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full rounded-md border border-gray-300 p-3"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
        >
          <option value="todo">Todo</option>

          <option value="in-progress">In Progress</option>

          <option value="done">Done</option>
        </select>
        <select
          className="w-full rounded-md border border-gray-300 p-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </Button>
      </form>
    </Card>
  );
}

export default TaskForm;
