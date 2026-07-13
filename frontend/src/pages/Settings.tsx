import { useState } from "react";
import { useAuth } from "../auth/auth";
import { useToast } from "../context/ToastContext";
import Spin from "../components/spinner";

const Settings = () => {
  const { isAuthenticated, userData, updateProfile } = useAuth();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: userData?.firstname ?? "",
    lastname: userData?.lastname ?? "",
    username: userData?.username ?? "",
    email: userData?.email ?? "",
  });

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleProfileEdit = async () => {
    setLoading(true);

    const { success, message } = await updateProfile(formData);

    toast({
      status: success ? "success" : "error",
      description: message,
      duration: 2500,
    });

    setLoading(false);
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Unauthorized!
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">Settings</h1>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">
              First Name
            </label>

            <input
              type="text"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange("firstname")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange("lastname")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange("username")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange("email")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                Update Profile
              </h2>
            </div>

            <div className="px-6 py-5">
              <p>
                Are you sure you want to save these changes?
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleProfileEdit}
                className="flex min-w-[140px] items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Spin /> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;