import { utilsTest } from "./test-utils";

describe("DateTime formatting", () => {
  utilsTest("Should properly format to date&time", (date, utils, lib) => {
    const formattedDateTime = utils.format(date, utils.dateTime24hFormat);

    expect(formattedDateTime).toBe(
      // luxon doesn't support relative time (30th)
      lib === "Luxon" ? "October 30 11:44" : "October 30th 11:44"
    );
  });

  utilsTest("Should properly format to date", (date, utils, lib) => {
    const formattedDate = utils.format(date, utils.dateFormat);

    expect(formattedDate).toBe(lib === "Luxon" ? "October 30" : "October 30th");
  });

  utilsTest("Should properly format to time 24h", (date, utils) => {
    const formattedDate = utils.format(date, utils.time24hFormat);

    expect(formattedDate).toBe("11:44");
  });

  utilsTest("Should properly format to time 12h", (date, utils) => {
    const formattedDate = utils.format(date, utils.time12hFormat);

    expect(formattedDate).toBe("11:44 AM");
  });

  utilsTest("getWeekdays", (_, utils) => {
    expect(utils.getWeekdays()).toHaveLength(7);
  });

  utilsTest("formatNumber", (_, utils) => {
    expect(utils.formatNumber("12")).toBe("12");
  });
});
