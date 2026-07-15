type ConfirmDialogProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
