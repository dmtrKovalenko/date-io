import "dayjs/locale/ru";
import dayjs from "dayjs";
import advancedDayJsFormat from "dayjs/plugin/advancedFormat";
import LuxonUtils from "../packages/luxon/src";
import { TEST_TIMESTAMP } from "./test-utils";
import DayjsUtils from "../packages/dayjs/src";

describe("Luxon -- Localization", () => {
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

describe("Dayjs -- Localization", () => {
  dayjs.locale("ru");
  dayjs.extend(advancedDayJsFormat);

  let dayjsUtils = new DayjsUtils({ instance: dayjs, locale: "ru" });
  const date = dayjsUtils.date(TEST_TIMESTAMP);

  it("Should display localized text", () => {
    expect(dayjsUtils.format(date, dayjsUtils.dateTime12hFormat)).toBe(
      "октябрь 30 11:44 am"
    );
  });
});
