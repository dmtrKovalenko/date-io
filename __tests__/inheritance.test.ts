import { IUtils } from "@date-io/core/IUtils";
import DayjsUtils from "../packages/dayjs/src/dayjs-utils";
import { Dayjs } from "dayjs";

class CustomDateTime extends DayjsUtils implements IUtils<Dayjs, string> {
  getYear = () => 2007;
  getWeekdays = () => {
    const start = this.dayjs().startOf("week");
    return [0, 1].map((diff) => this.formatByString(start.add(diff, "day"), "dd"));
  };
}

test("Should be possible to override methods of utility classes", () => {
  const utils = new CustomDateTime();
  expect(utils.getWeekdays()).toEqual(["Su", "Mo"]);
});
