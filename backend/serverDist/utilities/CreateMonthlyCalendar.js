"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumberedWeeklyCalendar = exports.createMonthlyCalendar = void 0;
const moment_1 = __importDefault(require("moment"));
const createMonthlyCalendar = (weeklyCalendar) => {
    const calendar = {};
    const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentYear = (0, moment_1.default)().year();
    for (let i = 0; i < 12; i++) {
        let numberOfDays = (0, moment_1.default)().month(i).daysInMonth();
        calendar[monthIndex[i]] = {};
        for (let date = 1; date <= numberOfDays; date++) {
            let dayString = getDayFromDayInMonth(currentYear, i, date);
            if (weeklyCalendar[dayString].updated)
                continue;
            calendar[monthIndex[i]][date] = weeklyCalendar[dayString];
        }
    }
    return calendar;
};
exports.createMonthlyCalendar = createMonthlyCalendar;
const createNumberedWeeklyCalendar = (weeklyCalendar) => {
    const numberedWeeks = {};
    const numberOfWeeks = (0, moment_1.default)().weeksInYear();
    for (let week = 0; week < numberOfWeeks; week++) {
        numberedWeeks[week] = weeklyCalendar;
    }
    return numberedWeeks;
};
exports.createNumberedWeeklyCalendar = createNumberedWeeklyCalendar;
const getDayFromDayInMonth = (year, month, date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const index = (0, moment_1.default)().year(year).month(month).date(date).day();
    return days[index];
};
