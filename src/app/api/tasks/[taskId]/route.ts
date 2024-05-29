// src/app/api/tasks/[taskId]/route.ts
import { NextRequest } from "next/server";
import { jsonResponse } from "@/utils/apihelpers";
import Task from "@/models/task";
import { connectDb } from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return jsonResponse(
        {
          success: false,
          message: "Task not found",
        },
        404,
      );
    }
    return jsonResponse(
      {
        success: true,
        message: "Task fetched successfully",
        task,
      },
      200,
    );
  } catch (error: any) {
    return jsonResponse(
      {
        success: false,
        message: error.message,
      },
      500,
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  const body = await req.json();
  try {
    const task = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    });
    if (!task) {
      return jsonResponse(
        {
          success: false,
          message: "Task not found",
        },
        404,
      );
    }
    return jsonResponse(
      {
        success: true,
        message: "Task updated successfully",
        task,
      },
      200,
    );
  } catch (error: any) {
    return jsonResponse(
      {
        success: false,
        message: error.message,
      },
      500,
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return jsonResponse(
        {
          success: false,
          message: "Task not found",
        },
        404,
      );
    }
    return jsonResponse(
      {
        success: true,
        message: "Task deleted successfully",
      },
      200,
    );
  } catch (error: any) {
    return jsonResponse(
      {
        success: false,
        message: error.message,
      },
      500,
    );
  }
}
