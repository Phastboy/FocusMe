// src/components/ui/taskCardSkeleton.tsx
import React from "react";
import clsx from "clsx";

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx("bg-gray-300 animate-pulse", className)}></div>
);

const TaskCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
