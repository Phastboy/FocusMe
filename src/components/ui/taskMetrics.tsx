// src/components/ui/taskMetrics.tsx
import React, { useEffect, useState } from "react";
import { fetchAllTasks } from "@/utils/actions";
import { ITask } from "@/types";

const TaskMetrics: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [incompleteCount, setIncompleteCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks: ITask[] = await fetchAllTasks();
      setTasks(fetchedTasks);
      setCompletedCount(
        fetchedTasks.filter((task: ITask) => task.completed).length,
      );
      setIncompleteCount(
        fetchedTasks.filter((task: ITask) => !task.completed).length,
      );
      setOverdueCount(
        fetchedTasks.filter(
          (task: ITask) =>
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            !task.completed,
        ).length,
      );
    };

    getTasks();
  }, []);

  return (
    <div className="task-metrics border p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Task Metrics</h2>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed Tasks: {completedCount}</p>
      <p>Incomplete Tasks: {incompleteCount}</p>
      <p>Overdue Tasks: {overdueCount}</p>
    </div>
  );
};

export default TaskMetrics;
