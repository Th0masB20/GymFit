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
import workoutRoute from './routes/WorkoutRoutes';
import refreshTokenRoute from "./routes/RefreshTokenRoute";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./dist'));

const connectionString: string = `${process.env.CONNECTION}${process.env.PASSWORD}${process.env.CONNECTION_END}`
const PORT: number = Number(process.env.PORT) || 3000;

mongoose.connect(connectionString).then(() => {
    app.listen(PORT, () => console.log('running on port ' + PORT));
}
).catch(
    () => {
        console.log("an error occured with connection: try again");
    }
)

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', authorize, mainUserRoutes);
app.use('/workout', authorize, workoutRoute);
app.use('/refresh', refreshTokenRoute)

app.use(ErrorHandler);