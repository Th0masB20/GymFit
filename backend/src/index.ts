import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import registerRouter from "./routes/RegisterRoute";
import ErrorHandler from "./utilities/ErrorHandler";
import loginRouter from "./routes/LoginRoute";
import authorize from "./utilities/ValidateUser";
import mainUserRoutes from './routes/ApiRoutes';
import saveWorkoutRoute from './routes/SaveWorkoutRoute';
import finishWorkoutRoute from "./routes/FinishWorkout";
import editWorkoutRoute from "./routes/EditWorkout";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('pageDist'));

const connectionString: string = `mongodb+srv://ThomasB20:${process.env.PASSWORD}@gymtracker.fv3h94k.mongodb.net/GymTracker?retryWrites=true&w=majority&appName=GymTracker`
const PORT: number = 3000;

mongoose.connect(connectionString).then(() => {
    app.listen(PORT, () => console.log('running'));
}
).catch(
    () => {
        console.log("an error occured with connection: try again");
    }
)
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', authorize, mainUserRoutes);
app.use('/workout/saveWorkout', authorize, saveWorkoutRoute);
app.use('/finishWorkout', authorize, finishWorkoutRoute);
app.use('/editWorkout', authorize, editWorkoutRoute);

app.use(ErrorHandler);
