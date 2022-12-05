import { LocalDate } from '@js-joda/core';
import JsJodaUtils from "../packages/js-joda/src";

describe("js-joda", () => {
  const jsJodaUtils = new JsJodaUtils();

  it("Should get the time difference between two LocalDates", () => {
    // Due to DST, etc., a time difference between two local dates can only be
    // estimated, so js-joda doesn't directly permit it.  Verify that date-ui
    // allows it for consistency with other interfaces.
    const one = LocalDate.of(2022, 12, 5);
    const two = LocalDate.of(2022, 12, 6);

    expect(jsJodaUtils.getDiff(two, one, 'seconds')).toEqual(24 * 3600);
  });
});
