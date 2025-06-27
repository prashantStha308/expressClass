import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
console.log(__dirname);
app.use('/storage', express.static(path.join(__dirname, 'src', 'storage')));

app.use('/user', userRouter);

app.listen(5000, () => {
    console.log('http://localhost:5000');
    connectDb();
});