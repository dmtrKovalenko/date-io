import { IUtils } from "../packages/core/IUtils";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";

// Time when the first commit to date-io was created
export const TEST_TIMESTAMP = "2018-10-30T11:44:00.000Z";
export type TestLib = "Moment" | "DateFns";

export const allUtils = [
  ["DateFns", new DateFnsUtils()],
  ["Moment", new MomentUtils()],
] as const;

export const utilsTest = (
  name: string,
  innerFn: (date: any, utils: IUtils<any>, currentLib: TestLib) => void
) => {
  test.each(allUtils)(`%s -- ${name}`, (name, utils) =>
    innerFn(utils.date(TEST_TIMESTAMP), utils, name)
  );
};

export const formats: Record<string, Record<TestLib, string>> = {
  day: { DateFns: "dd", Moment: "DD"},
  dateTime: {
    DateFns: "yyyy-MM-dd HH:mm",
    Moment: "YYYY-MM-DD HH:mm",
  }
};
