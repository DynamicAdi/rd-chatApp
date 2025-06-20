import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const origin = [
    '*'
]
app.use(cors({
    origin
}))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});





app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});