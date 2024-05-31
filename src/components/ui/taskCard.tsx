// src/components/ui/taskCard.tsx
"use client";
import React, { useState } from "react";
import UpdateFormButton from "@/components/ui/updateFormButton";
import Button from "@/components/ui/button";
import { removeTask, modifyTask } from "@/utils/actions";
import { ITask } from "@/types";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    await removeTask(task._id as string);
  };

  const handleCheckboxChange = async () => {
    setLoading(true);
    try {
      setCompleted(!completed);
      await modifyTask(task._id as string, {
        completed: !completed,
      });
    } catch (error) {
      console.error(error);
      setCompleted(completed);
    } finally {
      setLoading(false);
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
          disabled={loading}
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
