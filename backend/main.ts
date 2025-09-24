import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/user.routes.js";
import profileRoute from "./routes/profile.routes.js";
import announcementsRoute from "./routes/annoucements.routes.js";
import groupRoute from "./routes/group.route.js";
import workRoute from "./routes/work.route.js";
import projectRoute from "./routes/projects.route.js"
import cloudRoute from "./routes/cloud.routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/announcements", announcementsRoute);
app.use("/api/manage", groupRoute);
app.use("/api/work", workRoute);
app.use("/api/project", projectRoute)
app.use("/api/cloud", cloudRoute)

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
