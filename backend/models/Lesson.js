import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
}); 

export default mongoose.model("Lesson", LessonSchema);
