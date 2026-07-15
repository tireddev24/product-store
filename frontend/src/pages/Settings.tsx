import { useState } from "react";
import { useAuth } from "../auth/auth";
import { useToast } from "../context/ToastContext";
import Spin from "../components/spinner";
import { Button } from "../components/ui/Button";
import { FormControl, FormLabel } from "../components/ui/Form";
import { Input } from "../components/ui/Input";
import { Kicker } from "../components/ui/Layout";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../components/ui/Modal";
import { useProfileStore } from "../store/product";

const Settings = () => {
  const func = useAuth();
  const isAuthenticated = func?.isAuthenticated!;
  const userData = func?.userData;
  const login = func?.login!;
  const { updateProfile } = useProfileStore();
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
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleProfileEdit = async () => {
    setLoading(true);
    const { success, message, user } = await updateProfile(formData);

    login(user);

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
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-2xl font-bold text-[color:var(--color-danger)]">Unauthorized</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex flex-col justify-center w-full max-w-2xl py-4">
        <div className="mb-10 flex flex-col gap-3 border-b border-hairline pb-6">
          <Kicker>Account</Kicker>
          <h1 className="display-serif text-3xl md:text-4xl">
            <span className="text-gold">Settings</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange("firstname")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange("lastname")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange("username")}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange("email")}
            />
          </FormControl>
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Save changes
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Update profile</ModalHeader>
        <ModalBody>
          <p className="text-sm text-ivory/80">Are you sure you want to save these changes?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProfileEdit} disabled={loading}>
            {loading ? <Spin className="h-4" /> : "Save changes"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Settings;
