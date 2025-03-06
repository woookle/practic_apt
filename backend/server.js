import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import config from "./config/config.js";
import connectDB from "./config/connectDB.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser());
app.use("/storage", express.static("storage"));

// ПОДКЛЮЧЕНИЕ К MONGODB
await connectDB();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// PORT
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`API --> http://localhost:${PORT}`);
});
