import { localDateutilsTest, formats, LOCALDATE_TEST_TIMESTAMP } from "./test-utils";

describe("DateTime calculations", () => {
  localDateutilsTest("date", (date, utils) => {
    // ISO string
    expect(utils.isEqual(date, utils.date(LOCALDATE_TEST_TIMESTAMP))).toBeTruthy();
    // parse already date-specific object
    expect(utils.isEqual(date, utils.date(utils.date(LOCALDATE_TEST_TIMESTAMP)))).toBeTruthy();
    // parse null inputs
    expect(utils.date(null)).toBeNull();
    // undefined
    expect(utils.date(undefined)).toBeTruthy();
  });

  localDateutilsTest("isValid", (date, utils) => {
    const invalidDate = utils.date("2018-42-30T11:60:00.000Z");

    expect(utils.isValid(date)).toBeTruthy();
    expect(utils.isValid(invalidDate)).toBeFalsy();
    expect(utils.isValid(undefined)).toBeTruthy();
    expect(utils.isValid(null)).toBeFalsy();
    expect(utils.isValid("2018-42-30T11:60:00.000Z")).toBeFalsy();
  });

  localDateutilsTest("addDays", (date, utils, lib) => {
    expect(utils.format(utils.addDays(date, 1), "dayOfMonth")).toBe("31");
    expect(utils.format(utils.addDays(date, -1), "dayOfMonth")).toBe("29");
  });

  localDateutilsTest("addWeeks", (date, utils, lib) => {
    expect(utils.getDiff(utils.addWeeks(date, 1), date, "weeks")).toBe(1);
    expect(utils.getDiff(utils.addWeeks(date, -1), date, "weeks")).toBe(-1);
  });

  localDateutilsTest("addMonths", (date, utils, lib) => {
    expect(utils.format(utils.addMonths(date, 2), "monthAndYear")).toBe("December 2018");
    expect(utils.format(utils.addMonths(date, -2), "monthAndYear")).toBe("August 2018");
  });

  localDateutilsTest("addYears", (date, utils, lib) => {
    expect(utils.format(utils.addYears(date, 2), "year")).toBe("2020");
    expect(utils.format(utils.addYears(date, -2), "year")).toBe("2016");
  });

  localDateutilsTest("startOfDay", (date, utils, lib) => {
    expect(utils.formatByString(utils.startOfDay(date), formats.dateTime[lib])).toBe(
      "2018-10-30 00:00"
    );
  });

  localDateutilsTest("endOfDay", (date, utils, lib) => {
    expect(utils.formatByString(utils.endOfDay(date), formats.dateTime[lib])).toBe(
      "2018-10-30 23:59"
    );
  });

  localDateutilsTest("startOfYear", (date, utils, lib) => {
    expect(utils.formatByString(utils.startOfYear(date), formats.dateTime[lib])).toBe(
      "2018-01-01 00:00"
    );
  });

  localDateutilsTest("endOfYear", (date, utils, lib) => {
    expect(utils.formatByString(utils.endOfYear(date), formats.dateTime[lib])).toBe(
      "2018-12-31 23:59"
    );
  });

  localDateutilsTest("startOfMonth", (date, utils, lib) => {
    expect(utils.formatByString(utils.startOfMonth(date), formats.dateTime[lib])).toBe(
      "2018-10-01 00:00"
    );
  });

  localDateutilsTest("endOfMonth", (date, utils, lib) => {
    expect(utils.formatByString(utils.endOfMonth(date), formats.dateTime[lib])).toBe(
      "2018-10-31 23:59"
    );
  });

  localDateutilsTest("startOfWeek", (date, utils, lib) => {
    expect(utils.formatByString(utils.startOfWeek(date), formats.dateTime[lib])).toBe(
      lib === "Luxon" ? "2018-10-29 00:00" : "2018-10-28 00:00"
    );
  });

  localDateutilsTest("endOfWeek", (date, utils, lib) => {
    expect(utils.formatByString(utils.endOfWeek(date), formats.dateTime[lib])).toBe(
      lib === "Luxon" ? "2018-11-04 23:59" : "2018-11-03 23:59"
    );
  });

  localDateutilsTest("getPreviousMonth", (date, utils, lib) => {
    expect(
      utils.formatByString(utils.getPreviousMonth(date), formats.date[lib])
    ).toBe("2018-09-30");
  });

  localDateutilsTest("getMonthArray", (date, utils, lib) => {
    expect(
      utils
        .getMonthArray(date)
        .map((date) => utils.formatByString(date, formats.dateTime[lib]))
    ).toEqual([
      "2018-01-01 00:00",
      "2018-02-01 00:00",
      "2018-03-01 00:00",
      "2018-04-01 00:00",
      "2018-05-01 00:00",
      "2018-06-01 00:00",
      "2018-07-01 00:00",
      "2018-08-01 00:00",
      "2018-09-01 00:00",
      "2018-10-01 00:00",
      "2018-11-01 00:00",
      "2018-12-01 00:00",
    ]);
  });

  localDateutilsTest("getNextMonth", (date, utils, lib) => {
    expect(utils.formatByString(utils.getNextMonth(date), formats.date[lib])).toBe(
      "2018-11-30"
    );
  });

  localDateutilsTest("getYear", (date, utils) => {
    expect(utils.getYear(date)).toBe(2018);
  });

  localDateutilsTest("getDate", (date, utils) => {
    expect(utils.getDate(date)).toBe(30);
  });

  localDateutilsTest("getMonth", (date, utils) => {
    expect(utils.getMonth(date)).toBe(9);
  });

  localDateutilsTest("getDaysInMonth", (date, utils) => {
    expect(utils.getDaysInMonth(date)).toBe(31);
  });

  localDateutilsTest("setMonth", (date, utils, lib) => {
    const updatedTime = utils.formatByString(
      utils.setMonth(date, 4),
      formats.date[lib]
    );
    expect(updatedTime).toBe("2018-05-30");
  });

  localDateutilsTest("setYear", (date, utils, lib) => {
    const updatedTime = utils.formatByString(
      utils.setYear(date, 2011),
      formats.date[lib]
    );
    expect(updatedTime).toBe("2011-10-30");
  });

  localDateutilsTest("setYear", (date, utils, lib) => {
    const updatedTime = utils.formatByString(
      utils.setDate(date, 15),
      formats.date[lib]
    );
    expect(updatedTime).toBe("2018-10-15");
  });

  localDateutilsTest("isAfter", (date, utils, lib) => {
    expect(utils.isAfter(utils.date("2021-01-01"), utils.date(LOCALDATE_TEST_TIMESTAMP))).toBeTruthy();
    expect(utils.isAfter(utils.date(LOCALDATE_TEST_TIMESTAMP), utils.date("2021-01-01"))).toBeFalsy();
  });

  localDateutilsTest("isBefore", (date, utils, lib) => {
    expect(utils.isBefore(utils.date(LOCALDATE_TEST_TIMESTAMP), utils.date("2021-01-01"))).toBeTruthy();
    expect(utils.isBefore(utils.date("2021-01-01"), utils.date(LOCALDATE_TEST_TIMESTAMP))).toBeFalsy();
  });

  localDateutilsTest("isAfterDay", (date, utils, lib) => {
    const nextDay = utils.addDays(date, 1);

    expect(utils.isAfterDay(nextDay, date)).toBeTruthy();
    expect(utils.isAfterDay(date, nextDay)).toBeFalsy();
  });

  localDateutilsTest("isBeforeDay", (date, utils, lib) => {
    const previousDay = utils.addDays(date, -1);

    expect(utils.isBeforeDay(date, previousDay)).toBeFalsy();
    expect(utils.isBeforeDay(previousDay, date)).toBeTruthy();
  });

  localDateutilsTest("isAfterYear", (date, utils, lib) => {
    const nextYear = utils.setYear(date, 2019);

    expect(utils.isAfterYear(nextYear, date)).toBeTruthy();
    expect(utils.isAfterYear(date, nextYear)).toBeFalsy();
  });

  localDateutilsTest("isBeforeYear", (date, utils, lib) => {
    const previousYear = utils.setYear(date, 2017);

    expect(utils.isBeforeYear(date, previousYear)).toBeFalsy();
    expect(utils.isBeforeYear(previousYear, date)).toBeTruthy();
  });

  localDateutilsTest("getWeekArray", (date, utils) => {
    const weekArray = utils.getWeekArray(date);

    expect(weekArray).toHaveLength(5);
    for (const week of weekArray) {
      expect(week).toHaveLength(7);
    }
  });

  localDateutilsTest("getYearRange", (date, utils) => {
    const yearRange = utils.getYearRange(date, utils.setYear(date, 2124));

    expect(yearRange).toHaveLength(107);
    expect(utils.getYear(yearRange[yearRange.length - 1])).toBe(2124);

    const emptyYearRange = utils.getYearRange(
      date,
      utils.setYear(date, utils.getYear(date) - 1)
    );

    expect(emptyYearRange).toHaveLength(0);
  });


  localDateutilsTest("getDiff with units", (date, utils) => {
    expect(utils.getDiff(date, utils.date("2017-09-29"), "years")).toBe(1);
    expect(utils.getDiff(date, utils.date("2018-08-29"), "months")).toBe(2);
    expect(utils.getDiff(date, utils.date("2018-05-29"), "quarters")).toBe(
      1
    );
    expect(utils.getDiff(date, utils.date("2018-09-29"), "days")).toBe(31);
    expect(utils.getDiff(date, utils.date("2018-09-29"), "weeks")).toBe(4);
  });

  localDateutilsTest("mergeDateAndTime", (date, utils, lib) => {
    const mergedDate = utils.mergeDateAndTime(
      date,
      utils.date("2018-01-01T14:15:16.000Z")
    );

    expect(utils.toJsDate(mergedDate).toISOString()).toBe("2018-10-30T14:15:16.000Z");
  });

  localDateutilsTest("isEqual", (date, utils) => {
    expect(utils.isEqual(utils.date(null), null)).toBeTruthy();
    expect(utils.isEqual(date, utils.date(LOCALDATE_TEST_TIMESTAMP))).toBeTruthy();
    expect(utils.isEqual(null, utils.date(LOCALDATE_TEST_TIMESTAMP))).toBeFalsy();
  });

  localDateutilsTest("parse", (date, utils, lib) => {
    const parsedDate = utils.parse("2018-10-30", formats.date[lib]);

    expect(utils.isEqual(parsedDate, date)).toBeTruthy();
    expect(utils.parse("", formats.dateTime[lib])).toBeNull();
  });

  localDateutilsTest("parse invalid inputs", (date, utils, lib) => {
    const parsedDate = utils.parse("99-99-9999", formats.dateTime[lib]);

    // expect(utils.isValid(parsedDateMoreText)).toBe(false);
    expect(utils.isValid(parsedDate)).toBe(false);
  });

  localDateutilsTest("isNull", (date, utils, lib) => {
    expect(utils.isNull(null)).toBeTruthy();
    expect(utils.isNull(date)).toBeFalsy();
  });

  localDateutilsTest("isSameDay", (date, utils, lib) => {
    expect(utils.isSameDay(date, utils.date("2018-10-30T00:00:00.000Z"))).toBeTruthy();
    expect(utils.isSameDay(date, utils.date("2019-10-30T00:00:00.000Z"))).toBeFalsy();
  });

  localDateutilsTest("isSameMonth", (date, utils, lib) => {
    expect(utils.isSameMonth(date, utils.date("2018-10-01T00:00:00.000Z"))).toBeTruthy();
    expect(utils.isSameMonth(date, utils.date("2019-10-01T00:00:00.000Z"))).toBeFalsy();
  });

  localDateutilsTest("isSameYear", (date, utils, lib) => {
    expect(utils.isSameYear(date, utils.date("2018-10-01T00:00:00.000Z"))).toBeTruthy();
    expect(utils.isSameYear(date, utils.date("2019-10-01T00:00:00.000Z"))).toBeFalsy();
  });


  localDateutilsTest("getCurrentLocaleCode: returns default locale", (date, utils, lib) => {
    expect(utils.getCurrentLocaleCode()).toMatch(/en/);
  });

  localDateutilsTest("toJsDate: returns date object", (date, utils) => {
    expect(utils.toJsDate(date)).toBeInstanceOf(Date);
  });

  localDateutilsTest("isWithinRange: checks that dates isBetween 2 other dates", (date, utils) => {
    expect(
      utils.isWithinRange(utils.date("2019-10-01"), [
        utils.date("2019-09-01"),
        utils.date("2019-11-01"),
      ])
    ).toBeTruthy();

    expect(
      utils.isWithinRange(utils.date("2019-12-01"), [
        utils.date("2019-09-01"),
        utils.date("2019-11-01"),
      ])
    ).toBeFalsy();
  });

  localDateutilsTest("isWithinRange: should use inclusivity of range", (date, utils) => {
    expect(
      utils.isWithinRange(utils.date("2019-09-01"), [
        utils.date("2019-09-01"),
        utils.date("2019-12-01"),
      ])
    ).toBeTruthy();

    expect(
      utils.isWithinRange(utils.date("2019-12-01"), [
        utils.date("2019-09-01"),
        utils.date("2019-12-01"),
      ])
    ).toBeTruthy();
  });
});
