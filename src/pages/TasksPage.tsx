import { useEffect } from 'react';

import PageHeader from '@/components/common/PageHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import { loadTasks } from '@/features/tasks/store/tasks-thunks';

import TaskList from '@/features/tasks/components/TaskList';
import { selectFilteredTasks } from '@/features/tasks/store/selectors';
import TaskFilters from '@/features/tasks/components/TaskFilters';

function TasksPage() {
  const dispatch = useAppDispatch();

  const filteredTasks = useAppSelector(selectFilteredTasks);

  const { tasks, loading, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(loadTasks());
    }
  }, [dispatch, tasks.length]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState title="Error" description={error} />;
  }

  return (
    <>
      <PageHeader title="Tasks" description="Manage all your tasks." />
      <TaskFilters />

      {!tasks.length ? (
        <EmptyState title="No Tasks" description="No tasks available." />
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </>
  );
}

export default TasksPage;
