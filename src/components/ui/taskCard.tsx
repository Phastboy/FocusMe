// src/components/ui/taskCard.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import UpdateFormButton from "@/components/ui/updateFormButton";
import Button from "@/components/ui/button";
import { removeTask, modifyTask } from "@/utils/actions";
import { ITask } from "@/types";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleDelete = async () => {
    await removeTask(task._id as string);
  };

  const handleCheckboxChange = async () => {
    const updatedTask = await modifyTask(task._id as string, {
      completed: !completed,
    });
    if (updatedTask) {
      setCompleted(updatedTask.completed);
    }
  };

  return (
    <div className="task-card border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold cursor-pointer">{task.name}</h3>
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
          checked={completed}
          onChange={handleCheckboxChange}
          className="ml-2"
        />
        {completed ? "Completed" : "Incomplete"}
      </p>
      <div className="flex justify-between mt-4">
        <UpdateFormButton taskId={task._id as string} />
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
