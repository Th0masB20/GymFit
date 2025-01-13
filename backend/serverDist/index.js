"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const RegisterRoute_1 = __importDefault(require("./routes/RegisterRoute"));
const ErrorHandler_1 = __importDefault(require("./utilities/ErrorHandler"));
const LoginRoute_1 = __importDefault(require("./routes/LoginRoute"));
const ValidateUser_1 = __importDefault(require("./utilities/ValidateUser"));
const ApiRoutes_1 = __importDefault(require("./routes/ApiRoutes"));
const WorkoutRoutes_1 = __importDefault(require("./routes/WorkoutRoutes"));
const RefreshTokenRoute_1 = __importDefault(require("./routes/RefreshTokenRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('./dist'));
const connectionString = `${process.env.CONNECTION}${process.env.PASSWORD}${process.env.CONNECTION_END}`;
const PORT = Number(process.env.PORT) || 3000;
mongoose_1.default.connect(connectionString).then(() => {
    app.listen(PORT, () => console.log('running'));
}).catch(() => {
    console.log("an error occured with connection: try again");
});
app.use('/register', RegisterRoute_1.default);
app.use('/login', LoginRoute_1.default);
app.use('/home', ValidateUser_1.default, ApiRoutes_1.default);
app.use('/workout', ValidateUser_1.default, WorkoutRoutes_1.default);
app.use('/refresh', RefreshTokenRoute_1.default);
app.use(ErrorHandler_1.default);
