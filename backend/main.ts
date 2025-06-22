import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoute from "./routes/user.routes.js"

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://your-production-domain.com']
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
