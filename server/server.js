import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./server/routes/auth.js";
import chatRoutes from "./server/routes/chat.js";

dotenv.config();

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nova-mind-gn43iueof-medhanshyadavs-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.options("*", cors());

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send("NovaMind Backend Running 🚀");
});

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌", err);
  });