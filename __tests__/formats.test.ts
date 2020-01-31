import ruDateFnsLocale from "date-fns/locale/ru";
import LuxonUtils from "../packages/luxon/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import DayjsUtils from "../packages/dayjs/src";
import { allUtils } from "./test-utils";
import moment from "moment";
import "dayjs/locale/ru";

test.each`
  format                     | expectedWithEn
  ${"normalDate"}            | ${"1 January"}
  ${"normalDateWithWeekday"} | ${"Wed, Jan 1"}
  ${"shortDate"}             | ${"Jan 1"}
  ${"year"}                  | ${"2020"}
  ${"month"}                 | ${"January"}
  ${"monthAndDate"}          | ${"January 1"}
  ${"dayOfMonth"}            | ${"1"}
  ${"fullTime12h"}           | ${"11:44 PM"}
  ${"fullTime24h"}           | ${"23:44"}
  ${"hours12h"}              | ${"11"}
  ${"hours24h"}              | ${"23"}
  ${"minutes"}               | ${"44"}
  ${"seconds"}               | ${"00"}
`("Correctly format standalone hardcoded formats", ({ format, expectedWithEn }) => {
  allUtils.forEach(([libName, utils]) => {
    const date: any = utils.date("2020-01-01T23:44:00.000Z");
    const result = utils.format(date, format);
    if (result !== expectedWithEn) {
      throw new Error(
        `${libName} utils.formats.${format} results to "${result}", expected "${expectedWithEn}"`
      );
    }
  });
});

describe("Localized formats", () => {
  test.each`
    format                   | expectedWithEn            | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}          | ${"1 февр. 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"} | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"} | ${"1 февр. 2020 г. 11:44 вечера"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}    | ${"1 февр. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}           | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 11:44 вечера"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}     | ${"01.02.2020 23:44"}
  `("Moment localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const momentUtils = new MomentUtils({ instance: moment, locale: "en-US" });
    const momentRuUtils = new MomentUtils({ instance: moment, locale: "ru" });
    const date = momentUtils.date("2020-02-01T23:44:00.000Z");

    expect(momentUtils.format(date, format)).toBe(expectedWithEn);
    expect(momentRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn            | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}          | ${"1 февр. 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"} | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"} | ${"1 февр. 2020 г. 11:44 PM"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}    | ${"1 февр. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}           | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 11:44 PM"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}     | ${"01.02.2020 23:44"}
  `("DayJS localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const dayjsUtils = new DayjsUtils({ locale: "en-US" });
    const dayjsRuUtils = new DayjsUtils({ locale: "ru" });
    const date = dayjsUtils.date("2020-02-01T23:44:00.000Z");

    expect(dayjsUtils.format(date, format)).toBe(expectedWithEn);
    expect(dayjsRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn            | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}          | ${"1 фев. 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"} | ${"1 фев. 2020 г. 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"} | ${"1 фев. 2020 г. 11:44 ПП"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}    | ${"1 фев. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}           | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}  | ${"01.02.2020 11:44 ПП"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}     | ${"01.02.2020 23:44"}
  `("Date-fns localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const dateFnsUtils = new DateFnsUtils();
    const dateFnsRuUtils = new DateFnsUtils({ locale: ruDateFnsLocale });
    const date = dateFnsUtils.date("2020-02-01T23:44:00.000Z");

    expect(dateFnsUtils.format(date, format)).toBe(expectedWithEn);
    expect(dateFnsRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn             | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}           | ${"1 февр. 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020, 11:44 PM"} | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020, 11:44 PM"} | ${"1 февр. 2020 г., 11:44 PM"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020, 23:44"}    | ${"1 февр. 2020 г., 23:44"}
    ${"keyboardDate"}        | ${"2/1/2020"}              | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"2/1/2020 11:44 PM"}     | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"2/1/2020 11:44 PM"}     | ${"01.02.2020 11:44 PM"}
    ${"keyboardDateTime24h"} | ${"2/1/2020 23:44"}        | ${"01.02.2020 23:44"}
  `("Luxon localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const luxonUtils = new LuxonUtils({ locale: "en" });
    const luxonRuUtils = new LuxonUtils({ locale: "ru" });
    const date = luxonUtils.date("2020-02-01T23:44:00.000Z");

    expect(luxonUtils.format(date, format)).toBe(expectedWithEn);
    expect(luxonRuUtils.format(date, format)).toBe(expectedWithRu);
  });
});
