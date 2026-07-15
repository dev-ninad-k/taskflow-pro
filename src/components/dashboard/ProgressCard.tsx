import Card from '@/components/ui/Card';

type Props = {
  percentage: number;
  completed: number;
  total: number;
};

function ProgressCard({ percentage, completed, total }: Props) {
  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Overall Progress</h2>

          <p className="mt-1 text-sm text-gray-500">
            Completion status of all tasks
          </p>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{
              width: `${Math.min(Math.max(percentage, 0), 100)}%`,
            }}
          />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-green-600">{percentage}%</p>

            <p className="text-sm text-gray-500">Completion rate</p>
          </div>

          <p className="text-sm text-gray-500">
            {completed} / {total} tasks
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ProgressCard;
