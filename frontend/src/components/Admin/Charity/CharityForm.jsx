import { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  Heart,
  Globe,
  Image,
  Loader2,
  AlignLeft,
  Percent,
  LucideBuilding,
} from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const defaultForm = {
  name: "",
  description: "",
  image: "",
  website: "",
  minimumContribution: 10,
  isActive: true,
};

const inputCls =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-white";

const Field = ({ label, icon: Icon, optional, children }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      {optional && <span className="text-[10px] text-gray-300">Optional</span>}
    </div>
    {children}
  </div>
);

const CharityForm = ({ open, onClose, editData, refreshCharities }) => {
  const isEdit = !!editData;
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setFormData(
      editData
        ? {
            name: editData.name || "",
            description: editData.description || "",
            image: editData.image || "",
            website: editData.website || "",
            minimumContribution: editData.minimumContribution || 10,
            isActive: editData.isActive ?? true,
          }
        : defaultForm,
    );
  }, [editData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImgError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "minimumContribution" ? Number(value) : value,
    }));
  };

  const isValidImageUrl = (url) => {
    if (!url) return true;

    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidImageUrl(formData.image)) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get("magicalKey");

      const url = isEdit
        ? `${backendURL}/api/charity/${editData._id}`
        : `${backendURL}/api/charity`;

      const res = await axios[isEdit ? "put" : "post"](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        refreshCharities();
        onClose();
        setFormData(defaultForm);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-0.5">
              {isEdit ? "Editing" : "New charity"}
            </p>
            <h2 className="text-sm font-semibold text-gray-900">
              {isEdit ? editData.name : "Add charity"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <Field label="Charity name" icon={LucideBuilding}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Red Cross, UNICEF…"
                className={inputCls}
                required
              />
            </Field>

            <Field label="Image URL" icon={Image} optional>
              <div className="flex gap-2 items-center">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image"
                  className={`${inputCls} flex-1`}
                />

                <div className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {formData.image && !imgError ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImgError(false)}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <Image size={14} className="text-gray-300" />
                  )}
                </div>
              </div>

              {imgError && (
                <p className="text-[11px] text-red-500">
                  Invalid image URL or the website doesn't allow image preview.
                </p>
              )}
            </Field>

            <Field label="Website" icon={Globe} optional>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://charity.org"
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Min. contribution" icon={Percent}>
                <input
                  type="number"
                  name="minimumContribution"
                  min={10}
                  max={100}
                  value={formData.minimumContribution}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={formData.minimumContribution}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      minimumContribution: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-emerald-500 mt-1"
                />
                <div className="flex justify-between text-[10px] text-gray-300">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </Field>

              <Field label="Status">
                <div className="flex flex-col gap-2 pt-0.5">
                  {[
                    { val: true, label: "Active" },
                    { val: false, label: "Inactive" },
                  ].map(({ val, label }) => {
                    const sel = formData.isActive === val;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, isActive: val }))
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                          sel && val
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : sel && !val
                              ? "border-gray-200 bg-gray-100 text-gray-600"
                              : "border-gray-200 text-gray-400 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sel ? (val ? "bg-emerald-500" : "bg-gray-400") : "bg-gray-200"}`}
                        />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </div>

            <Field label="Description" icon={AlignLeft}>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the charity's mission…"
                className={`${inputCls} resize-none`}
                required
              />
              <p className="text-[10px] text-gray-300 text-right">
                {formData.description.length} chars
              </p>
            </Field>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Heart size={13} />
                  {isEdit ? "Save changes" : "Add charity"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharityForm;
