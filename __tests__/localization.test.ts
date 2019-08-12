import "dayjs/locale/ru";
import dayjs from "dayjs";
import advancedDayJsFormat from "dayjs/plugin/advancedFormat";
import LuxonUtils from "../packages/luxon/src";
import { TEST_TIMESTAMP } from "./test-utils";
import DayjsUtils from "../packages/dayjs/src";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "../packages/date-fns/src";

describe("DateFns -- Localization", () => {
  const dateFnsUtils = new DateFnsUtils({ locale: ruLocale });
  const date = dateFnsUtils.date(TEST_TIMESTAMP);

  it("Should display localized datapicker text", () => {
    expect(dateFnsUtils.getDatePickerHeaderText(date)).toBe("втр, окт. 30");
  });

  it("Should return weekdays starting with monday", () => {
    expect(dateFnsUtils.getWeekdays()).toEqual([
      "пн",
      "вт",
      "ср",
      "чт",
      "пт",
      "сб",
      "вс"
    ]);
  });
});

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

    it("Should return weekdays starting with monday", () => {
      expect(luxonUtils.getWeekdays()).toEqual([
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб",
        "вс"
      ]);
    });
  });
});

describe("Dayjs -- Localization", () => {
  dayjs.locale("ru");
  dayjs.extend(advancedDayJsFormat);

  let dayjsUtils = new DayjsUtils({ instance: dayjs, locale: "ru" });
  const date = dayjsUtils.date(TEST_TIMESTAMP);

  it("Should display localized text", () => {
    const result = dayjsUtils.format(date, dayjsUtils.dateTime12hFormat);
    expect(result).toBe("октябрь 30 11:44 am");
  });

  it("getWeekdays: should start from monday", () => {
    const result = dayjsUtils.getWeekdays();
    expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
  });

  it("getWeekArray: week should start from monday", () => {
    const result = dayjsUtils.getWeekArray(date);
    expect(result[0][0].format("dd")).toBe("пн");
  });
});
