import mongoose from "mongoose";

const PracticSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
}); 

export default mongoose.model("Practic", PracticSchema);
