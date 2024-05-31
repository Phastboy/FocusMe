// src/app/(pages)tasks/page.tsx
import React from "react";
import TaskList from "@/components/ui/taskList";
import { fetchTasks } from "@/utils/actions";

const TasksPage: React.FC = async () => {
  const tasks = await fetchTasks();

  return (
    <div>
      <h1>Task List</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksPage;
