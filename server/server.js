import chatRoutes from "./routes/chat.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "https://nova-mind-rizelp4u0-medhanshyadavs-projects.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.send(
    "NovaMind Backend Running 🚀"
  );
});

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(
      "Mongo Error:",
      err
    );
  });

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});