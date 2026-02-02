import express from "express";
//import https from "https"
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import fs from 'fs'
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

const connectionString: string = `${process.env.CONNECTION}${process.env.PASSWORD}${process.env.CONNECTION_END}`
const PORT: number = Number(process.env.PORT) || 3000;
//const certificates: https.ServerOptions = { key: fs.readFileSync('./certificates/key.pem'), cert: fs.readFileSync('certificates/cert.pem') }
//const server = https.createServer(certificates, app);

mongoose.connect(connectionString).then(() => {
    //server.listen(PORT, () => console.log('running on port ' + PORT));
    app.listen(PORT);
}
).catch(
    (error) => {
        console.log("an error occured with connection: try again: \n", error);
        console.log(connectionString)
    }
)

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', authorize, mainUserRoutes);
app.use('/workout', authorize, workoutRoute);
app.use('/refresh', refreshTokenRoute)

app.use(ErrorHandler);


export default app;