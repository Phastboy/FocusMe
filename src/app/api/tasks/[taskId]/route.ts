// src/app/api/tasks/[taskId]/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { jsonResponse } from "@/utils/apihelpers";
import { connectDb } from "@/lib/dbConnect";
import Task from "@/models/task";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return jsonResponse(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }

  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
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
  const { userId } = auth();
  if (!userId) {
    return jsonResponse(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }

  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  const body = await req.json();
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      body,
      { new: true },
    );
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
  const { userId } = auth();
  if (!userId) {
    return jsonResponse(
      {
        success: false,
        message: "Unauthorized",
      },
      401,
    );
  }

  await connectDb();
  const { pathname } = req.nextUrl;
  const taskId = pathname.split("/").pop();
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
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
