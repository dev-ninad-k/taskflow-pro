import Card from '@/components/ui/Card';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  accentColor?: string;
};

function StatCard({ title, value, icon, accentColor }: StatCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        {icon && (
          <div
            className={`
              flex h-12 w-12 items-center justify-center
              rounded-xl
              ${accentColor ?? 'bg-blue-500'}
              text-white
            `}
          >
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">{value}</h2>
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
