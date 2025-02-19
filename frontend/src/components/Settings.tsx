"use client"
import Button from "@/src/components/ui/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Input from "./ui/Input";

interface IUser {
  googleId: string;
  email: string;
  name: string;
  role: string;
  photo: string;
}

const Settings = ({ user }: { user: IUser }) => {
  const { watch, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      notifications: true, 
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings updated successfully!");
      console.log("Updated Settings:", data);
    } catch (error) {
      toast.error("Failed to update settings.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input
          label="Full Name"
          value={user?.name}
            error={errors.name?.message}
            disabled
          />

          <Input
            label="Email"
            value={user?.email}
            disabled
            error={errors.email?.message}
          />

        <div className="flex items-center gap-2">
          <input type="checkbox"  className="h-5 w-5" />
          <label className="text-sm">Enable Notifications</label>
        </div>

        <Button disabled type="submit" isLoading={isSubmitting} className="w-full bg-blue-500 text-white">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Settings;
