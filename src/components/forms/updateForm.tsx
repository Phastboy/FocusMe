// src/components/forms/updateForm.tsx
import React from "react";
import { modifyTask } from "@/utils/actions";

interface UpdateFormProps {
  taskId: string;
  onTaskUpdated: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ taskId, onTaskUpdated }) => {
  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string | undefined;
        const dueDate = formData.get("dueDate")
          ? new Date(formData.get("dueDate") as string)
          : undefined;
        const completed = formData.get("completed") === "on";

        await modifyTask(taskId, { name, description, dueDate, completed });

        onTaskUpdated();
      }}
      method="post"
    >
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2"
        ></textarea>
        <input type="date" name="dueDate" className="border p-2" />
        <label>
          <input type="checkbox" name="completed" /> Completed
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Task
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
