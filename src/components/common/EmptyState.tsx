type EmptyStateProps = {
  title: string;
  description: string;
};

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState;
