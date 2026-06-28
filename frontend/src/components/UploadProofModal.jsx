import { useState } from "react";
import { X, Upload } from "lucide-react";

const UploadProofModal = ({
  open,
  onClose,
  onUpload,
  loading,
}) => {
  const [file, setFile] = useState(null);

  if (!open) return null;

  const handleSubmit = () => {
    if (!file) return;

    onUpload(file);

    setFile(null);
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-xl font-bold">
            Upload Payment Proof
          </h2>

          <button onClick={handleClose}>
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <label className="block mb-2 font-medium">
            Select Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full border rounded-xl p-3"
          />

          {file && (
            <div className="mt-4">

              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl border"
              />

              <p className="mt-3 text-sm text-gray-500">
                {file.name}
              </p>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t px-6 py-4">

          <button
            onClick={handleClose}
            className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={!file || loading}
            onClick={handleSubmit}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Upload size={18} />

            {loading ? "Uploading..." : "Upload"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default UploadProofModal;