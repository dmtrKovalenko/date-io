import { allUtils } from "./test-utils";
import LuxonUtils from "../packages/luxon/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import DayjsUtils from "../packages/dayjs/src";

test.each`
  format                   | expected                    | expectedLuxon
  ${"fullDate"}            | ${"2020, January 1st"}      | ${"2020, January 1"}
  ${"fullDateTime12h"}     | ${"2020, Jan 1st 11:44 PM"} | ${"2020, Jan 1 11:44 PM"}
  ${"fullDateTime24h"}     | ${"2020, Jan 1st 23:44"}    | ${"2020, Jan 1 23:44"}
  ${"normalDate"}          | ${"Wed, Jan 1"}             | ${null}
  ${"shortDate"}           | ${"Jan 1"}                  | ${null}
  ${"year"}                | ${"2020"}                   | ${null}
  ${"month"}               | ${"January"}                | ${null}
  ${"monthAndDate"}        | ${"January 1"}              | ${null}
  ${"dayOfMonth"}          | ${"1"}                      | ${null}
  ${"fullTime12h"}         | ${"11:44 PM"}               | ${null}
  ${"fullTime24h"}         | ${"23:44"}                  | ${null}
  ${"hours12h"}            | ${"11"}                     | ${null}
  ${"hours24h"}            | ${"23"}                     | ${null}
  ${"minutes"}             | ${"44"}                     | ${null}
  ${"seconds"}             | ${"00"}                     | ${null}
  ${"keyboardDate"}        | ${"2020/01/01"}             | ${null}
  ${"keyboardDateTime12h"} | ${"2020/01/01 11:44 PM"}    | ${null}
  ${"keyboardDateTime24h"} | ${"2020/01/01 23:44"}       | ${null}
`("Correctly formats with provided formats", ({ format, expected, expectedLuxon }) => {
  allUtils.forEach(([libName, utils]) => {
    const date = utils.date("2020-01-01T23:44:00.000Z");
    const result = utils.format(date as any, format);
    const expectedResult = libName === "Luxon" ? expectedLuxon || expected : expected;

    if (result !== expectedResult) {
      throw new Error(
        `${libName} utils.formats.${format} results to "${result}", instead of "${expectedResult}"`
      );
    }
  });
});

test.each`
  format                   | expected              | expectedLuxon
  ${"keyboardDate"}        | ${"01.01.2020"}       | ${null}
  ${"keyboardDateTime12h"} | ${"01.01.2020 23:44"} | ${null}
  ${"keyboardDateTime24h"} | ${"01.01.2020 23:44"} | ${null}
`(
  "Correctly formats with provided localized formats",
  ({ format, expected, expectedLuxon }) => {
    const allUtils = [
      // ["Luxon", new LuxonUtils()],
      // ["DateFns", new DateFnsUtils()],
      ["Moment", new MomentUtils({ locale: "ru", useLocalizedFormats: true })]
      // ["Dayjs", new DayjsUtils()]
    ] as const;

    allUtils.forEach(([libName, utils]) => {
      const date = utils.date("2020-01-01T23:44:00.000Z");
      const result = utils.format(date as any, format);

      if (result !== expected) {
        throw new Error(
          `${libName} utils.formats.${format} results to "${result}", instead of "${expected}"`
        );
      }
    });
  }
);
