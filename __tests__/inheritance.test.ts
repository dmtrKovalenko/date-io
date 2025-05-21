import { IUtils } from "@date-io/core/IUtils";
import DayjsUtils from "../packages/dayjs/src/dayjs-utils";
import { Dayjs } from "dayjs";

class CustomDateTime extends DayjsUtils implements IUtils<Dayjs, string> {
  getYear = () => 2007;
  getWeekdays = (firstDayOfWeek?: number | string, weekdayFormat?: 'long' | 'short' | 'narrow') => {
    const format = new Map([
      ['long', 'dddd'],
      ['short', 'ddd'],
      ['narrow', 'dd'],
    ]).get(weekdayFormat ?? 'narrow') ?? 'dd'
    const start = this.dayjs().startOf("week").add(Number(firstDayOfWeek) || 0, 'days');
    return [0, 1].map((diff) => this.formatByString(start.add(diff, "day"), format));
  };
}

test("Should be possible to override methods of utility classes", () => {
  const utils = new CustomDateTime();
  expect(utils.getWeekdays()).toEqual(["Su", "Mo"]);
});
