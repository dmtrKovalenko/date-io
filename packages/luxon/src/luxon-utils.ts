import { DateTime, Info } from "luxon";
import { IUtils } from "@date-io/core/IUtils";

export default class LuxonUtils implements IUtils<DateTime> {
  public locale: string;

  public yearFormat = "yyyy";

  public yearMonthFormat = "LLLL yyyy";

  public dateTime12hFormat = "ff";

  public dateTime24hFormat = "MMMM dd T";

  public time12hFormat = "t";

  public time24hFormat = "T";

  public dateFormat = "MMMM dd";

  constructor({ locale }: { locale?: string } = {}) {
    this.locale = locale || "en";
  }

  public date(value?: any) {
    if (typeof value === "undefined") {
      return DateTime.local();
    }

    if (value === null) {
      return null;
    }

    if (typeof value === "string") {
      return DateTime.fromJSDate(new Date(value));
    }

    if (value instanceof DateTime) {
      return value;
    }

    return DateTime.fromJSDate(value);
  }

  public parse(value: string, formatString: string) {
    if (value === "") {
      return null;
    }

    return DateTime.fromFormat(value, formatString);
  }

  public addDays(date: DateTime, count: number) {
    if (count < 0) {
      return date.minus({ days: Math.abs(count) });
    }

    return date.plus({ days: count });
  }

  public isValid(value: any) {
    if (value instanceof DateTime) {
      return value.isValid;
    }

    if (value === null) {
      return false;
    }

    return this.date(value).isValid;
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    // make sure that null will not be passed to this.date
    if (value === null || comparing === null) {
      return false;
    }

    return this.date(value).equals(this.date(comparing));
  }

  public isSameDay(date: DateTime, comparing: DateTime) {
    return date.hasSame(comparing, "day");
  }

  public isSameMonth(date: DateTime, comparing: DateTime) {
    return date.hasSame(comparing, "month");
  }

  public isSameYear(date: DateTime, comparing: DateTime) {
    return date.hasSame(comparing, "year");
  }

  public isSameHour(date: DateTime, comparing: DateTime) {
    return date.hasSame(comparing, "hour");
  }

  public isAfter(value: DateTime, comparing: DateTime) {
    return value > comparing;
  }

  public isBefore(value: DateTime, comparing: DateTime) {
    return value < comparing;
  }

  public isBeforeDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing.startOf("day"), "days").toObject();
    return diff.days! < 0;
  }

  public isAfterDay(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing.endOf("day"), "days").toObject();
    return diff.days! > 0;
  }

  public isBeforeYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing.startOf("year"), "years").toObject();
    return diff.years! < 0;
  }

  public isAfterYear(value: DateTime, comparing: DateTime) {
    const diff = value.diff(comparing.endOf("year"), "years").toObject();
    return diff.years! > 0;
  }

  public getDiff(value: DateTime, comparing: DateTime | string) {
    if (typeof comparing === "string") {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    return value.diff(comparing).as("millisecond");
  }

  public startOfDay(value: DateTime) {
    return value.startOf("day");
  }

  public endOfDay(value: DateTime) {
    return value.endOf("day");
  }

  public format(date: DateTime, format: string) {
    return date.setLocale(this.locale).toFormat(format);
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getHours(value: DateTime) {
    return value.get("hour");
  }

  public setHours(value: DateTime, count: number) {
    return value.set({ hour: count });
  }

  public getMinutes(value: DateTime) {
    return value.get("minute");
  }

  public setMinutes(value: DateTime, count: number) {
    return value.set({ minute: count });
  }

  public getSeconds(value: DateTime) {
    return value.get("second");
  }

  public setSeconds(value: DateTime, count: number) {
    return value.set({ second: count });
  }

  public getMonth(value: DateTime) {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get("month") - 1;
  }

  public setMonth(value: DateTime, count: number) {
    return value.set({ month: count + 1 });
  }

  public getYear(value: DateTime) {
    return value.get("year");
  }

  public setYear(value: DateTime, year: number) {
    return value.set({ year });
  }

  public mergeDateAndTime(date: DateTime, time: DateTime) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public startOfMonth(value: DateTime) {
    return value.startOf("month");
  }

  public endOfMonth(value: DateTime) {
    return value.endOf("month");
  }

  public getNextMonth(value: DateTime) {
    return value.plus({ months: 1 });
  }

  public getPreviousMonth(value: DateTime) {
    return value.minus({ months: 1 });
  }

  public getMonthArray(date: DateTime) {
    const firstMonth = this.date(date).startOf("year");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  }

  public getWeekdays() {
    return Info.weekdaysFormat("narrow", { locale: this.locale });
  }

  public getWeekArray(date: DateTime) {
    const { days } = date
      .endOf("month")
      .endOf("week")
      .diff(date.startOf("month").startOf("week"), "days")
      .toObject();

    const weeks: DateTime[][] = [];
    new Array<number>(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map(day =>
        date
          .startOf("month")
          .startOf("week")
          .plus({ days: day })
      )
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  }

  public getYearRange(start: DateTime, end: DateTime) {
    start = this.date(start);
    end = this.date(end).plus({ years: 1 });
    const { years } = end.diff(start, "years").toObject();
    if (!years || years <= 0) {
      return [];
    }

    return new Array<number>(Math.round(years))
      .fill(0)
      .map((num, i) => i)
      .map(year => start.plus({ years: year }));
  }

  public getMeridiemText(ampm: "am" | "pm") {
    return Info.meridiems({ locale: this.locale }).find(
      v => v.toLowerCase() === ampm.toLowerCase()
    )!;
  }

  public getCalendarHeaderText(date: DateTime) {
    return this.format(date, this.yearMonthFormat);
  }

  public getDatePickerHeaderText(date: DateTime) {
    return this.format(date, "ccc, MMM d");
  }

  public getDateTimePickerHeaderText(date: DateTime) {
    return this.format(date, "MMM d");
  }

  public getMonthText(date: DateTime) {
    return this.format(date, "LLLL");
  }

  public getDayText(date: DateTime) {
    return this.format(date, "d");
  }

  public getHourText(date: DateTime, ampm: boolean) {
    if (ampm) {
      return date.toFormat("hh");
    }

    return date.toFormat("HH");
  }

  public getMinuteText(date: DateTime) {
    return date.toFormat("mm");
  }

  public getSecondText(date: DateTime) {
    return date.toFormat("ss");
  }

  public getYearText(date: DateTime) {
    return date.toFormat("yyyy");
  }

  public isNull(date: DateTime | null) {
    return date === null;
  }
}
