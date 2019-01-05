import LuxonUtils from "../packages/luxon/src";
import { TEST_TIMESTAMP } from "./test-utils";

describe("Localization", () => {
  let luxonUtils = new LuxonUtils({ locale: "fr" });

  it("Should display localized text", () => {
    const date = luxonUtils.date(TEST_TIMESTAMP);
    expect(luxonUtils.getCalendarHeaderText(date)).toBe("octobre 2018");
  });
});
