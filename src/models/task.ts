import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  description: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
