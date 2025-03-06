import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  avatar: { type: String, default: "/storage/uploads/avatars/default.jpg" },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  secret: { type: String },
  is2FAEnabled: { type: Boolean, default: false },
  role: { type: String, enum: [ 'admin', 'user' ], default: 'user' }
});

export default mongoose.model("User", UserSchema);
