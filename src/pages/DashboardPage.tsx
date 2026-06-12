import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

function DashboardPage() {
  return (
    <Card>
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="space-y-4">
        <Input placeholder="Search tasks..." />

        <Button>Test Button</Button>
      </div>
    </Card>
  );
}

export default DashboardPage;
