// src/app/api/tasks/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { jsonResponse } from "@/utils/apihelpers";
import { connectDb } from "@/lib/dbConnect";
import Task from "@/models/task";

export async function GET() {
  const { userId } = auth();
  console.log({ userId: userId });
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
  try {
    const tasks = await Task.find({ user: userId });
    console.log({ tasks });
    return jsonResponse(
      {
        success: true,
        message: "Tasks fetched successfully",
        tasks,
      },
      200,
    );
  } catch (error: any) {
    console.error(error);
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
    const task = new Task({ ...body, user: userId });
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
