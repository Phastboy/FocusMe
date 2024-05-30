// src/components/ui/taskCard.tsx
import React from "react";
import { useRouter } from "next/router";
import UpdateForm from "@/components/forms/updateForm";
import Button from "@/components/ui/button";
import { removeTask } from "@/utils/actions";

const TaskCard: React.FC<{ task: any }> = ({ task }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await removeTask(task._id);
    // Refresh or update the UI as necessary
  };

  return (
    <div className="task-card border p-4 rounded-md shadow-md">
      <h3
        className="text-lg font-bold cursor-pointer"
        onClick={() => router.push(`/tasks/${task._id}`)}
      >
        {task.name}
      </h3>
      <p>{task.description}</p>
      <p>
        Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </p>
      <p>
        Status:
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="ml-2"
        />
        {task.completed ? "Completed" : "Incomplete"}
      </p>
      <div className="flex justify-between mt-4">
        <UpdateForm taskId={task._id} />
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
