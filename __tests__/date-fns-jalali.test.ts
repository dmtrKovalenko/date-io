import DateFnsJalaliUtils from "../packages/date-fns-jalali/src";
import { TEST_TIMESTAMP } from "./test-utils";
import ruLocale from "date-fns/locale/ru";

const date = new Date(TEST_TIMESTAMP); /* 1397/08/08  سه‌شنبه*/
const dateTimeFormat = "yyyy/MM/dd HH:mm";

describe("DateFnsJalali", () => {
  describe("DateTime calculations", () => {
    const utils = new DateFnsJalaliUtils();

    it("DateFnsJalali -- date", () => {
      // ISO string
      expect(utils.isEqual(date, utils.date(TEST_TIMESTAMP))).toBeTruthy();
      // native Date
      expect(utils.isEqual(date, utils.date(new Date(TEST_TIMESTAMP)))).toBeTruthy();
      // parse already date-specific object
      expect(utils.isEqual(date, utils.date(utils.date(TEST_TIMESTAMP)))).toBeTruthy();
      // parse null inputs
      expect(utils.date(null)).toBeNull();
      // undefined
      expect(utils.date(undefined)).toBeTruthy();
    });

    it("DateFnsJalali -- isValid", () => {
      const invalidDate = utils.date("2018-42-30T11:60:00.000Z");

      expect(utils.isValid(date)).toBeTruthy();
      expect(utils.isValid(invalidDate)).toBeFalsy();
      expect(utils.isValid(undefined)).toBeTruthy();
      expect(utils.isValid(null)).toBeFalsy();
      expect(utils.isValid("2018-42-30T11:60:00.000Z")).toBeFalsy();
    });

    it("DateFnsJalali -- addSeconds", () => {
      expect(utils.format(utils.addSeconds(date, 65), "seconds")).toBe("05");
      expect(utils.format(utils.addSeconds(date, -5), "seconds")).toBe("55");
    });

    it("DateFnsJalali -- addMinutes", () => {
      expect(utils.format(utils.addMinutes(date, 65), "minutes")).toBe("49");
      expect(utils.format(utils.addMinutes(date, -5), "minutes")).toBe("39");
    });

    it("DateFnsJalali -- addHours", () => {
      expect(utils.format(utils.addHours(date, 65), "hours24h")).toBe("04");
      expect(utils.format(utils.addHours(date, -5), "hours24h")).toBe("06");
    });

    it("DateFnsJalali -- addDays", () => {
      expect(utils.format(utils.addDays(date, 1), "dayOfMonth")).toBe("9");
      expect(utils.format(utils.addDays(date, -1), "dayOfMonth")).toBe("7");
    });

    it("DateFnsJalali -- addWeeks", () => {
      expect(utils.getDiff(utils.addWeeks(date, 1), date, "weeks")).toBe(1);
      expect(utils.getDiff(utils.addWeeks(date, -1), date, "weeks")).toBe(-1);
    });

    it("DateFnsJalali -- addMonths", () => {
      expect(utils.format(utils.addMonths(date, 2), "monthAndYear")).toBe("دی 1397");
      expect(utils.format(utils.addMonths(date, -2), "monthAndYear")).toBe("شهریور 1397");
    });

    it("DateFnsJalali -- startOfDay", () => {
      expect(utils.formatByString(utils.startOfDay(date), dateTimeFormat)).toBe(
        "1397/08/08 00:00"
      );
    });

    it("DateFnsJalali -- endOfDay", () => {
      expect(utils.formatByString(utils.endOfDay(date), dateTimeFormat)).toBe(
        "1397/08/08 23:59"
      );
    });

    it("DateFnsJalali -- startOfYear", () => {
      expect(utils.formatByString(utils.startOfYear(date), dateTimeFormat)).toBe(
        "1397/01/01 00:00"
      );
    });

    it("DateFnsJalali -- endOfYear", () => {
      expect(utils.formatByString(utils.endOfYear(date), dateTimeFormat)).toBe(
        "1397/12/29 23:59"
      );
    });

    it("DateFnsJalali -- startOfMonth", () => {
      expect(utils.formatByString(utils.startOfMonth(date), dateTimeFormat)).toBe(
        "1397/08/01 00:00"
      );
    });

    it("DateFnsJalali -- endOfMonth", () => {
      expect(utils.formatByString(utils.endOfMonth(date), dateTimeFormat)).toBe(
        "1397/08/30 23:59"
      );
    });

    it("DateFnsJalali -- startOfWeek", () => {
      expect(utils.formatByString(utils.startOfWeek(date), dateTimeFormat)).toBe(
        "1397/08/05 00:00"
      );
    });

    it("DateFnsJalali -- endOfWeek", () => {
      expect(utils.formatByString(utils.endOfWeek(date), dateTimeFormat)).toBe(
        "1397/08/11 23:59"
      );
    });

    it("DateFnsJalali -- getPreviousMonth", () => {
      expect(utils.formatByString(utils.getPreviousMonth(date), dateTimeFormat)).toBe(
        "1397/07/08 11:44"
      );
    });

    it("DateFnsJalali -- getMonthArray", () => {
      expect(
        utils
          .getMonthArray(date)
          .map((date) => utils.formatByString(date, dateTimeFormat))
      ).toEqual([
        "1397/01/01 00:00",
        "1397/02/01 00:00",
        "1397/03/01 00:00",
        "1397/04/01 00:00",
        "1397/05/01 00:00",
        "1397/06/01 00:00",
        "1397/07/01 00:00",
        "1397/08/01 00:00",
        "1397/09/01 00:00",
        "1397/10/01 00:00",
        "1397/11/01 00:00",
        "1397/12/01 00:00",
      ]);
    });

    it("DateFnsJalali -- getNextMonth", () => {
      expect(utils.formatByString(utils.getNextMonth(date), dateTimeFormat)).toBe(
        "1397/09/08 11:44"
      );
    });

    it("DateFnsJalali -- getHours", () => {
      expect(utils.getHours(date)).toBe(new Date(TEST_TIMESTAMP).getHours());
    });

    it("DateFnsJalali -- getMinutes", () => {
      expect(utils.getMinutes(date)).toBe(44);
    });

    it("DateFnsJalali -- getSeconds", () => {
      expect(utils.getSeconds(date)).toBe(0);
    });

    it("DateFnsJalali -- getYear", () => {
      expect(utils.getYear(date)).toBe(1397);
    });

    it("DateFnsJalali -- getMonth", () => {
      expect(utils.getMonth(date)).toBe(7);
    });

    it("DateFnsJalali -- getMonth", () => {
      expect(utils.getDaysInMonth(date)).toBe(30);
    });

    it("DateFnsJalali -- setMonth", () => {
      const updatedTime = utils.formatByString(utils.setMonth(date, 4), dateTimeFormat);
      expect(updatedTime).toBe("1397/05/08 11:44");
    });

    it("DateFnsJalali -- setHours", () => {
      const updatedTime = utils.formatByString(utils.setHours(date, 0), dateTimeFormat);
      expect(updatedTime).toBe("1397/08/08 00:44");
    });

    it("DateFnsJalali -- setMinutes", () => {
      const updatedTime = utils.formatByString(
        utils.setMinutes(date, 12),
        dateTimeFormat
      );
      expect(updatedTime).toBe("1397/08/08 11:12");
    });

    it("DateFnsJalali -- setMinutes", () => {
      const updatedTime = utils.formatByString(
        utils.setMinutes(date, 12),
        dateTimeFormat
      );
      expect(updatedTime).toBe("1397/08/08 11:12");
    });

    it("DateFnsJalali -- setYear", () => {
      const updatedTime = utils.formatByString(utils.setYear(date, 1399), dateTimeFormat);
      expect(updatedTime).toBe("1399/08/08 11:44");
    });

    it("DateFnsJalali -- setSeconds", () => {
      expect(utils.setSeconds(date, 11)).toBeTruthy();
    });

    it("DateFnsJalali -- isAfter", () => {
      expect(utils.isAfter(utils.date(), date)).toBeTruthy();
      expect(utils.isAfter(date, utils.date())).toBeFalsy();
    });

    it("DateFnsJalali -- isBefore", () => {
      expect(utils.isBefore(date, utils.date())).toBeTruthy();
      expect(utils.isBefore(utils.date(), date)).toBeFalsy();
    });

    it("DateFnsJalali -- isAfterDay", () => {
      const nextDay = utils.addDays(date, 1);

      expect(utils.isAfterDay(nextDay, date)).toBeTruthy();
      expect(utils.isAfterDay(date, nextDay)).toBeFalsy();
    });

    it("DateFnsJalali -- isBeforeDay", () => {
      const previousDay = utils.addDays(date, -1);

      expect(utils.isBeforeDay(date, previousDay)).toBeFalsy();
      expect(utils.isBeforeDay(previousDay, date)).toBeTruthy();
    });

    it("DateFnsJalali -- isAfterYear", () => {
      const nextYear = utils.setYear(date, 2019);

      expect(utils.isAfterYear(nextYear, date)).toBeTruthy();
      expect(utils.isAfterYear(date, nextYear)).toBeFalsy();
    });

    it("DateFnsJalali -- isBeforeYear", () => {
      const previousYear = utils.setYear(date, 1380);

      expect(utils.isBeforeYear(date, previousYear)).toBeFalsy();
      expect(utils.isBeforeYear(previousYear, date)).toBeTruthy();
    });

    it("DateFnsJalali -- getWeekArray", () => {
      const weekArray = utils.getWeekArray(date);

      expect(weekArray).toHaveLength(5);
      for (const week of weekArray) {
        expect(week).toHaveLength(7);
      }
    });

    it("DateFnsJalali -- getYearRange", () => {
      const yearRange = utils.getYearRange(date, utils.setYear(date, 1503));

      expect(yearRange).toHaveLength(107);
      expect(utils.getYear(yearRange[yearRange.length - 1])).toBe(1503);

      const emptyYearRange = utils.getYearRange(
        date,
        utils.setYear(date, utils.getYear(date) - 1)
      );

      expect(emptyYearRange).toHaveLength(0);
    });

    it("DateFnsJalali -- getDiff", () => {
      expect(utils.getDiff(date, utils.date("2018-10-29T11:44:00.000Z"))).toBe(86400000);
      expect(utils.getDiff(date, utils.date("2018-10-31T11:44:00.000Z"))).toBe(-86400000);
      expect(utils.getDiff(date, "2018-10-31T11:44:00.000Z")).toBe(-86400000);
      expect(utils.getDiff(date, utils.date("2017-09-29T11:44:00.000Z"), "years")).toBe(
        1
      );
      expect(utils.getDiff(date, utils.date("2018-08-29T11:44:00.000Z"), "months")).toBe(
        2
      );
      expect(
        utils.getDiff(date, utils.date("2018-05-29T11:44:00.000Z"), "quarters")
      ).toBe(1);
      expect(utils.getDiff(date, utils.date("2018-09-29T11:44:00.000Z"), "days")).toBe(
        31
      );
      expect(utils.getDiff(date, utils.date("2018-09-29T11:44:00.000Z"), "weeks")).toBe(
        4
      );
      expect(utils.getDiff(date, utils.date("2018-09-29T11:44:00.000Z"), "hours")).toBe(
        744
      );
      expect(utils.getDiff(date, utils.date("2018-09-29T11:44:00.000Z"), "minutes")).toBe(
        44640
      );
      expect(utils.getDiff(date, utils.date("2018-10-30T10:44:00.000Z"), "seconds")).toBe(
        3600
      );
      expect(
        utils.getDiff(date, utils.date("2018-10-30T10:44:00.000Z"), "milliseconds")
      ).toBe(3600000);
    });

    it("DateFnsJalali -- mergeDateAndTime", () => {
      const mergedDate = utils.mergeDateAndTime(
        date,
        utils.date("2018-01-01T14:15:16.000Z")
      );

      expect(utils.toJsDate(mergedDate).toISOString()).toBe("2018-10-30T14:15:16.000Z");
    });

    it("DateFnsJalali -- isEqual", () => {
      expect(utils.isEqual(utils.date(null), null)).toBeTruthy();
      expect(utils.isEqual(date, utils.date(TEST_TIMESTAMP))).toBeTruthy();
      expect(utils.isEqual(null, utils.date(TEST_TIMESTAMP))).toBeFalsy();
    });

    it("DateFnsJalali -- parse", () => {
      const parsedDate = utils.parse("1397/08/08 11:44", dateTimeFormat);

      expect(utils.isEqual(parsedDate, date)).toBeTruthy();
      expect(utils.parse("", dateTimeFormat)).toBeNull();
    });

    it("DateFnsJalali -- parseISO", () => {
      const parsedDate = utils.parseISO(TEST_TIMESTAMP);

      expect(utils.toISO(parsedDate)).toEqual(TEST_TIMESTAMP.replace(".000Z", "Z"))
    });

    it("DateFnsJalali -- isNull", () => {
      expect(utils.isNull(null)).toBeTruthy();
      expect(utils.isNull(date)).toBeFalsy();
    });

    it("DateFnsJalali -- isSameDay", () => {
      expect(utils.isSameDay(date, utils.date("2018-10-30T00:00:00.000Z"))).toBeTruthy();
      expect(utils.isSameDay(date, utils.date("2019-10-30T00:00:00.000Z"))).toBeFalsy();
    });

    it("DateFnsJalali -- isSameMonth", () => {
      expect(
        utils.isSameMonth(date, utils.date("2018-11-12T00:00:00.000Z"))
      ).toBeTruthy();
      expect(utils.isSameMonth(date, utils.date("2019-11-12T00:00:00.000Z"))).toBeFalsy();
    });

    it("DateFnsJalali -- isSameYear", () => {
      expect(utils.isSameYear(date, utils.date("2018-10-01T00:00:00.000Z"))).toBeTruthy();
      expect(utils.isSameYear(date, utils.date("2019-10-01T00:00:00.000Z"))).toBeFalsy();
    });

    it("DateFnsJalali -- isSameHour", () => {
      expect(utils.isSameHour(date, utils.date(TEST_TIMESTAMP))).toBeTruthy();
      expect(
        utils.isSameHour(date, utils.addDays(utils.date(TEST_TIMESTAMP), 5))
      ).toBeFalsy();
    });

    it("DateFnsJalali -- getCurrentLocaleCode: ", () => {
      expect(utils.getCurrentLocaleCode()).toMatch(/fa-IR/);
    });

    it("DateFnsJalali -- toJsDate: ", () => {
      expect(utils.toJsDate(date)).toBeInstanceOf(Date);
    });

    it("DateFnsJalali -- isWithinRange:  isBetween 2 other dates", () => {
      expect(
        utils.isWithinRange(utils.date("2019-10-01T00:00:00.000Z"), [
          utils.date("2019-09-01T00:00:00.000Z"),
          utils.date("2019-11-01T00:00:00.000Z"),
        ])
      ).toBeTruthy();

      expect(
        utils.isWithinRange(utils.date("2019-12-01T00:00:00.000Z"), [
          utils.date("2019-09-01T00:00:00.000Z"),
          utils.date("2019-11-01T00:00:00.000Z"),
        ])
      ).toBeFalsy();
    });

    it("DateFnsJalali -- isWithinRange:  of range", () => {
      expect(
        utils.isWithinRange(utils.date("2019-09-01T00:00:00.000Z"), [
          utils.date("2019-09-01T00:00:00.000Z"),
          utils.date("2019-12-01T00:00:00.000Z"),
        ])
      ).toBeTruthy();

      expect(
        utils.isWithinRange(utils.date("2019-12-01T00:00:00.000Z"), [
          utils.date("2019-09-01T00:00:00.000Z"),
          utils.date("2019-12-01T00:00:00.000Z"),
        ])
      ).toBeTruthy();
    });

    describe("formats", () => {
      test.each`
        format                     | expected
        ${"dayOfMonth"}            | ${"12"}
        ${"fullDate"}              | ${"12-ام بهمن 1398"}
        ${"fullDateTime"}          | ${"12-ام بهمن 1398 7:44 ب.ظ."}
        ${"fullDateTime12h"}       | ${"12-ام بهمن 1398 07:44 ب.ظ."}
        ${"fullDateTime24h"}       | ${"12-ام بهمن 1398 19:44"}
        ${"fullTime"}              | ${"7:44 ب.ظ."}
        ${"fullTime12h"}           | ${"07:44 ب.ظ."}
        ${"fullTime24h"}           | ${"19:44"}
        ${"hours12h"}              | ${"07"}
        ${"hours24h"}              | ${"19"}
        ${"keyboardDate"}          | ${"1398/11/12"}
        ${"keyboardDateTime"}      | ${"1398/11/12 7:44 ب.ظ."}
        ${"keyboardDateTime12h"}   | ${"1398/11/12 07:44 ب.ظ."}
        ${"keyboardDateTime24h"}   | ${"1398/11/12 19:44"}
        ${"minutes"}               | ${"44"}
        ${"month"}                 | ${"بهمن"}
        ${"monthAndDate"}          | ${"12 بهمن"}
        ${"monthAndYear"}          | ${"بهمن 1398"}
        ${"monthShort"}            | ${"بهم"}
        ${"normalDate"}            | ${"12 بهمن"}
        ${"normalDateWithWeekday"} | ${"شنبه, 12 بهمن"}
        ${"seconds"}               | ${"00"}
        ${"shortDate"}             | ${"12 بهم"}
        ${"year"}                  | ${"1398"}
      `(
        "DateFnsJalali -- Correctly formats jalaali format $format",
        ({ format, expected }) => {
          const date = utils.date("2020-02-01T19:44:00.000Z");

          expect(utils.format(date, format)).toBe(expected);
        }
      );
    });
  });

  describe("Localization", () => {
    const FaDateFnsUtils = new DateFnsJalaliUtils();
    const RuDateFnsUtils = new DateFnsJalaliUtils({ locale: ruLocale });

    it("DateFnsJalali -- Should return weekdays starting with Saturday", () => {
      const result = RuDateFnsUtils.getWeekdays();
      expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
    });

    it("DateFnsJalali -- is12HourCycleInCurrentLocale: properly determine should use meridiem or not", () => {
      expect(FaDateFnsUtils.is12HourCycleInCurrentLocale()).toBe(true);
      expect(RuDateFnsUtils.is12HourCycleInCurrentLocale()).toBe(false);
      // default behavior
      expect(new DateFnsJalaliUtils().is12HourCycleInCurrentLocale()).toBe(true);
    });

    it("DateFnsJalali -- getCurrentLocaleCode: returns locale code", () => {
      expect(RuDateFnsUtils.getCurrentLocaleCode()).toBe("ru");
    });
    it("DateFnsJalali -- startOfWeek: returns correct start of week for locale", () => {
      expect(
        RuDateFnsUtils.formatByString(
          RuDateFnsUtils.startOfWeek(RuDateFnsUtils.date(TEST_TIMESTAMP)),
          "d"
        )
      ).toEqual("7");
    });
    it("DateFnsJalali -- endOfWeek: returns correct end of week for locale", () => {
      expect(
        RuDateFnsUtils.formatByString(
          RuDateFnsUtils.endOfWeek(RuDateFnsUtils.date(TEST_TIMESTAMP)),
          "d"
        )
      ).toEqual("13");
    });
  });

  describe("Localization helpers", () => {
    const utils = new DateFnsJalaliUtils();

    it("DateFnsJalali -- formatNumber", () => {
      expect(utils.formatNumber("1")).toBe("۱");
    });

    it("DateFnsJalali -- getMeridiemText", () => {
      expect(utils.getMeridiemText("am")).toBe("ق.ظ.");
      expect(utils.getMeridiemText("pm")).toBe("ب.ظ.");
    });
  });

  describe("formatHelperText", () => {
    const utils = new DateFnsJalaliUtils();

    it("DateFnsJalali -- getFormatHelperText", () => {
      expect(utils.getFormatHelperText(utils.formats.keyboardDate)).toBe("yyyy/mm/dd");
      expect(utils.getFormatHelperText(utils.formats.keyboardDateTime12h)).toBe(
        "yyyy/mm/dd hh:mm (a|p)m"
      );
    });
  });
});
