import Moment from "moment";
import jMoment from "moment-jalaali";
import DefaultMomentUtils from "@date-io/moment";

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
  0: "۰"
};

interface Opts {
  /** @deprecated */
  moment?: typeof jMoment;
  instance?: typeof jMoment;
}

type Moment = jMoment.Moment;

export default class MomentUtils extends DefaultMomentUtils {
  public moment: typeof jMoment;

  public locale?: string;

  public dateTime12hFormat = "jMMMM jD hh:mm a";

  public dateTime24hFormat = "jMMMM jD HH:mm";

  public time12hFormat = "hh:mm A";

  public time24hFormat = "HH:mm";

  public dateFormat = "jMMMM jD";

  constructor({ moment, instance }: Opts = {}) {
    super({ locale: "fa", moment });

    this.moment = instance || moment || jMoment;
    this.locale = "fa";
  }

  private toJMoment(date?: any) {
    return this.moment(date ? date.clone() : undefined).locale("fa");
  }

  public parse(value: string, format: string) {
    if (value === "") {
      return null;
    }

    return this.moment(value, format, true).locale("fa");
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    return this.moment(value).locale("fa");
  }

  public isBeforeYear(date: Moment, value: Moment) {
    return date.jYear() < value.jYear();
  }

  public isAfterYear(date: Moment, value: Moment) {
    return date.jYear() > value.jYear();
  }

  public getMonth(date: Moment) {
    return date.jMonth();
  }

  public startOfMonth(date: Moment) {
    return date.clone().startOf("jMonth");
  }

  public endOfMonth(date: Moment) {
    return date.clone().endOf("jMonth");
  }

  getNextMonth(date: Moment) {
    return date.clone().add(1, "jMonth");
  }

  getPreviousMonth(date: Moment) {
    return date.clone().subtract(1, "jMonth");
  }

  public getYear(date: Moment) {
    return date.jYear();
  }

  public setYear(date: Moment, year: number) {
    return date.clone().jYear(year);
  }

  public getMeridiemText(ampm: "am" | "pm") {
    return ampm === "am"
      ? this.toJMoment()
          .hours(2)
          .format("A")
      : this.toJMoment()
          .hours(14)
          .format("A");
  }

  public getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
      return this.toJMoment()
        .weekday(dayOfWeek)
        .format("dd");
    });
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  }

  formatNumber(num: string) {
    return num.replace(/\d/g, match => symbolMap[match]).replace(/,/g, "،");
  }

  public getWeekArray(date: Moment) {
    const start = date
      .clone()
      .startOf("jMonth")
      .startOf("week");

    const end = date
      .clone()
      .endOf("jMonth")
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
    const startDate = this.moment(start).startOf("jYear");
    const endDate = this.moment(end).endOf("jYear");
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "jYear");
    }

    return years;
  }

  // displaying methods
  public getCalendarHeaderText(date: Moment) {
    return date.format("jMMMM jYYYY");
  }

  public getYearText(date: Moment) {
    return date.format("jYYYY");
  }

  public getDatePickerHeaderText(date: Moment) {
    return date.format("ddd, jMMM jD");
  }

  public getDateTimePickerHeaderText(date: Moment) {
    return date.format("jMMM jD");
  }

  public getDayText(date: Moment) {
    return date.format("jD");
  }
}
