import Card from '@/components/ui/Card';

type Props = {
  todo: number;
  inProgress: number;
  done: number;
};

function DistributionCard({ todo, inProgress, done }: Props) {
  const rows = [
    {
      label: 'Todo',
      value: todo,
      color: 'bg-gray-500',
    },
    {
      label: 'In Progress',
      value: inProgress,
      color: 'bg-yellow-500',
    },
    {
      label: 'Done',
      value: done,
      color: 'bg-green-500',
    },
  ];

  const max = Math.max(todo, inProgress, done, 1);

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold">Task Distribution</h2>

      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{row.label}</span>

              <span>{row.value}</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
                className={`${row.color} h-3 rounded-full transition-all`}
                style={{
                  width: `${(row.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default DistributionCard;
