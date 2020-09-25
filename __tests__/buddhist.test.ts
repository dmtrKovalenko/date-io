import BuddhistUtils from "../packages/dayjs-buddhist/src";
import { TEST_TIMESTAMP } from "./test-utils";

describe("Buddhist", () => {
  it("Should properly work with buddhist years", () => {
    const buddhistUtils = new BuddhistUtils();
    const date = buddhistUtils.date(TEST_TIMESTAMP);
    const afterYear = date.clone().add(2, "year");

    expect(buddhistUtils.isBeforeYear(date, afterYear)).toBeTruthy();
    expect(buddhistUtils.isAfterYear(afterYear, date)).toBeTruthy();

    expect(buddhistUtils.getYear(date)).toBe(2561);
  });

  it("Buddhist -- setYear", () => {
    const buddhistUtils = new BuddhistUtils();
    const date = buddhistUtils.date(TEST_TIMESTAMP);
    const expectResult = (2561 - 543).toString();
    expect(buddhistUtils.setYear(date, 2561).format("YYYY")).toBe(expectResult);
  });

  it("Buddhist -- isSamYear", () => {
    const buddhistUtils = new BuddhistUtils();
    const date = buddhistUtils.date(TEST_TIMESTAMP);
    const sameYear = date.clone().add(2, "month");
    expect(buddhistUtils.isSameYear(date, sameYear)).toBeTruthy();
  });
});
