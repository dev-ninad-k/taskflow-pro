import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { loadTasks } from '@/features/tasks/store/tasks-thunks';
import { useEffect } from 'react';

function DashboardPage() {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your task management system."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Tasks" value={tasks.length} />
        <StatCard title="Completed" value="0" />
        <StatCard title="In Progress" value="0" />
        <StatCard title="Completion Rate" value="0%" />
      </div>
    </>
  );
}

export default DashboardPage;
