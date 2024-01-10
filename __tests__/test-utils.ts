import { IUtils } from "../packages/core/IUtils";
import LuxonUtils from "../packages/luxon/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import DayJSUtils from "../packages/dayjs/src";
import JSJodaUtils from "../packages/js-joda/src";

// Time when the first commit to date-io was created
export const TEST_TIMESTAMP = "2018-10-30T11:44:00.000Z";
export const LOCALDATE_TEST_TIMESTAMP = "2018-10-30";
export type TestLib = "Luxon" | "Moment" | "DateFns" | "Dayjs" | "JSJoda";

export const allUtils = [
  ["Luxon", new LuxonUtils()],
  ["DateFns", new DateFnsUtils()],
  ["Moment", new MomentUtils()],
  ["Dayjs", new DayJSUtils()],
  ["JSJoda", new JSJodaUtils()]
] as const;

export const utilsTest = (
  name: string,
  innerFn: (date: any, utils: IUtils<any, any>, currentLib: TestLib) => void
) => {
  test.each(allUtils)(`%s -- ${name}`, (name, utils) =>
    innerFn(utils.date(TEST_TIMESTAMP), utils, name)
  );
};

export const localDateAllUtils = [
  ["JSJoda", new JSJodaUtils()]
] as const;

export const localDateutilsTest = (
  name: string,
  innerFn: (date: any, utils: IUtils<any, any>, currentLib: TestLib) => void
) => {
  test.each(localDateAllUtils)(`%s -- ${name}`, (name, utils) =>
    innerFn(utils.date(LOCALDATE_TEST_TIMESTAMP), utils, name)
  );
};

export const formats: Record<string, Record<TestLib, string>> = {
  day: { Luxon: "dd", DateFns: "dd", Moment: "DD", Dayjs: "DD",JSJoda: "dd" },
  dateTime: {
    Luxon: "yyyy-MM-dd HH:mm",
    DateFns: "yyyy-MM-dd HH:mm",
    Moment: "YYYY-MM-DD HH:mm",
    Dayjs: "YYYY-MM-DD HH:mm",
    JSJoda: "yyyy-MM-dd HH:mm"
  },
  date: {
    Luxon: "yyyy-MM-dd",
    DateFns: "yyyy-MM-dd",
    Moment: "YYYY-MM-DD",
    Dayjs: "YYYY-MM-DD",
    JSJoda: "yyyy-MM-dd"
  }
};
