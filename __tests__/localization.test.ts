import LuxonUtils from "../packages/luxon/src";
import { TEST_TIMESTAMP } from "./test-utils";

describe("Localization", () => {
  describe("in French", () => {
    let luxonUtils = new LuxonUtils({ locale: "fr" });
    const date = luxonUtils.date(TEST_TIMESTAMP);

    it("Should display localized text", () => {
      expect(luxonUtils.getCalendarHeaderText(date)).toBe("octobre 2018");
    });
  });

  describe("in Russian", () => {
    let luxonUtils = new LuxonUtils({ locale: "ru" });
    const date = luxonUtils.date(TEST_TIMESTAMP);

    it("Should display localized text", () => {
      expect(luxonUtils.getCalendarHeaderText(date)).toBe("октябрь 2018");
    });
  });
});
