import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoute from "./routes/user.routes.js"

dotenv.config();

const app = express()

const origin = [
    '*'
]
app.use(cors({
    origin
}))
app.use(express.json());

app.use("/api/users", userRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});