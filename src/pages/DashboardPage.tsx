import { useAppSelector } from '@/app/store/hooks';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import RecentTasksCard from '@/components/dashboard/RecentTasksCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import DistributionCard from '@/components/dashboard/DistributionCard';
import {
  selectTaskMetrics,
  selectRecentTasks,
  selectTaskDistribution,
} from '@/features/tasks/store/dashboard-selectors';
import ErrorState from '@/components/common/ErrorState';
import { loadTasks } from '@/features/tasks/store/tasks-thunks';
import { useAppDispatch } from '@/app/store/hooks';
import PageLoader from '@/components/common/PageLoader';
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
} from 'lucide-react';

function DashboardPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.server.loading);
  const error = useAppSelector((state) => state.tasks.server.error);
  const metrics = useAppSelector(selectTaskMetrics);
  const recentTasks = useAppSelector(selectRecentTasks);
  const distribution = useAppSelector(selectTaskDistribution);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => dispatch(loadTasks())} />;
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your task management system."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Tasks"
          value={metrics.total}
          icon={<ClipboardList size={24} />}
          accentColor="bg-blue-500"
        />

        <StatCard
          title="Completed"
          value={metrics.completed}
          icon={<CheckCircle2 size={24} />}
          accentColor="bg-green-500"
        />

        <StatCard
          title="In Progress"
          value={metrics.inProgress}
          icon={<Clock3 size={24} />}
          accentColor="bg-yellow-500"
        />

        <StatCard
          title="Todo"
          value={metrics.todo}
          icon={<ListTodo size={24} />}
          accentColor="bg-gray-500"
        />

        <StatCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          icon={<TrendingUp size={24} />}
          accentColor="bg-purple-500"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentTasksCard tasks={recentTasks} />

        <ProgressCard
          percentage={metrics.completionRate}
          completed={metrics.completed}
          total={metrics.total}
        />
      </div>

      <div className="mt-6">
        <DistributionCard
          todo={distribution.todo}
          inProgress={distribution.inProgress}
          done={distribution.done}
        />
      </div>
    </>
  );
}

export default DashboardPage;
