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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Utility function to create NextRequest objects
function createNextRequest(
  url: string,
  method: string,
  body?: any,
): NextRequest {
  return new NextRequest(`${BASE_URL}${url}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Function to get all tasks
export async function fetchAllTasks() {
  try {
    const response = await getAllTask();
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.response.message || "Failed to fetch tasks");
    return data.response.tasks;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
}

// Function to create a new task
export async function createTask(taskData: {
  name: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
}) {
  try {
    const request = createNextRequest("/api/tasks", "POST", taskData);
    const response = await postTask(request);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.response.message || "Failed to create task");
    revalidatePath("/tasks");
    revalidatePath(`/dashboard`);
    return data.response.task;
  } catch (error: any) {
    console.error("Error creating task:", error.message);
    return null;
  }
}

// Function to get a task by ID
export async function fetchTaskById(taskId: string) {
  try {
    const request = createNextRequest(`/api/tasks/${taskId}`, "GET");
    const response = await getTaskById(request);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.response.message || "Failed to fetch task");
    return data.response.task;
  } catch (error: any) {
    console.error(`Error fetching task with ID ${taskId}:`, error.message);
    return null;
  }
}

// Function to update a task
export async function modifyTask(
  taskId: string,
  taskData: {
    name?: string;
    description?: string;
    completed?: boolean;
    dueDate?: Date;
  },
) {
  if (
    !taskData.name &&
    !taskData.description &&
    taskData.completed === undefined &&
    !taskData.dueDate
  ) {
    console.error("No fields provided to update task");
    return null;
  }
  try {
    const request = createNextRequest(`/api/tasks/${taskId}`, "PUT", taskData);
    const response = await updateTask(request);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.response.message || "Failed to update task");
    revalidatePath("/tasks");
    revalidatePath(`/dashboard`);
    return data.response.task;
  } catch (error: any) {
    console.error(`Error updating task with ID ${taskId}:`, error.message);
    return null;
  }
}

// Function to delete a task
export async function removeTask(taskId: string) {
  try {
    const request = createNextRequest(`/api/tasks/${taskId}`, "DELETE");
    const response = await deleteTask(request);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.response.message || "Failed to delete task");
    revalidatePath("/tasks");
    revalidatePath(`/dashboard`);
  } catch (error: any) {
    console.error(`Error deleting task with ID ${taskId}:`, error.message);
    return false;
  }
}
