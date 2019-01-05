import { utilsTest, formats, TEST_TIMESTAMP } from "./test-utils";

describe("DateTime calculations", () => {
  utilsTest("date", (date, utils) => {
    // ISO string
    expect(utils.isEqual(date, utils.date(TEST_TIMESTAMP))).toBeTruthy();
    // native Date
    expect(utils.isEqual(date, utils.date(new Date(TEST_TIMESTAMP)))).toBeTruthy();
    // parse already date-specific object
    expect(utils.isEqual(date, utils.date(utils.date(TEST_TIMESTAMP)))).toBeTruthy();
    // parse null inputs
    expect(utils.date(null)).toBeNull();
  });

  utilsTest("isValid", (date, utils) => {
    const invalidDate = utils.date("2018-42-30T11:60:00.000Z");

    expect(utils.isValid(date)).toBeTruthy();
    expect(utils.isValid(invalidDate)).toBeFalsy();
  });

  utilsTest("addDays", (date, utils, lib) => {
    expect(utils.format(utils.addDays(date, 1), formats.day[lib])).toBe("31");
  });

  utilsTest("startOfDay", (date, utils, lib) => {
    expect(utils.format(utils.startOfDay(date), formats.dateTime[lib])).toBe(
      "2018-10-30 00:00"
    );
  });

  utilsTest("endOfDay", (date, utils, lib) => {
    expect(utils.format(utils.endOfDay(date), formats.dateTime[lib])).toBe(
      "2018-10-30 23:59"
    );
  });

  utilsTest("startOfMonth", (date, utils, lib) => {
    expect(utils.format(utils.startOfMonth(date), formats.dateTime[lib])).toBe(
      "2018-10-01 00:00"
    );
  });

  utilsTest("endOfMonth", (date, utils, lib) => {
    expect(utils.format(utils.endOfMonth(date), formats.dateTime[lib])).toBe(
      "2018-10-31 23:59"
    );
  });

  utilsTest("getPreviousMonth", (date, utils, lib) => {
    expect(utils.format(utils.getPreviousMonth(date), formats.dateTime[lib])).toBe(
      "2018-09-30 11:44"
    );
  });

  utilsTest("getNextMonth", (date, utils, lib) => {
    expect(utils.format(utils.getNextMonth(date), formats.dateTime[lib])).toBe(
      "2018-11-30 11:44"
    );
  });

  utilsTest("getHours", (date, utils) => {
    expect(utils.getHours(date)).toBe(new Date(TEST_TIMESTAMP).getHours());
  });

  utilsTest("getMinutes", (date, utils) => {
    expect(utils.getMinutes(date)).toBe(44);
  });

  utilsTest("getSeconds", (date, utils) => {
    expect(utils.getSeconds(date)).toBe(0);
  });

  utilsTest("getYear", (date, utils) => {
    expect(utils.getYear(date)).toBe(2018);
  });

  utilsTest("getMonth", (date, utils) => {
    expect(utils.getMonth(date)).toBe(9);
  });

  utilsTest("setHours", (date, utils, lib) => {
    const updatedTime = utils.format(utils.setHours(date, 0), formats.dateTime[lib]);
    expect(updatedTime).toBe("2018-10-30 00:44");
  });

  utilsTest("setMinutes", (date, utils, lib) => {
    const updatedTime = utils.format(utils.setMinutes(date, 12), formats.dateTime[lib]);
    expect(updatedTime).toBe("2018-10-30 11:12");
  });

  utilsTest("setMinutes", (date, utils, lib) => {
    const updatedTime = utils.format(utils.setMinutes(date, 12), formats.dateTime[lib]);
    expect(updatedTime).toBe("2018-10-30 11:12");
  });

  utilsTest("setYear", (date, utils, lib) => {
    const updatedTime = utils.format(utils.setYear(date, 2011), formats.dateTime[lib]);
    expect(updatedTime).toBe("2011-10-30 11:44");
  });

  utilsTest("setSeconds", (date, utils) => {
    expect(utils.setSeconds(date, 11)).toBeTruthy();
  });

  utilsTest("isAfter", (date, utils, lib) => {
    expect(utils.isAfter(utils.date(), date)).toBeTruthy();
    expect(utils.isAfter(date, utils.date())).toBeFalsy();
  });

  utilsTest("isBefore", (date, utils, lib) => {
    expect(utils.isBefore(date, utils.date())).toBeTruthy();
    expect(utils.isBefore(utils.date(), date)).toBeFalsy();
  });

  utilsTest("isAfterDay", (date, utils, lib) => {
    const nextDay = utils.addDays(date, 1);

    expect(utils.isAfterDay(nextDay, date)).toBeTruthy();
    expect(utils.isAfterDay(date, nextDay)).toBeFalsy();
  });

  utilsTest("isBeforeDay", (date, utils, lib) => {
    const previousDay = utils.addDays(date, -1);

    expect(utils.isBeforeDay(date, previousDay)).toBeFalsy();
    expect(utils.isBeforeDay(previousDay, date)).toBeTruthy();
  });

  utilsTest("isAfterYear", (date, utils, lib) => {
    const nextYear = utils.setYear(date, 2019);

    expect(utils.isAfterYear(nextYear, date)).toBeTruthy();
    expect(utils.isAfterYear(date, nextYear)).toBeFalsy();
  });

  utilsTest("isBeforeYear", (date, utils, lib) => {
    const previousYear = utils.setYear(date, 2017);

    expect(utils.isBeforeYear(date, previousYear)).toBeFalsy();
    expect(utils.isBeforeYear(previousYear, date)).toBeTruthy();
  });

  utilsTest("getWeekArray", (date, utils) => {
    const weekArray = utils.getWeekArray(date);

    expect(weekArray).toHaveLength(5);
    for (const week of weekArray) {
      expect(week).toHaveLength(7);
    }
  });

  utilsTest("getYearRange", (date, utils) => {
    const yearRange = utils.getYearRange(date, utils.setYear(date, 2024));

    expect(yearRange).toHaveLength(7);
    expect(utils.getYear(yearRange[yearRange.length - 1])).toBe(2024);

    const emptyYearRange = utils.getYearRange(
      date,
      utils.setYear(date, utils.getYear(date) - 1)
    );

    expect(emptyYearRange).toHaveLength(0);
  });

  utilsTest("getDiff", (date, utils) => {
    expect(utils.getDiff(date, "2018-10-29T11:44:00.000Z")).toBe(86400000);
    expect(utils.getDiff(date, "2018-10-31T11:44:00.000Z")).toBe(-86400000);
    expect(utils.getDiff(date, utils.date("2018-10-31T11:44:00.000Z"))).toBe(-86400000);
  });

  utilsTest("mergeDateAndTime", (date, utils, lib) => {
    const mergedDate = utils.mergeDateAndTime(
      date,
      utils.date("2018-01-01T14:00:00.000Z")
    );

    expect(utils.format(mergedDate, formats.dateTime[lib])).toBe("2018-10-30 14:00");
  });

  utilsTest("isEqual", (date, utils) => {
    expect(utils.isEqual(utils.date(null), null)).toBeTruthy();
    expect(utils.isEqual(date, utils.date(TEST_TIMESTAMP))).toBeTruthy();
  });

  utilsTest("parse", (date, utils, lib) => {
    const parsedDate = utils.parse("2018-10-30 11:44", formats.dateTime[lib]);

    expect(utils.isEqual(parsedDate, date)).toBeTruthy();
    expect(utils.parse("", formats.dateTime[lib])).toBeNull();
  });

  utilsTest("isNull", (date, utils, lib) => {
    expect(utils.isNull(null)).toBeTruthy();
    expect(utils.isNull(date)).toBeFalsy();
  });

  utilsTest("isSameDay", (date, utils, lib) => {
    expect(utils.isSameDay(date, utils.date("2018-10-30T00:00:00.000Z"))).toBeTruthy();
  });
});
