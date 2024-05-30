// src/components/forms/createTaskForm.tsx
import React from "react";
import { createTask } from "@/utils/actions";

interface CreateTaskFormProps {
  onTaskCreated: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreated }) => {
  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string | undefined;
        const dueDate = formData.get("dueDate")
          ? new Date(formData.get("dueDate") as string)
          : undefined;

        await createTask({ name, description, dueDate, completed: false });

        onTaskCreated();
      }}
      method="post"
    >
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2"
        ></textarea>
        <input type="date" name="dueDate" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
