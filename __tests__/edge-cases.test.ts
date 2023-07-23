import { utilsTest, formats, TEST_TIMESTAMP } from "./test-utils";

describe("DateTime calculations", () => {
  utilsTest("getFormatHelperText - invalid input", (_, utils) => {
    if (utils.lib === "luxon") {
      return;
    }
    // if the format provided here is not a format we must simply return as is
    // in case user is using a custom specified format text
    expect(utils.getFormatHelperText("testtest")).toBe("testtest");
  });

  utilsTest("isEqual - invalid input", (date, utils) => {
    expect(utils.isEqual(null, null)).toBe(true);
    expect(utils.isEqual(date, null)).toBe(false);
    expect(utils.isEqual(null, date)).toBe(false);
  });

  utilsTest("parse - invalid input", (_, utils) => {
    const result = utils.parse("jf.bioifjwe.-", utils.formats.fullDateTime12h);
    expect(utils.isValid(result)).toBe(false);
  });

  utilsTest("getDiff - invalid input", (date, utils) => {
    const result = utils.getDiff(date, "fwe", "minutes");
    expect(result).toBe(0);
  });

});
