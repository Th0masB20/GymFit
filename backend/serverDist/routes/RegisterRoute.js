"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IRegiesterRequest_1 = require("../interfaces/IRegiesterRequest");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../mongodb/models/User"));
const CreateMonthlyCalendar_1 = require("../utilities/CreateMonthlyCalendar");
const registerRouter = express_1.default.Router();
registerRouter.post('/submit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        if (!(0, IRegiesterRequest_1.isRegisterCorrect)(payload)) {
            throw new Error('wrong inputs');
        }
        if ((yield User_1.default.find({ email: payload.email })).length != 0) {
            throw new Error('existing email');
        }
        const hashPassword = yield bcrypt_1.default.hash(payload.password, 10);
        const initialWorkout = { workoutName: '', updated: false };
        const initialWeeklyCalendar = { 'Monday': initialWorkout, 'Tuesday': initialWorkout, 'Wednesday': initialWorkout, 'Thursday': initialWorkout, 'Friday': initialWorkout, 'Saturday': initialWorkout, 'Sunday': initialWorkout };
        const newUserObject = {
            name: payload.name,
            lastName: payload.lastName,
            email: payload.email,
            password: hashPassword,
            age: undefined,
            height: undefined,
            workouts: [],
            activityLog: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            generalWeeklyCalendar: initialWeeklyCalendar,
            yearWeeklyCalendar: (0, CreateMonthlyCalendar_1.createNumberedWeeklyCalendar)(initialWeeklyCalendar),
            monthlyCalendar: (0, CreateMonthlyCalendar_1.createMonthlyCalendar)(initialWeeklyCalendar),
            workoutHistory: {},
            previousWorkout: {},
            JsonExercise: {}
        };
        const newUser = new User_1.default(newUserObject);
        yield newUser.save();
        res.json({ message: "Successfully Saved" });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = registerRouter;
