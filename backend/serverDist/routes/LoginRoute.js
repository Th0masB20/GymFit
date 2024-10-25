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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ILogin_1 = require("../interfaces/ILogin");
const User_1 = __importDefault(require("../mongodb/models/User"));
const GetExercises_1 = __importDefault(require("../utilities/GetExercises"));
const loginRouter = express_1.default.Router();
loginRouter.post('/loginUser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        if (!(0, ILogin_1.isLoginCorrect)(payload)) {
            throw new Error('incorrect login');
        }
        const user = yield User_1.default.findOne({ email: payload.email });
        if (!user) {
            throw new Error('user DNE');
        }
        const isLoggedIn = yield bcrypt_1.default.compare(payload.password, user.password);
        if (!isLoggedIn) {
            throw new Error('incorrect password');
        }
        const ticket = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_STRING, { expiresIn: '1h' });
        res.cookie('ticket', ticket, {
            maxAge: 1000 * 60 * 60,
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });
        //once its logged in, get exercises from api and store it
        const exercises = yield (0, GetExercises_1.default)();
        user.JsonExercise = exercises;
        yield user.save();
        res.status(200).json({ message: 'Successfully Signed In' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = loginRouter;
