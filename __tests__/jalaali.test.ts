import JalaaliUtils from "../packages/jalaali/src";
import { TEST_TIMESTAMP } from "./test-utils";
import jMoment from "moment-jalaali";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

describe("Jalaali", () => {
  const jalaaliUtils = new JalaaliUtils();

  it("Should properly render digits", () => {
    expect(jalaaliUtils.formatNumber("1")).toBe("۱");
    expect(jalaaliUtils.formatNumber("2")).toBe("۲");
  });

  it("Should properly parse dates", () => {
    expect(jalaaliUtils.date(null)).toBeNull();
    expect(jalaaliUtils.parse("", "jYYYY/jM/jD")).toBeNull();
    expect(jalaaliUtils.parse("01/01/1395", "jYYYY/jM/jD")).toBeTruthy();
  });

  it("Should properly work with jalaali years", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);
    const afterYear = date.clone().add(2, "year");

    expect(jalaaliUtils.isBeforeYear(date, afterYear)).toBeTruthy();
    expect(jalaaliUtils.isAfterYear(afterYear, date)).toBeTruthy();

    expect(jalaaliUtils.getYear(date)).toBe(1397);
  });

  it("Should proper work with jalaali years", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.getMonth(date)).toBe(7);
  });

  it("Should properly render meridiem", () => {
    expect(jalaaliUtils.getMeridiemText("am")).toBe("ق.ظ");
    expect(jalaaliUtils.getMeridiemText("pm")).toBe("ب.ظ");
  });

  it("Should render weekdays", () => {
    expect(jalaaliUtils.getWeekdays()).toEqual(["ش", "ی", "د", "س", "چ", "پ", "ج"]);
  });

  it("Jalaali -- endOfMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.endOfMonth(date).toISOString()).toEqual(
      "2018-11-21T23:59:59.999Z"
    );
  });

  it("Jalaali -- startOfMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.startOfMonth(date).toISOString()).toEqual(
      "2018-10-23T00:00:00.000Z"
    );
  });

  it("Jalaali -- getNextMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.endOfMonth(date).toISOString()).toEqual(
      "2018-11-21T23:59:59.999Z"
    );
  });

  it("Jalaali -- getPreviousMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.getPreviousMonth(date).toISOString()).toEqual(
      "2018-09-30T11:44:00.000Z"
    );
  });

  it("Jalaali -- getNextMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.getNextMonth(date).toISOString()).toEqual(
      "2018-11-29T11:44:00.000Z"
    );
  });

  it("Jalaali -- toJMoment without undefined", () => {
    // @ts-ignore
    const date = jalaaliUtils.toJMoment(jalaaliUtils.date());

    expect(date).toBeTruthy();
  });

  it("Jalaali -- getNextMonth", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);
    const anotherDate = jalaaliUtils.date(TEST_TIMESTAMP);

    expect(jalaaliUtils.isEqual(date, anotherDate)).toBeTruthy();
    expect(jalaaliUtils.isEqual(null, null)).toBeTruthy();
  });

  it("Jalaali -- getWeekArray", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);
    const array = jalaaliUtils.getWeekArray(date);

    expect(array.map(innerArray => innerArray.map(dt => dt.toISOString()))).toEqual([
      [
        "2018-10-20T00:00:00.000Z",
        "2018-10-21T00:00:00.000Z",
        "2018-10-22T00:00:00.000Z",
        "2018-10-23T00:00:00.000Z",
        "2018-10-24T00:00:00.000Z",
        "2018-10-25T00:00:00.000Z",
        "2018-10-26T00:00:00.000Z"
      ],
      [
        "2018-10-27T00:00:00.000Z",
        "2018-10-28T00:00:00.000Z",
        "2018-10-29T00:00:00.000Z",
        "2018-10-30T00:00:00.000Z",
        "2018-10-31T00:00:00.000Z",
        "2018-11-01T00:00:00.000Z",
        "2018-11-02T00:00:00.000Z"
      ],
      [
        "2018-11-03T00:00:00.000Z",
        "2018-11-04T00:00:00.000Z",
        "2018-11-05T00:00:00.000Z",
        "2018-11-06T00:00:00.000Z",
        "2018-11-07T00:00:00.000Z",
        "2018-11-08T00:00:00.000Z",
        "2018-11-09T00:00:00.000Z"
      ],
      [
        "2018-11-10T00:00:00.000Z",
        "2018-11-11T00:00:00.000Z",
        "2018-11-12T00:00:00.000Z",
        "2018-11-13T00:00:00.000Z",
        "2018-11-14T00:00:00.000Z",
        "2018-11-15T00:00:00.000Z",
        "2018-11-16T00:00:00.000Z"
      ],
      [
        "2018-11-17T00:00:00.000Z",
        "2018-11-18T00:00:00.000Z",
        "2018-11-19T00:00:00.000Z",
        "2018-11-20T00:00:00.000Z",
        "2018-11-21T00:00:00.000Z",
        "2018-11-22T00:00:00.000Z",
        "2018-11-23T00:00:00.000Z"
      ]
    ]);
  });

  it("Jalaali -- getYearRange", () => {
    const date = jalaaliUtils.date(TEST_TIMESTAMP);
    const anotherYear = jalaaliUtils.setYear(date, 1400);

    const yearRange = jalaaliUtils.getYearRange(date, anotherYear);
    expect(yearRange).toHaveLength(4);
  });

  test.each`
    format               | expected
    ${"fullDate"}        | ${"۱۳۹۸، دی ۱م"}
    ${"normalDate"}      | ${"چهارشنبه، ۱۱ دی"}
    ${"shortDate"}       | ${"۱۱ دی"}
    ${"year"}            | ${"۱۳۹۸"}
    ${"month"}           | ${"دی"}
    ${"monthAndDate"}    | ${"۱۱ دی"}
    ${"dayOfMonth"}      | ${"۱۱"}
    ${"fullTime12h"}     | ${"۱۱:۴۴ ب.ظ"}
    ${"fullTime24h"}     | ${"۲۳:۴۴"}
    ${"hours12h"}        | ${"۱۱"}
    ${"hours24h"}        | ${"۲۳"}
    ${"minutes"}         | ${"۴۴"}
    ${"seconds"}         | ${"۰۰"}
    ${"fullDateTime12h"} | ${"۱۱ دی ۱۱:۴۴ ب.ظ"}
    ${"fullDateTime24h"} | ${"۱۱ دی ۲۳:۴۴"}
  `("Correctly formats jalaali format $format", ({ format, expected }) => {
    const date = jalaaliUtils.date("2020-01-01T23:44:00.000Z");

    expect(jalaaliUtils.format(date as any, format)).toBe(expected);
  });
});
