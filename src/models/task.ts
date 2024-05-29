// src/models/task.ts
import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
