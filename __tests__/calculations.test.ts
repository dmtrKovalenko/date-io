import { utilsTest, formats, TEST_TIMESTAMP } from "./test-utils";

describe("DateTime calculations", () => {
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
    const getYearRange = utils.getYearRange(date, utils.setYear(date, 2024));

    expect(getYearRange).toHaveLength(7);
    expect(utils.getYear(getYearRange[getYearRange.length - 1])).toBe(2024);
  });
});
