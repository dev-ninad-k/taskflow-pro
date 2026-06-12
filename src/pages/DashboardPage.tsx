import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your task management system."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Tasks" value="0" />
        <StatCard title="Completed" value="0" />
        <StatCard title="In Progress" value="0" />
        <StatCard title="Completion Rate" value="0%" />
      </div>
    </>
  );
}

export default DashboardPage;
