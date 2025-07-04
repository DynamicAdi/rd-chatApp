import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoute from "./routes/user.routes.js"
import profileRoute from "./routes/profile.routes.js"
import announcementsRoute from "./routes/annoucements.routes.js"

dotenv.config();

const app = express();

const allowedOrigins =  ['*'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute)
app.use("/api/announcements", announcementsRoute)



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
