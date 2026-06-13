import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { addTask } from '../store/tasks-slice';
import { useAppDispatch } from '@/app/store/hooks';
import Card from '@/components/ui/Card';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValid = title.trim().length > 0 && description.trim().length > 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    dispatch(
      addTask({
        id: Date.now(),
        title,
        description,
        status: 'todo',
        priority: 'medium',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );

    setTitle('');
    setDescription('');
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
        <select className="w-full rounded-md border border-gray-300 p-3">
          <option value="todo">Todo</option>

          <option value="in-progress">In Progress</option>

          <option value="done">Done</option>
        </select>
        <select className="w-full rounded-md border border-gray-300 p-3">
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
