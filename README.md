# date-io

Abstraction over common javascript date management libraries.

[![npm package](https://img.shields.io/npm/v/@date-io/core.svg)](https://www.npmjs.org/package/@date-io/core)
[![codecov](https://codecov.io/gh/dmtrKovalenko/date-io/branch/master/graph/badge.svg)](https://codecov.io/gh/dmtrKovalenko/date-io)
[![typescript](https://img.shields.io/badge/typescript-first-blue.svg)](https://github.com/dmtrKovalenko/date-io)
[![travis](https://travis-ci.org/dmtrKovalenko/date-io.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/date-io)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The project expose abstraction interface over [luxon](https://moment.github.io/luxon/), [date-fns v2](https://github.com/date-fns/date-fns), [dayjs](https://github.com/iamkun/dayjs) and [moment](https://momentjs.com/).
Which can be easily used by any ui date or time components to use the same date management lib as user's project use.

That simplifies timezones management, makes your code return exactly the same type that user expect and work with specific calendar systems (e.g. [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar))

### Projects

| Library           |                                                                                                               Downloads |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------: |
| @date-io/date-fns | [![npm download](https://img.shields.io/npm/dm/@date-io/date-fns.svg)](https://www.npmjs.org/package/@date-io/date-fns) |
| @date-io/moment   |     [![npm download](https://img.shields.io/npm/dm/@date-io/moment.svg)](https://www.npmjs.org/package/@date-io/moment) |
| @date-io/luxon    |       [![npm download](https://img.shields.io/npm/dm/@date-io/luxon.svg)](https://www.npmjs.org/package/@date-io/luxon) |
| @date-io/dayjs    |       [![npm download](https://img.shields.io/npm/dm/@date-io/dayjs.svg)](https://www.npmjs.org/package/@date-io/dayjs) |
| @date-io/jalaali  |   [![npm download](https://img.shields.io/npm/dm/@date-io/jalaali.svg)](https://www.npmjs.org/package/@date-io/jalaali) |
| @date-io/hijri    |       [![npm download](https://img.shields.io/npm/dm/@date-io/hijri.svg)](https://www.npmjs.org/package/@date-io/hijri) |

Projects, which are already built over `date-io`:

- [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers)

### Usage example

```js
import LuxonAdapter from "@date-io/luxon";
import DateFnsAdapter from "@date-io/date-fns";

const dateFns = new DateFnsAdapter();
const luxon = new LuxonAdapter({ locale: "fr" }); // pass french locale

const initialLuxonDate = luxon.date("2018-10-28T11:44:00.000Z");
const initialDateFnsDate = dateFns.date("2018-10-28T11:44:00.000Z");

const updatedLuxonDate = luxon.addDays(initialLuxonDate, 2);
const updatedDateFnsDate = dateFns.addDays(initialDateFnsDate, 2);

luxon.format(updatedLuxonDate, utils.dateTime24hFormat); // "octobre 30 11:44"
dateFns.format(updatedLuxonDate, utils.dateTime24hFormat); // "October 30th 11:44"
```

### Interface

Implemented interface for now. If you can not find needed method please let us know and we will add it!

```ts
export interface DateIOFormats {
  /** Full date, useful for accessibility @example "2019, January 1st" */
  fullDate: string;
  /** Day format string extremely required to localize @example "Wed, Jan 1st" for US, "January 1st" for Europe */
  shortDate: string;
  /** Year format string @example "2019" */
  year: string;
  /** Month format string @example "January" */
  month: string;
  /** Month with date format string @example "January 1st" */
  monthAndDate: string;
  /** Day format string @example "12" */
  dayOfMonth: string;
  /** Full time format string @example "11:44 AM" */
  fullTime12h: string;
  /** Full time format string @example "23:59" */
  fullTime24h: string;
  /** Hours format string @example "11" */
  hours12h: string;
  /** Hours format string @example "23" */
  hours24h: string;
  /** Minutes format string @example "59" */
  minutes: string;
  /** Seconds format string @example "59" */
  seconds: string;
  /** Date & Time format string @example "2018, Jan 1st 11:44 AM" */
  fullDateTime12h: string;
  /** Date & Time format string @example "2018, Jan 1st 23:44" */
  fullDateTime24h: string;
}

export interface IUtils<TDate> {
  formats: DateIOFormats;
  locale?: any;
  moment?: any;
  dayjs?: any;

  // constructor (options?: { locale?: any, moment?: any });

  date(value?: any): TDate | null;
  parse(value: string, format: string): TDate | null;

  isNull(value: TDate | null): boolean;
  isValid(value: any): boolean;
  getDiff(value: TDate, comparing: TDate | string): number;
  isEqual(value: any, comparing: any): boolean;

  isSameDay(value: TDate, comparing: TDate): boolean;
  isSameMonth(value: TDate, comparing: TDate): boolean;
  isSameYear(value: TDate, comparing: TDate): boolean;
  isSameHour(value: TDate, comparing: TDate): boolean;

  isAfter(value: TDate, comparing: TDate): boolean;
  isAfterDay(value: TDate, comparing: TDate): boolean;
  isAfterYear(value: TDate, comparing: TDate): boolean;

  isBeforeDay(value: TDate, comparing: TDate): boolean;
  isBeforeYear(value: TDate, comparing: TDate): boolean;
  isBefore(value: TDate, comparing: TDate): boolean;

  startOfMonth(value: TDate): TDate;
  endOfMonth(value: TDate): TDate;

  addDays(value: TDate, count: number): TDate;

  startOfDay(value: TDate): TDate;
  endOfDay(value: TDate): TDate;

  format(value: TDate, formatKey: keyof DateIOFormats): string;
  formatByString(value: TDate, formatString: string): string;
  formatNumber(numberToFormat: string): string;

  getHours(value: TDate): number;
  setHours(value: TDate, count: number): TDate;

  getMinutes(value: TDate): number;
  setMinutes(value: TDate, count: number): TDate;

  getSeconds(value: TDate): number;
  setSeconds(value: TDate, count: number): TDate;

  getMonth(value: TDate): number;
  setMonth(value: TDate, count: number): TDate;
  getNextMonth(value: TDate): TDate;
  getPreviousMonth(value: TDate): TDate;

  getMonthArray(value: TDate): TDate[];

  getYear(value: TDate): number;
  setYear(value: TDate, count: number): TDate;

  mergeDateAndTime(date: TDate, time: TDate): TDate;

  getWeekdays(): string[];
  getWeekArray(date: TDate): TDate[][];
  getYearRange(start: TDate, end: TDate): TDate[];

  /** Allow to customize displaying "am/pm" strings */
  getMeridiemText(ampm: "am" | "pm"): string;
}
```

### Typescript

The project itself written in typescript, so we are providing our own typescript definitions. But for the **moment** and **date-fns** users it is required to add `esModuleInterop` and `allowSyntheticDefaultImports` to your `tsconfig.json`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```
