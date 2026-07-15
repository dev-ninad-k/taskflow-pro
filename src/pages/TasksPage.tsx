import { useAppSelector } from '@/app/store/hooks';
import TaskForm from '@/features/tasks/components/TaskForm';
import TaskFilters from '@/features/tasks/components/TaskFilters';
import TaskList from '@/features/tasks/components/TaskList';
import EmptyState from '@/components/common/EmptyState';
import { selectFilteredTasks } from '@/features/tasks/store/selectors';
import ErrorState from '@/components/common/ErrorState';
import { loadTasks } from '@/features/tasks/store/tasks-thunks';
import { useAppDispatch } from '@/app/store/hooks';
import PageLoader from '@/components/common/PageLoader';

import { useEffect } from 'react';

function TasksPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {};
  }, []);

  const tasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector((state) => state.tasks.server.loading);
  const error = useAppSelector((state) => state.tasks.server.error);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => dispatch(loadTasks())} />;
  }

  return (
    <div className="space-y-6">
      {/* CREATE TASK */}
      <TaskForm />

      {/* FILTERS */}
      <TaskFilters />

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="Create your first task to get started"
        />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}

export default TasksPage;
