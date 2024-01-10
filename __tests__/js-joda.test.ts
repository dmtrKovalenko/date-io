import { LocalDate, LocalTime, LocalDateTime } from '@js-joda/core';
import JsJodaUtils from "../packages/js-joda/src";

describe("js-joda", () => {
  const jsJodaUtils = new JsJodaUtils();

  it("Merges a date with a non-time", () => {
    const one = LocalDateTime.of(2022, 12, 5, 9, 30);
    const two = LocalDate.of(2022, 12, 6);

    expect(jsJodaUtils.mergeDateAndTime(one, two)).toEqual(one);
  });

  it("Merges a non-date with a time", () => {
    const one = LocalTime.of(9, 30);
    const two = LocalDateTime.of(2022, 12, 5, 9, 30);

    expect(jsJodaUtils.mergeDateAndTime(one, two)).toEqual(two);
  });
});
