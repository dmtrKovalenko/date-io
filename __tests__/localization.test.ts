import "dayjs/locale/ru";
import dayjs from "dayjs";
import advancedDayJsFormat from "dayjs/plugin/advancedFormat";
import LuxonUtils from "../packages/luxon/src";
import { TEST_TIMESTAMP } from "./test-utils";
import DayjsUtils from "../packages/dayjs/src";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import moment from "moment";

describe("DateFns -- Localization", () => {
  const dateFnsUtils = new DateFnsUtils({ locale: ruLocale });

  it("Should return weekdays starting with monday", () => {
    const result = dateFnsUtils.getWeekdays();
    expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
  });
});

describe("Luxon -- Localization", () => {
  describe("in French", () => {
    let luxonUtils = new LuxonUtils({ locale: "fr" });
    const date = luxonUtils.date(TEST_TIMESTAMP);
  });

  describe("in Russian", () => {
    let luxonUtils = new LuxonUtils({ locale: "ru" });
    const date = luxonUtils.date(TEST_TIMESTAMP);

    it("Should return weekdays starting with monday", () => {
      const result = luxonUtils.getWeekdays();
      expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
    });
  });
});

describe("Moment -- localization", () => {
  describe("Russian", () => {
    const momentUtils = new MomentUtils({ locale: "ru" });
    const date = momentUtils.date(TEST_TIMESTAMP);

    it("getWeekdays: should start from monday", () => {
      moment.locale("ru");
      const result = momentUtils.getWeekdays();
      expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
    });

    it("getWeekArray: week should start from monday", () => {
      moment.locale("ru");
      const result = momentUtils.getWeekArray(date);
      expect(result[0][0].format("dd")).toBe("пн");
    });
  });

  describe.skip("English", () => {
    const momentUtils = new MomentUtils({ locale: "en" });
    const date = momentUtils.date(TEST_TIMESTAMP);

    it("getWeekdays: should start from monday", () => {
      const result = momentUtils.getWeekdays();
      expect(result).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    });

    it("getWeekArray: week should start from monday", () => {
      const result = momentUtils.getWeekArray(date);
      expect(result[0][0].format("dd")).toBe("Su");
    });
  });
});

describe("Dayjs -- Localization", () => {
  dayjs.extend(advancedDayJsFormat);

  describe("Russian", () => {
    let dayjsUtils = new DayjsUtils({ instance: dayjs, locale: "ru" });
    const date = dayjsUtils.date(TEST_TIMESTAMP);

    it("getWeekdays: should start from monday", () => {
      const result = dayjsUtils.getWeekdays();
      expect(result).toEqual(["пн", "вт", "ср", "чт", "пт", "сб", "вс"]);
    });

    it("getWeekArray: week should start from monday", () => {
      const result = dayjsUtils.getWeekArray(date);
      expect(result[0][0].format("dd")).toBe("пн");
    });
  });

  describe("English", () => {
    let dayjsUtils = new DayjsUtils({ instance: dayjs, locale: "en" });
    const date = dayjsUtils.date(TEST_TIMESTAMP);

    it("getWeekdays: should start from sunday", () => {
      const result = dayjsUtils.getWeekdays();
      expect(result).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
    });

    it("getWeekArray: week should start from sunday", () => {
      const result = dayjsUtils.getWeekArray(date);
      expect(result[0][0].format("dd")).toBe("Su");
    });
  });
});
