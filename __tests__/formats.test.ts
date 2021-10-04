import ruDateFnsLocale from "date-fns/locale/ru";
import LuxonUtils from "../packages/luxon/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import DayjsUtils from "../packages/dayjs/src";
import JsJodaUtils from "../packages/js-joda/src";
import { allUtils } from "./test-utils";
import moment from "moment";
import "dayjs/locale/ru";
import {
  Locale
} from "@js-joda/locale";
import {DateIOFormats} from "@date-io/core/IUtils";

test.each`
  format                     | expectedWithEn
  ${"normalDate"}            | ${"1 January"}
  ${"normalDateWithWeekday"} | ${"Wed, Jan 1"}
  ${"shortDate"}             | ${"Jan 1"}
  ${"year"}                  | ${"2020"}
  ${"month"}                 | ${"January"}
  ${"monthAndDate"}          | ${"January 1"}
  ${"weekday"}               | ${"Wednesday"}
  ${"weekdayShort"}          | ${"Wed"}
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
    format                   | expectedWithEn                  | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}                | ${"1 февр. 2020 г."}
    ${"fullDateWithWeekday"} | ${"Saturday, February 1, 2020"} | ${"суббота, 1 февраля 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г. 11:44 вечера"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}          | ${"1 февр. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}                 | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 11:44 вечера"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}           | ${"01.02.2020 23:44"}
  `("Moment localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const momentUtils = new MomentUtils({ instance: moment, locale: "en-US" });
    const momentRuUtils = new MomentUtils({ instance: moment, locale: "ru" });
    const date = momentUtils.date("2020-02-01T23:44:00.000Z");

    expect(momentUtils.format(date, format)).toBe(expectedWithEn);
    expect(momentRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn                  | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}                | ${"1 февр. 2020 г."}
    ${"fullDateWithWeekday"} | ${"Saturday, February 1, 2020"} | ${"суббота, 1 февраля 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г. 11:44 вечера"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}          | ${"1 февр. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}                 | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 11:44 вечера"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}           | ${"01.02.2020 23:44"}
  `("DayJS localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const dayjsUtils = new DayjsUtils({ locale: "en-US" });
    const dayjsRuUtils = new DayjsUtils({ locale: "ru" });
    const date = dayjsUtils.date("2020-02-01T23:44:00.000Z");

    expect(dayjsUtils.format(date, format)).toBe(expectedWithEn);
    expect(dayjsRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn                    | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}                  | ${"1 фев. 2020 г."}
    ${"fullDateWithWeekday"} | ${"Saturday, February 1st, 2020"} | ${"суббота, 1-е февраля 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"}         | ${"1 фев. 2020 г. 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"}         | ${"1 фев. 2020 г. 11:44 ПП"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}            | ${"1 фев. 2020 г. 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}                   | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}          | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}          | ${"01.02.2020 11:44 ПП"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}             | ${"01.02.2020 23:44"}
  `("Date-fns localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const dateFnsUtils = new DateFnsUtils();
    const dateFnsRuUtils = new DateFnsUtils({ locale: ruDateFnsLocale });
    const date = dateFnsUtils.date("2020-02-01T23:44:00.000Z");

    expect(dateFnsUtils.format(date, format)).toBe(expectedWithEn);
    expect(dateFnsRuUtils.format(date, format)).toBe(expectedWithRu);
  });

  test.each`
    format                   | expectedWithEn                  | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}                | ${"1 февр. 2020 г."}
    ${"fullDateWithWeekday"} | ${"Saturday, February 1, 2020"} | ${"суббота, 1 февраля 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020, 11:44 PM"}      | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020, 11:44 PM"}      | ${"1 февр. 2020 г., 11:44 PM"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020, 23:44"}         | ${"1 февр. 2020 г., 23:44"}
    ${"keyboardDate"}        | ${"2/1/2020"}                   | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"2/1/2020 11:44 PM"}          | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"2/1/2020 11:44 PM"}          | ${"01.02.2020 11:44 PM"}
    ${"keyboardDateTime24h"} | ${"2/1/2020 23:44"}             | ${"01.02.2020 23:44"}
  `("Luxon localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const luxonUtils = new LuxonUtils({ locale: "en" });
    const luxonRuUtils = new LuxonUtils({ locale: "ru" });
    const date = luxonUtils.date("2020-02-01T23:44:00.000Z");

    expect(luxonUtils.format(date, format)).toBe(expectedWithEn);
    expect(luxonRuUtils.format(date, format)).toBe(expectedWithRu);
  });
  test.each`
    format                   | expectedWithEn                  | expectedWithRu
    ${"fullDate"}            | ${"Feb 1, 2020"}                | ${"1 февр. 2020 г."}
    ${"fullDateWithWeekday"} | ${"Saturday, February 1, 2020"} | ${"суббота, 1 февраля 2020 г."}
    ${"fullDateTime"}        | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г., 23:44"}
    ${"fullDateTime12h"}     | ${"Feb 1, 2020 11:44 PM"}       | ${"1 февр. 2020 г., 11:44 PM"}
    ${"fullDateTime24h"}     | ${"Feb 1, 2020 23:44"}          | ${"1 февр. 2020 г., 23:44"}
    ${"keyboardDate"}        | ${"02/01/2020"}                 | ${"01.02.2020"}
    ${"keyboardDateTime"}    | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 23:44"}
    ${"keyboardDateTime12h"} | ${"02/01/2020 11:44 PM"}        | ${"01.02.2020 11:44 PM"}
    ${"keyboardDateTime24h"} | ${"02/01/2020 23:44"}           | ${"01.02.2020 23:44"}
  `("JsJoda localized $format", ({ format, expectedWithEn, expectedWithRu }) => {
    const russianFormats: DateIOFormats = {
      dayOfMonth: "d",
      fullDate: "d LLL yyyy 'г.'",
      fullDateWithWeekday: "EEEE, d LLLL yyyy 'г.'",
      fullDateTime: "d LLL yyyy 'г.', HH:mm",
      fullDateTime12h: "d LLL yyyy 'г.', hh:mm a",
      fullDateTime24h: "d LLL yyyy 'г.', HH:mm",
      fullTime: "",
      fullTime12h: "hh:mm a",
      fullTime24h: "HH:mm",
      hours12h: "hh",
      hours24h: "HH",
      keyboardDate: "dd.MM.yyyy",
      keyboardDateTime: "dd.MM.yyyy HH:mm",
      keyboardDateTime12h: "dd.MM.yyyy hh:mm a",
      keyboardDateTime24h: "dd.MM.yyyy HH:mm",
      minutes: "mm",
      month: "LLLL",
      monthAndDate: "LLLL d",
      monthAndYear: "LLLL yyyy",
      monthShort: "LLL",
      weekday: "EEEE",
      weekdayShort: "EEE",
      normalDate: "d MMMM",
      normalDateWithWeekday: "EEE, MMM d",
      seconds: "ss",
      shortDate: "MMM d",
      year: "yyyy",
    };
    const jsJodaEnUtils = new JsJodaUtils({});
    const jsJodaRuUtils = new JsJodaUtils(
      {locale: new Locale("ru"),
        formats : russianFormats});
    const date = jsJodaEnUtils.date("2020-02-01T23:44:00.000Z");

    expect(jsJodaEnUtils.format(date, format)).toBe(expectedWithEn);
    expect(jsJodaRuUtils.format(date, format)).toBe(expectedWithRu);
  });
});
