import defaultDayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IUtils } from "@date-io/core/IUtils";

defaultDayjs.extend(customParseFormat);
defaultDayjs.extend(advancedFormat);

interface Opts {
  locale?: string;
  /** Make sure that your dayjs instance extends customParseFormat and advancedFormat */
  instance?: typeof defaultDayjs;
  /** @deprecated */
  dayjs?: typeof defaultDayjs;
}

type Dayjs = defaultDayjs.Dayjs;
type Constructor = (...args: Parameters<typeof defaultDayjs>) => Dayjs;

const withLocale = (dayjs: typeof defaultDayjs, locale?: string): Constructor =>
  !locale ? dayjs : (...args) => dayjs(...args).locale(locale);

export default class DayjsUtils implements IUtils<defaultDayjs.Dayjs> {
  public dayjs: Constructor;

  public locale?: string;

  public yearFormat = "YYYY";

  public yearMonthFormat = "MMMM YYYY";

  public dateTime12hFormat = "MMMM Do hh:mm a";

  public dateTime24hFormat = "MMMM Do HH:mm";

  public time12hFormat = "hh:mm A";

  public time24hFormat = "HH:mm";

  public dateFormat = "MMMM Do";

  constructor({ locale, instance, dayjs }: Opts = {}) {
    this.dayjs = withLocale(instance || dayjs || defaultDayjs, locale);
    this.locale = locale;
  }

  public parse(value: any, format: any) {
    if (value === "") {
      return null;
    }

    return this.dayjs(value, format);
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    return this.dayjs(value);
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

  public format(date: Dayjs, formatString: string) {
    return this.dayjs(date).format(formatString);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(date: Dayjs) {
    return date.hour();
  }

  public addDays(date: Dayjs, count: number) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), "day")
      : date.clone().add(count, "day");
  }

  public setMonth(date: Dayjs, count: number) {
    return date.clone().set("month", count);
  }

  public setHours(date: Dayjs, count: number) {
    return date.clone().set("hour", count);
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

  public getMonthText(date: Dayjs) {
    return this.format(date, "MMMM");
  }

  public getYear(date: Dayjs) {
    return date.year();
  }

  public setYear(date: Dayjs, year: number) {
    return date.clone().set("year", year);
  }

  public mergeDateAndTime(date: Dayjs, time: Dayjs) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getWeekdays() {
    const start = this.dayjs().startOf("week");
    return [0, 1, 2, 3, 4, 5, 6].map(diff => this.format(start.add(diff, "day"), "dd"));
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.dayjs(value).isSame(comparing);
  }

  public getWeekArray(date: Dayjs) {
    const start = this.dayjs(date)
      .clone()
      .startOf("month")
      .startOf("week");
    const end = this.dayjs(date)
      .clone()
      .endOf("month")
      .endOf("week");

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

  // displaying methods
  public getCalendarHeaderText(date: Dayjs) {
    return this.format(date, "MMMM YYYY");
  }

  public getYearText(date: Dayjs) {
    return this.format(date, "YYYY");
  }

  public getDatePickerHeaderText(date: Dayjs) {
    return this.format(date, "ddd, MMM D");
  }

  public getDateTimePickerHeaderText(date: Dayjs) {
    return this.format(date, "MMM D");
  }

  public getDayText(date: Dayjs) {
    return this.format(date, "D");
  }

  public getHourText(date: Dayjs, ampm: boolean) {
    return this.format(date, ampm ? "hh" : "HH");
  }

  public getMinuteText(date: Dayjs) {
    return this.format(date, "mm");
  }

  public getSecondText(date: Dayjs) {
    return this.format(date, "ss");
  }
}
