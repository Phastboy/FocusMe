// src/components/ui/taskMetrics.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks } from "@/utils/actions";
import { ITask } from "@/types";
import TaskList from "@/components/ui/taskList";

const TaskMetrics: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [incompleteCount, setIncompleteCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [closestDueTasks, setClosestDueTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks: ITask[] = await fetchTasks();
        if (Array.isArray(fetchedTasks)) {
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

          const sortedTasks = fetchedTasks
            .filter((task: ITask) => task.dueDate && !task.completed)
            .sort(
              (a: ITask, b: ITask) =>
                new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
            )
            .slice(0, 5);
          setClosestDueTasks(sortedTasks);
        } else {
          setError("Failed to fetch tasks: Invalid response format");
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch tasks");
      }
    };

    getTasks();
  }, []);

  if (error) {
    return (
      <div className="task-metrics border p-6 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Task Metrics</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="task-metrics border p-6 rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Task Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-blue-700">Total Tasks</h3>
          <p className="text-2xl font-bold text-blue-900">{tasks.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-green-700">
            Completed Tasks
          </h3>
          <p className="text-2xl font-bold text-green-900">{completedCount}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-red-700">Overdue Tasks</h3>
          <p className="text-2xl font-bold text-red-900">{overdueCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-yellow-700">
            Incomplete Tasks
          </h3>
          <p className="text-2xl font-bold text-yellow-900">
            {incompleteCount}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Top 5 Uncompleted Tasks with Closest Due Dates
        </h3>
        {closestDueTasks.length > 0 ? (
          <TaskList tasks={closestDueTasks} />
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskMetrics;
