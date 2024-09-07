import ICalendar, { INumberedWeekCalendar, IWeeklyCalendar, IMonthName, IWeekDay, IMonthCalendar } from "../interfaces/ICalendar";
import moment from "moment";

export const createMonthlyCalendar = (weeklyCalendar: IWeeklyCalendar): ICalendar => {
    const calendar: ICalendar = {} as ICalendar;
    const monthIndex: IMonthName[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentYear = moment().year();

    for (let i = 0; i < 12; i++) {
        let numberOfDays = moment().month(i).daysInMonth();
        calendar[monthIndex[i]] = {} as IMonthCalendar;
        for (let date = 1; date <= numberOfDays; date++) {
            let dayString: IWeekDay = getDayFromDayInMonth(currentYear, i, date);
            if (weeklyCalendar[dayString].updated) continue;
            calendar[monthIndex[i]][date] = weeklyCalendar[dayString];
        }
    }
    return calendar;
}

export const createNumberedWeeklyCalendar = (weeklyCalendar: IWeeklyCalendar): INumberedWeekCalendar => {
    const numberedWeeks: INumberedWeekCalendar = {} as INumberedWeekCalendar;
    const numberOfWeeks = moment().weeksInYear();
    for (let week = 0; week < numberOfWeeks; week++) {
        numberedWeeks[week] = weeklyCalendar;
    }
    return numberedWeeks;
}

const getDayFromDayInMonth = (year: number, month: number, date: number): IWeekDay => {
    const days: IWeekDay[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const index = moment().year(year).month(month).date(date).day();
    return days[index];
}

