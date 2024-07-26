import React from "react";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  product: any;
  loading: boolean;
  text: string;
}

const ConfirmModal: React.FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  onCancel,
  message,
  product,
  loading,
  text,
}) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white py-8 px-6 rounded-lg duration-75 animate-fadeIn">
      <div className="flex flex-col gap-2 mb-3">
        <h2 className="text-lg">{message}</h2>
        <p className="text-gray-700">
          <strong className="text-black">
            {product.name}
            .
          </strong>
          {' '}
          This can't be
          undone
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="border border-blue-700 text-blue-700 px-4 py-2 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          {loading ? "Loading..." : text}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
