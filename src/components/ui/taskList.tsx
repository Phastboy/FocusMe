// src/components/ui/taskList.tsx
import React from "react";
import TaskCard from "./taskCard";
import TaskCardSkeleton from "./taskCardSkeleton";
import { ITask } from "@/types";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.length === 0
        ? [...Array(5)].map((_, index) => <TaskCardSkeleton key={index} />)
        : tasks.map((task) => <TaskCard key={task._id} task={task} />)}
    </div>
  );
};

export default TaskList;
