import defaultDayjs from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { IUtils, DateIOFormats } from "@date-io/core/IUtils";

defaultDayjs.extend(customParseFormatPlugin);
defaultDayjs.extend(localizedFormatPlugin);
defaultDayjs.extend(isBetweenPlugin);

interface Opts {
  locale?: string;
  /** Make sure that your dayjs instance extends customParseFormat and advancedFormat */
  instance?: typeof defaultDayjs;
  formats?: Partial<DateIOFormats>;
}

type Dayjs = defaultDayjs.Dayjs;
type Constructor = (...args: Parameters<typeof defaultDayjs>) => Dayjs;

const withLocale = (dayjs: typeof defaultDayjs, locale?: string): Constructor =>
  !locale ? dayjs : (...args) => dayjs(...args).locale(locale);

const defaultFormats: DateIOFormats = {
  normalDateWithWeekday: "ddd, MMM D",
  normalDate: "D MMMM",
  shortDate: "MMM D",
  monthAndDate: "MMMM D",
  dayOfMonth: "D",
  year: "YYYY",
  month: "MMMM",
  monthShort: "MMM",
  monthAndYear: "MMMM YYYY",
  weekday: "dddd",
  weekdayShort: "ddd",
  minutes: "mm",
  hours12h: "hh",
  hours24h: "HH",
  seconds: "ss",
  fullTime: "LT",
  fullTime12h: "hh:mm A",
  fullTime24h: "HH:mm",
  fullDate: "ll",
  fullDateWithWeekday: "dddd, LL",
  fullDateTime: "lll",
  fullDateTime12h: "ll hh:mm A",
  fullDateTime24h: "ll HH:mm",
  keyboardDate: "L",
  keyboardDateTime: "L LT",
  keyboardDateTime12h: "L hh:mm A",
  keyboardDateTime24h: "L HH:mm",
};

const localizedFormats = {
  fullTime12h: "LT",
  fullTime24h: "LT",
  keyboardDate: "L",
  keyboardDateTime12h: "L LT",
  keyboardDateTime24h: "L LT",
};

export default class DayjsUtils implements IUtils<defaultDayjs.Dayjs> {
  public rawDayJsInstance: typeof defaultDayjs;
  public lib = "dayjs";
  public dayjs: Constructor;
  public locale?: string;
  public formats: DateIOFormats;

  constructor({ locale, formats, instance }: Opts = {}) {
    this.rawDayJsInstance = instance || defaultDayjs;
    this.dayjs = withLocale(this.rawDayJsInstance, locale);
    this.locale = locale;

    this.formats = Object.assign({}, defaultFormats, formats);
  }

  public is12HourCycleInCurrentLocale() {
    /* istanbul ignore next */
    return /A|a/.test(this.rawDayJsInstance.Ls[this.locale || "en"]?.formats?.LT);
  }

  public getCurrentLocaleCode() {
    return this.locale || "en";
  }

