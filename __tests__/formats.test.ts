import { allUtils } from "./test-utils";

test.each`
  format               | expected                    | expectedLuxon
  ${"fullDate"}        | ${"2020, January 1st"}      | ${"2020, January 1"}
  ${"shortDate"}       | ${"Wed, Jan 1st"}           | ${"Wed, Jan 1"}
  ${"year"}            | ${"2020"}                   | ${null}
  ${"month"}           | ${"January"}                | ${null}
  ${"monthAndDate"}    | ${"January 1st"}            | ${"January 1"}
  ${"dayOfMonth"}      | ${"1"}                      | ${null}
  ${"fullTime12h"}     | ${"11:44 PM"}               | ${null}
  ${"fullTime24h"}     | ${"23:44"}                  | ${null}
  ${"hours12h"}        | ${"11"}                     | ${null}
  ${"hours24h"}        | ${"23"}                     | ${null}
  ${"minutes"}         | ${"44"}                     | ${null}
  ${"seconds"}         | ${"00"}                     | ${null}
  ${"fullDateTime12h"} | ${"2020, Jan 1st 11:44 PM"} | ${"2020, Jan 1 11:44 PM"}
  ${"fullDateTime24h"} | ${"2020, Jan 1st 23:44"}    | ${"2020, Jan 1 23:44"}
`("Correctly formats with provided formats", ({ format, expected, expectedLuxon }) => {
  allUtils.forEach(([libName, utils]) => {
    const date = utils.date("2020-01-01T23:44:00.000Z");
    const result = utils.format(date as any, utils.formats[format]);
    const expectedResult = libName === "Luxon" ? expectedLuxon || expected : expected;

    if (result !== expectedResult) {
      throw new Error(
        `${libName} utils.formats.${format} results to "${result}", instead of "${expectedResult}"`
      );
    }
  });
});
