type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-red-700">
        Something went wrong
      </h3>

      <p className="mt-2 text-sm text-red-600">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
