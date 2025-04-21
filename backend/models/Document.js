import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  group: { type: String, required: true },
});
const documentLessonsSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  dateFromAndTo: { type: String, required: true }
})

const documentDataSchema = new mongoose.Schema({
  students: [studentSchema],
  number: { type: String, required: true },
  dateAndNumber: { type: String, required: true},
  companyName: { type: String, required: true},
  course: { type: String, required: true},
  lessons: [documentLessonsSchema],
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