  public getFormatHelperText(format: string) {
    // @see https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/index.js
    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?)|./g;
    return format
      .match(localFormattingTokens)
      .map((token) => {
        var firstCharacter = token[0];
        if (firstCharacter === "L") {
          /* istanbul ignore next */
          return this.rawDayJsInstance.Ls[this.locale || "en"]?.formats[token] ?? token;
        }
        return token;
      })
      .join("")
      .replace(/a/gi, "(a|p)m")
      .toLocaleLowerCase();
  }

  public parse(value: any, format: any) {
    if (value === "") {
      return null;
    }

    return this.dayjs(value, format, this.locale);
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    return this.dayjs(value);
  }

  public toJsDate(value: Dayjs) {
    return value.toDate();
  }

  public isValid(value: any) {
    return this.dayjs(value).isValid();
  }

  public isNull(date: Dayjs) {
    return date === null;
  }

  public getDiff(date: Dayjs, comparing: Dayjs, units?: any, float?: any) {
    return date.diff(comparing, units, float);
  }

  public isAfter(date: Dayjs, value: Dayjs) {
    return date.isAfter(value);
  }

  public isBefore(date: Dayjs, value: Dayjs) {
    return date.isBefore(value);
  }

  public isAfterDay(date: Dayjs, value: Dayjs) {
    return date.isAfter(value, "day");
  }

  public isBeforeDay(date: Dayjs, value: Dayjs) {
    return date.isBefore(value, "day");
  }

  public isBeforeYear(date: Dayjs, value: Dayjs) {
    return date.isBefore(value, "year");
  }

  public isAfterYear(date: Dayjs, value: Dayjs) {
    return date.isAfter(value, "year");
  }

  public startOfDay(date: Dayjs) {
    return date.clone().startOf("day");
  }

  public endOfDay(date: Dayjs) {
    return date.clone().endOf("day");
  }

  public format(date: Dayjs, formatKey: keyof DateIOFormats) {
    return this.formatByString(date, this.formats[formatKey]);
  }

  public formatByString(date: Dayjs, formatString: string) {
    return this.dayjs(date).format(formatString);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(date: Dayjs) {
    return date.hour();
  }

  public addDays(date: Dayjs, count: number) {
    return count < 0 ? date.subtract(Math.abs(count), "day") : date.add(count, "day");
  }

  public addMonths(date: Dayjs, count: number) {
    return count < 0 ? date.subtract(Math.abs(count), "month") : date.add(count, "month");
  }

  public setMonth(date: Dayjs, count: number) {
    return date.set("month", count);
  }

  public setHours(date: Dayjs, count: number) {
    return date.set("hour", count);
  }

  public getMinutes(date: Dayjs) {
    return date.minute();
  }

  public setMinutes(date: Dayjs, count: number) {
    return date.clone().set("minute", count);
  }

  public getSeconds(date: Dayjs) {
    return date.second();
  }

  public setSeconds(date: Dayjs, count: number) {
    return date.clone().set("second", count);
  }

  public getMonth(date: Dayjs) {
    return date.month();
  }

  public isSameDay(date: Dayjs, comparing: Dayjs) {
    return date.isSame(comparing, "day");
  }

  public isSameMonth(date: Dayjs, comparing: Dayjs) {
    return date.isSame(comparing, "month");
  }

  public isSameYear(date: Dayjs, comparing: Dayjs) {
    return date.isSame(comparing, "year");
  }

  public isSameHour(date: Dayjs, comparing: Dayjs) {
    return date.isSame(comparing, "hour");
  }

  public getMeridiemText(ampm: "am" | "pm") {
    return ampm === "am" ? "AM" : "PM";
  }

  public startOfMonth(date: Dayjs) {
    return date.clone().startOf("month");
  }

  public endOfMonth(date: Dayjs) {
    return date.clone().endOf("month");
  }

  public startOfWeek(date: Dayjs) {
    return date.clone().startOf("week");
  }

  public endOfWeek(date: Dayjs) {
    return date.clone().endOf("week");
  }

  public getNextMonth(date: Dayjs) {
    return date.clone().add(1, "month");
  }

  public getPreviousMonth(date: Dayjs) {
    return date.clone().subtract(1, "month");
  }

  public getMonthArray(date: Dayjs) {
    const firstMonth = date.clone().startOf("year");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  }

  public getYear(date: Dayjs) {
    return date.year();
  }

  public setYear(date: Dayjs, year: number) {
    return date.clone().set("year", year);
  }

  public mergeDateAndTime(date: Dayjs, time: Dayjs) {
    return date.hour(time.hour()).minute(time.minute()).second(time.second());
  }

  public getWeekdays() {
    const start = this.dayjs().startOf("week");
    return [0, 1, 2, 3, 4, 5, 6].map((diff) =>
      this.formatByString(start.add(diff, "day"), "dd")
    );
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.dayjs(value).isSame(comparing);
  }

  public getWeekArray(date: Dayjs) {
    const start = this.dayjs(date).clone().startOf("month").startOf("week");
    const end = this.dayjs(date).clone().endOf("month").endOf("week");

    let count = 0;
    let current = start;
    const nestedWeeks: Dayjs[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, "day");
      count += 1;
    }

    return nestedWeeks;
  }

  public getYearRange(start: Dayjs, end: Dayjs) {
    const startDate = this.dayjs(start).startOf("year");
    const endDate = this.dayjs(end).endOf("year");
    const years: Dayjs[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "year");
    }

    return years;
  }

  public isWithinRange(date: Dayjs, [start, end]: [Dayjs, Dayjs]) {
    return date.isBetween(start, end, null, "[]");
  }
}
