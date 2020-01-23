import HijriUtils from "../packages/hijri/src";
import { TEST_TIMESTAMP } from "./test-utils";

describe("Hijri", () => {
  const hijriiUtils = new HijriUtils();

  it("Should properly render digits", () => {
    expect(hijriiUtils.formatNumber("1")).toBe("١");
    expect(hijriiUtils.formatNumber("2")).toBe("٢");
  });

  it("Should properly parse dates", () => {
    expect(hijriiUtils.date(null)).toBeNull();
    expect(hijriiUtils.parse("", "iYYYY/iM/iD")).toBeNull();
    expect(hijriiUtils.parse("01/01/1395", "iYYYY/iM/iD")).toBeTruthy();
  });

  it("Should properly work with hijri years", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);
    const afterYear = date.clone().add(2, "iYear");

    expect(hijriiUtils.isBeforeYear(date, afterYear)).toBeTruthy();
    expect(hijriiUtils.isAfterYear(afterYear, date)).toBeTruthy();

    expect(hijriiUtils.getYear(date)).toBe(1440);
  });

  it("Should properly work with hijri months", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.getMonth(date)).toBe(1);
  });

  it("Should properly render meridiem", () => {
    expect(hijriiUtils.getMeridiemText("am")).toBe("ص");
    expect(hijriiUtils.getMeridiemText("pm")).toBe("م");
  });

  it("Should render weekdays", () => {
    expect(hijriiUtils.getWeekdays()).toEqual(["ح", "ن", "ث", "ر", "خ", "ج", "س"]);
  });

  it("Hijri -- endOfMonth", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.endOfMonth(date).toISOString()).toEqual(
      "2018-11-08T23:59:59.999Z"
    );
  });

  it("Hijri -- startOfMonth", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.startOfMonth(date).toISOString()).toEqual(
      "2018-10-10T00:00:00.000Z"
    );
  });

  it("Hijri -- getPreviousMonth", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.getPreviousMonth(date).toISOString()).toEqual(
      "2018-10-01T11:44:00.000Z"
    );
  });

  it("Hijri -- getNextMonth", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.getNextMonth(date).toISOString()).toEqual(
      "2018-11-29T11:44:00.000Z"
    );
  });

  it("Hijri -- toIMoment without undefined", () => {
    // @ts-ignore
    const date = hijriiUtils.toIMoment(hijriiUtils.date());

    expect(date).toBeTruthy();
  });

  it("Hijri -- isEqual", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);
    const anotherDate = hijriiUtils.date(TEST_TIMESTAMP);

    expect(hijriiUtils.isEqual(date, anotherDate)).toBeTruthy();
    expect(hijriiUtils.isEqual(null, null)).toBeTruthy();
  });

  it("Hijri -- getWeekArray", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);
    const array = hijriiUtils.getWeekArray(date);

    expect(array.map(innerArray => innerArray.map(dt => dt.toISOString()))).toEqual([
      [
        "2018-10-07T00:00:00.000Z",
        "2018-10-08T00:00:00.000Z",
        "2018-10-09T00:00:00.000Z",
        "2018-10-10T00:00:00.000Z",
        "2018-10-11T00:00:00.000Z",
        "2018-10-12T00:00:00.000Z",
        "2018-10-13T00:00:00.000Z"
      ],
      [
        "2018-10-14T00:00:00.000Z",
        "2018-10-15T00:00:00.000Z",
        "2018-10-16T00:00:00.000Z",
        "2018-10-17T00:00:00.000Z",
        "2018-10-18T00:00:00.000Z",
        "2018-10-19T00:00:00.000Z",
        "2018-10-20T00:00:00.000Z"
      ],
      [
        "2018-10-21T00:00:00.000Z",
        "2018-10-22T00:00:00.000Z",
        "2018-10-23T00:00:00.000Z",
        "2018-10-24T00:00:00.000Z",
        "2018-10-25T00:00:00.000Z",
        "2018-10-26T00:00:00.000Z",
        "2018-10-27T00:00:00.000Z"
      ],
      [
        "2018-10-28T00:00:00.000Z",
        "2018-10-29T00:00:00.000Z",
        "2018-10-30T00:00:00.000Z",
        "2018-10-31T00:00:00.000Z",
        "2018-11-01T00:00:00.000Z",
        "2018-11-02T00:00:00.000Z",
        "2018-11-03T00:00:00.000Z"
      ],
      [
        "2018-11-04T00:00:00.000Z",
        "2018-11-05T00:00:00.000Z",
        "2018-11-06T00:00:00.000Z",
        "2018-11-07T00:00:00.000Z",
        "2018-11-08T00:00:00.000Z",
        "2018-11-09T00:00:00.000Z",
        "2018-11-10T00:00:00.000Z"
      ]
    ]);
  });

  it("Hijri -- getYearRange", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);
    const anotherYear = hijriiUtils.setYear(date, 1445);

    const yearRange = hijriiUtils.getYearRange(date, anotherYear);
    expect(yearRange).toHaveLength(6);
  });

  it("Hijri -- getYearRange min limit", () => {
    const date = hijriiUtils.date("1937-03-13");
    const anotherYear = hijriiUtils.setYear(date, 1445);

    expect(() => hijriiUtils.getYearRange(date, anotherYear)).toThrow(
      "min date must be on or after 1356-01-01 H (1937-03-14)"
    );
  });

  it("Hijri -- getYearRange max limit", () => {
    const date = hijriiUtils.date(TEST_TIMESTAMP);
    const anotherYear = hijriiUtils.setYear(date, 1500);

    expect(() => hijriiUtils.getYearRange(date, anotherYear)).toThrow(
      "max date must be on or before 1499-12-29 H (2076-11-26)"
    );
  });

  test.each`
    format               | expected
    ${"fullDate"}        | ${"١٤٤١، جمادى الأولى ١"}
    ${"normalDate"}      | ${"الأربعاء، ٦ جمادى ١"}
    ${"shortDate"}       | ${"٦ جمادى ١"}
    ${"year"}            | ${"١٤٤١"}
    ${"month"}           | ${"جمادى الأولى"}
    ${"monthAndDate"}    | ${"٦ جمادى الأولى"}
    ${"dayOfMonth"}      | ${"٦"}
    ${"fullTime12h"}     | ${"١١:٤٤ م"}
    ${"fullTime24h"}     | ${"٢٣:٤٤"}
    ${"hours12h"}        | ${"١١"}
    ${"hours24h"}        | ${"٢٣"}
    ${"minutes"}         | ${"٤٤"}
    ${"seconds"}         | ${"٠٠"}
    ${"fullDateTime12h"} | ${"٦ جمادى الأولى ١١:٤٤ م"}
    ${"fullDateTime24h"} | ${"٦ جمادى الأولى ٢٣:٤٤"}
  `("Correctly formats jalaali format $format", ({ format, expected }) => {
    const date = hijriiUtils.date("2020-01-01T23:44:00.000Z");

    expect(hijriiUtils.format(date as any, format)).toBe(expected);
  });
});
