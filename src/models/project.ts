import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  name: string;
  description: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
