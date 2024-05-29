// src/app/api/tasks/route.ts
import { NextRequest } from "next/server";
import { jsonResponse } from "@/utils/apihelpers";
import Task from "@/models/task";
import { connectDb } from "@/lib/dbConnect";

export async function GET() {
  await connectDb();
  try {
    const tasks = await Task.find({});
    return jsonResponse(
      {
        success: true,
        message: "Tasks fetched successfully",
        tasks,
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body || !body.name) {
    return jsonResponse(
      {
        success: false,
        message: "No data provided or missing required fields",
      },
      400,
    );
  }

  await connectDb();
  try {
    const task = new Task(body);
    await task.save();
    return jsonResponse(
      {
        success: true,
        message: "Task created successfully",
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
      400,
    );
  }
}
