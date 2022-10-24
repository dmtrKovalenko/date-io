import Moment from "moment";
import jMoment from "moment-jalaali";
import DefaultMomentUtils from "@date-io/moment";
import { DateIOFormats } from "@date-io/core/IUtils";

var symbolMap = {
  1: "۱",
  2: "۲",
  3: "۳",
  4: "۴",
  5: "۵",
  6: "۶",
  7: "۷",
  8: "۸",
  9: "۹",
  0: "۰",
};

interface Opts {
  instance?: typeof jMoment;
  formats?: Partial<DateIOFormats>;
}

type Moment = jMoment.Moment;
const defaultFormats: DateIOFormats = {
  dayOfMonth: "jD",
  fullDate: "jYYYY, jMMMM Do",
  fullDateWithWeekday: "dddd Do jMMMM jYYYY",
  fullDateTime: "jYYYY, jMMMM Do, hh:mm A",
  fullDateTime12h: "jD jMMMM hh:mm A",
  fullDateTime24h: "jD jMMMM HH:mm",
  fullTime: "LT",
  fullTime12h: "hh:mm A",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  keyboardDate: "jYYYY/jMM/jDD",
  keyboardDateTime: "jYYYY/jMM/jDD LT",
  keyboardDateTime12h: "jYYYY/jMM/jDD hh:mm A",
  keyboardDateTime24h: "jYYYY/jMM/jDD HH:mm",
  minutes: "mm",
  month: "jMMMM",
  monthAndDate: "jD jMMMM",
  monthAndYear: "jMMMM jYYYY",
  monthShort: "jMMM",
  weekday: "dddd",
  weekdayShort: "ddd",
  normalDate: "dddd, jD jMMM",
  normalDateWithWeekday: "DD MMMM",
  seconds: "ss",
  shortDate: "jD jMMM",
  year: "jYYYY",
};

export default class MomentUtils extends DefaultMomentUtils {
  public lib = "moment-jalaali";
  public moment: typeof jMoment;
  public locale?: string;
  public formats: DateIOFormats;

  constructor({ formats, instance }: Opts = {}) {
    super({ locale: "fa", instance });

    this.moment = instance || jMoment;
    this.locale = "fa";

    this.formats = Object.assign({}, defaultFormats, formats);
  }

  private toJMoment = (date?: any) => {
    return this.moment(date ? date.clone() : undefined).locale("fa");
  };

  public parse = (value: string, format: string) => {
    if (value === "") {
      return null;
    }

    return this.moment(value, format, true).locale("fa");
  };

  public date = (value?: any) => {
    if (value === null) {
      return null;
    }

    return this.moment(value).locale("fa");
  };

  public isBeforeYear = (date: Moment, value: Moment) => {
    return date.jYear() < value.jYear();
  };

  public isAfterYear = (date: Moment, value: Moment) => {
    return date.jYear() > value.jYear();
  };

  public getMonth = (date: Moment) => {
    return date.jMonth();
  };

  public getDaysInMonth = (date: Moment) => {
    return date.daysInMonth();
  };

  public startOfYear = (date: Moment) => {
    return date.clone().startOf("jYear");
  };

  public endOfYear = (date: Moment) => {
    return date.clone().endOf("jYear");
  };

  public startOfMonth = (date: Moment) => {
    return date.clone().startOf("jMonth");
  };

  public endOfMonth = (date: Moment) => {
    return date.clone().endOf("jMonth");
  };

  getNextMonth = (date: Moment) => {
    return date.clone().add(1, "jMonth");
  };

  getPreviousMonth = (date: Moment) => {
    return date.clone().subtract(1, "jMonth");
  };

  public getYear = (date: Moment) => {
    return date.jYear();
  };

  public setYear = (date: Moment, year: number) => {
    return date.clone().jYear(year);
  };

  public getDate = (date: Moment) => {
    return date.jDate();
  };

  public setDate = (date: Moment, count: number) => {
    return date.clone().jDate(count);
  };

  public getMeridiemText = (ampm: "am" | "pm") => {
    return ampm === "am"
      ? this.toJMoment().hours(2).format("A")
      : this.toJMoment().hours(14).format("A");
  };

  public getWeekdays = () => {
    return [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
      return this.toJMoment().weekday(dayOfWeek).format("dd");
    });
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  };

  formatNumber = (num: string) => {
    return num.replace(/\d/g, (match) => symbolMap[match]).replace(/,/g, "،");
  };

  public getWeekArray = (date: Moment) => {
    const start = date.clone().startOf("jMonth").startOf("week");

    const end = date.clone().endOf("jMonth").endOf("week");

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
  };

  public getYearRange = (start: Moment, end: Moment) => {
    const startDate = this.moment(start).startOf("jYear");
    const endDate = this.moment(end).endOf("jYear");
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "jYear");
    }

    return years;
  };
}
