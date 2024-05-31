// src/utils/actions.ts: Next.js server-side functions to interact with the API
"use server";

import { NextRequest } from "next/server";
import { GET as getAllTask, POST as postTask } from "@/app/api/tasks/route";
import {
  GET as getTaskById,
  PUT as updateTask,
  DELETE as deleteTask,
} from "@/app/api/tasks/[taskId]/route";
import { revalidatePath } from "next/cache";
import { ITask } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const customFetch = async (handler: Function, options: any = {}) => {
  const { userId } = auth();
  console.log({ userId });

  if (!userId) {
    redirect("/sign-in");
  }
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  return handler(new NextRequest(options.url, { headers, ...options }));
};

export const fetchTasks = async (): Promise<ITask[]> => {
  const response = await customFetch(getAllTask, {
    method: "GET",
    url: `${BASE_URL}/api/tasks`,
  });

  const data = await response.json();
  console.log(data);

  if (response.ok && data.response.success) {
    return data.response.tasks;
  } else {
    throw new Error(data.response.message || "Failed to fetch tasks");
  }
};

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  const response = await customFetch(postTask, {
    method: "POST",
    url: `${BASE_URL}/api/tasks`,
    body: JSON.stringify(task),
  });
  const data = await response.json();
  if (response.ok) {
    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return data.response.task;
  } else {
    throw new Error(data.response.message || "Failed to create task");
  }
};

export const modifyTask = async (
  taskId: string,
  task: Partial<ITask>,
): Promise<ITask> => {
  const response = await customFetch(updateTask, {
    method: "PUT",
    url: `${BASE_URL}/api/tasks/${taskId}`,
    body: JSON.stringify(task),
  });
  const data = await response.json();
  if (response.ok) {
    revalidatePath("/dashboard");
    revalidatePath("/tasks");
    return data.task;
  } else {
    throw new Error(data.response.message || "Failed to update task");
  }
};

export const removeTask = async (taskId: string): Promise<void> => {
  const response = await customFetch(deleteTask, {
    method: "DELETE",
    url: `${BASE_URL}/api/tasks/${taskId}`,
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.response.message || "Failed to delete task");
  }
  redirect("/dashboard");
};
