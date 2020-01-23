import defaultMoment from "moment";
import { IUtils, DateIOFormats } from "@date-io/core/IUtils";

interface Opts {
  locale?: string;
  instance?: typeof defaultMoment;
  formats?: Partial<DateIOFormats>;
}

type Moment = defaultMoment.Moment;
const defaultFormats: DateIOFormats = {
  normalDate: "ddd, MMM D",
  shortDate: "MMM D",
  monthAndDate: "MMMM D",
  dayOfMonth: "D",
  year: "YYYY",
  month: "MMMM",
  monthShort: "MMM",
  monthAndYear: "MMMM YYYY",
  minutes: "mm",
  hours12h: "hh",
  hours24h: "HH",
  seconds: "ss",
  fullTime: "LT",
  fullTime12h: "hh:mm A",
  fullTime24h: "HH:mm",
  fullDate: "ll",
  fullDateTime: "lll",
  fullDateTime12h: "ll hh:mm A",
  fullDateTime24h: "ll HH:mm",
  keyboardDate: "L",
  keyboardDateTime: "L LT",
  keyboardDateTime12h: "L hh:mm A",
  keyboardDateTime24h: "L HH:mm"
};

export default class MomentUtils implements IUtils<defaultMoment.Moment> {
  public moment: typeof defaultMoment;
  public locale?: string;
  public formats: DateIOFormats;

  constructor({ locale, formats, instance }: Opts = {}) {
    this.moment = instance || defaultMoment;
    this.locale = locale;

    this.formats = {
      ...defaultFormats,
      ...formats
    };
  }

  public is12HourCycleInCurrentLocale() {
    return /A|a/.test(
      this.moment()
        .localeData()
        .longDateFormat("LT")
    );
  }

  public parse(value: string, format: string) {
    if (value === "") {
      return null;
    }

    return this.moment(value, format, true);
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    const moment = this.moment(value);
    moment.locale(this.locale);

    return moment;
  }

  public isValid(value: any) {
    return this.moment(value).isValid();
  }

  public isNull(date: Moment) {
    return date === null;
  }

  public getDiff(date: Moment, comparing: Moment | string) {
    return date.diff(comparing);
  }

  public isAfter(date: Moment, value: Moment) {
    return date.isAfter(value);
  }

  public isBefore(date: Moment, value: Moment) {
    return date.isBefore(value);
  }

  public isAfterDay(date: Moment, value: Moment) {
    return date.isAfter(value, "day");
  }

  public isBeforeDay(date: Moment, value: Moment) {
    return date.isBefore(value, "day");
  }

  public isBeforeYear(date: Moment, value: Moment) {
    return date.isBefore(value, "year");
  }

  public isAfterYear(date: Moment, value: Moment) {
    return date.isAfter(value, "year");
  }

  public startOfDay(date: Moment) {
    return date.clone().startOf("day");
  }

  public endOfDay(date: Moment) {
    return date.clone().endOf("day");
  }

  public format(date: Moment, formatKey: keyof DateIOFormats) {
    return this.formatByString(date, this.formats[formatKey]);
  }

  public formatByString(date: Moment, formatString: string) {
    date.locale(this.locale);
    return date.format(formatString);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(date: Moment) {
    return date.get("hours");
  }

  public addDays(date: Moment, count: number) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "days")
      : date.clone().add(count, "days");
  }

  public setHours(date: Moment, count: number) {
    return date.clone().hours(count);
  }

  public getMinutes(date: Moment) {
    return date.get("minutes");
  }

  public setMinutes(date: Moment, count: number) {
    return date.clone().minutes(count);
  }

  public getSeconds(date: Moment) {
    return date.get("seconds");
  }

  public setSeconds(date: Moment, count: number) {
    return date.clone().seconds(count);
  }

  public getMonth(date: Moment) {
    return date.get("month");
  }

  public isSameDay(date: Moment, comparing: Moment) {
    return date.isSame(comparing, "day");
  }

  public isSameMonth(date: Moment, comparing: Moment) {
    return date.isSame(comparing, "month");
  }

  public isSameYear(date: Moment, comparing: Moment) {
    return date.isSame(comparing, "year");
  }

  public isSameHour(date: Moment, comparing: Moment) {
    return date.isSame(comparing, "hour");
  }

  public setMonth(date: Moment, count: number) {
    return date.clone().month(count);
  }

  public getMeridiemText(ampm: "am" | "pm") {
    return ampm === "am" ? "AM" : "PM";
  }

  public startOfMonth(date: Moment) {
    return date.clone().startOf("month");
  }

  public endOfMonth(date: Moment) {
    return date.clone().endOf("month");
  }

  public getNextMonth(date: Moment) {
    return date.clone().add(1, "month");
  }

  public getPreviousMonth(date: Moment) {
    return date.clone().subtract(1, "month");
  }

  public getMonthArray(date: Moment) {
    const firstMonth = date.clone().startOf("year");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  }

  public getYear(date: Moment) {
    return date.get("year");
  }

  public setYear(date: Moment, year: number) {
    return date.clone().set("year", year);
  }

  public mergeDateAndTime(date: Moment, time: Moment) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getWeekdays() {
    return this.moment.weekdaysShort(true);
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  }

  public getWeekArray(date: Moment) {
    const start = date
      .clone()
      .startOf("month")
      .startOf("week");
    const end = date
      .clone()
      .endOf("month")
      .endOf("week");

    let count = 0;
    let current = start;
    const nestedWeeks: Moment[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, "day");
      count += 1;
    }

    return nestedWeeks;
  }

  public getYearRange(start: Moment, end: Moment) {
    const startDate = this.moment(start).startOf("year");
    const endDate = this.moment(end).endOf("year");
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "year");
    }

    return years;
  }
}
