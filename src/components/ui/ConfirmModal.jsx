export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}
