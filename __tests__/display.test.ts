import { utilsTest } from "./test-utils";

describe("Display methods", () => {
  utilsTest("getCalendarHeaderText", (date, utils) => {
    expect(utils.getCalendarHeaderText(date)).toBe("October 2018");
  });

  utilsTest("getYearText", (date, utils) => {
    expect(utils.getYearText(date)).toBe("2018");
  });

  utilsTest("getDatePickerHeaderText", (date, utils) => {
    expect(utils.getDatePickerHeaderText(date)).toBe("Tue, Oct 30");
  });

  utilsTest("getDateTimePickerHeaderText", (date, utils) => {
    expect(utils.getDateTimePickerHeaderText(date)).toBe("Oct 30");
  });

  utilsTest("getDayText", (date, utils) => {
    expect(utils.getDayText(date)).toBe("30");
  });

  utilsTest("getHourText", (date, utils) => {
    expect(utils.getHourText(date, true)).toBe("11");
    expect(utils.getHourText(date, false)).toBe("11");
  });

  utilsTest("getMinuteText", (date, utils) => {
    expect(utils.getMinuteText(date)).toBe("44");
  });

  utilsTest("getSecondText", (date, utils) => {
    expect(utils.getSecondText(date)).toBe("00");
  });

  utilsTest("getMeridiemText", (_, utils) => {
    expect(utils.getMeridiemText("am")).toBe("AM");
    expect(utils.getMeridiemText("pm")).toBe("PM");
  });
});
