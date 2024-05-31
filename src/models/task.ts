// src/models/task.ts
import mongoose, { Schema, Document } from "mongoose";
import { User } from "@clerk/nextjs/server";

interface ITask extends Document {
  name: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  user: string;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  user: { type: String, ref: "User", required: true },
});

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
