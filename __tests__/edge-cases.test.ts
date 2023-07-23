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
});
