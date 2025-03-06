import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

export default mongoose.model("Student", StudentSchema);
