import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  group: { type: String, required: true },
  isWork: { type: Boolean, required: true, default: false },
  companyName: { type: String, required: true, default: "-" },
});

const documentDataSchema = new mongoose.Schema({
  students: [studentSchema],
  dateAndNumber: { type: String, required: true},
  companyName: { type: String, required: true},
  course: { type: String, required: true},
  lesson: { type: String, required: true},
  dateFromAndTo: { type: String, required: true},
  practicName: { type: String, required: true},
  practicDateFromAndTo: { type: String, required: true},
  practicNameComponent: { type: String, required: true}
});

const DocumentSchema = new mongoose.Schema({
  file: { type: String, required: true },
  data: documentDataSchema,
  title: { type: String, required: true },
  group: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Document", DocumentSchema);
