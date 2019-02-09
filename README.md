# date-io

Abstraction over common javascript date management libraries.

[![npm package](https://img.shields.io/npm/v/@date-io/core.svg)](https://www.npmjs.org/package/@date-io/core)
[![codecov](https://codecov.io/gh/dmtrKovalenko/date-io/branch/master/graph/badge.svg)](https://codecov.io/gh/dmtrKovalenko/date-io)
[![typescript](https://img.shields.io/badge/typescript-first-blue.svg)](https://github.com/dmtrKovalenko/date-io)
[![travis](https://travis-ci.org/dmtrKovalenko/date-io.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/date-io)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The project expose abstraction interface over [luxon](https://moment.github.io/luxon/), [date-fns v2](https://github.com/date-fns/date-fns) and [moment](https://momentjs.com/).
Which can be easily used by any ui date or time components to use the same date managment lib as user's project use.

That simplifies timezones management, makes your code return exactly the same type that user expect and work with specific calendar systems (e.g. [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar))

### Projects

| Library           |                                                                                                               Downloads |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------: |
| @date-io/moment   |     [![npm download](https://img.shields.io/npm/dm/@date-io/moment.svg)](https://www.npmjs.org/package/@date-io/moment) |
| @date-io/date-fns | [![npm download](https://img.shields.io/npm/dm/@date-io/date-fns.svg)](https://www.npmjs.org/package/@date-io/date-fns) |
| @date-io/luxon    |       [![npm download](https://img.shields.io/npm/dm/@date-io/luxon.svg)](https://www.npmjs.org/package/@date-io/luxon) |
| @date-io/dayjs    |       [![npm download](https://img.shields.io/npm/dm/@date-io/dayjs.svg)](https://www.npmjs.org/package/@date-io/dayjs) |
| @date-io/jalaali  |       [![npm download](https://img.shields.io/npm/dm/@date-io/jalaali.svg)](https://www.npmjs.org/package/@date-io/dayjs) |

Projects, which are already built over `date-io`:

- [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers)

### Usage example

```js
import LuxonUtils from "@date-io/luxon";
import DateFnsUtils from "@date-io/date-fns";

const dateFns = new DateFnsUtils();
const luxon = new LuxonUtils({ locale: "fr" }); // pass french locale

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
export interface IUtils<TDate> {
  locale?: any;
  moment?: any;

  yearFormat: string;
  yearMonthFormat: string;

  dateTime12hFormat: string;
  dateTime24hFormat: string;

  time12hFormat: string;
  time24hFormat: string;

  dateFormat: string;
  // constructor (options?: { locale?: any, moment?: any });

  date(value?: any): TDate | null;
  parse(value: string, format: string): TDate | null;

  isNull(value: TDate | null): boolean;
  isValid(value: any): boolean;
  getDiff(value: TDate, comparing: TDate | string): number;
  isEqual(value: any, comparing: any): boolean;
  isSameDay(value: TDate, comparing: TDate): boolean;

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

  format(value: TDate, formatString: string): string;
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

  // displaying methods
  getMeridiemText(ampm: "am" | "pm"): string;
  getCalendarHeaderText(date: TDate): string;
  getDatePickerHeaderText(date: TDate): string;
  getDateTimePickerHeaderText(date: TDate): string;
  getMonthText(date: TDate): string;
  getDayText(date: TDate): string;
  getHourText(date: TDate, ampm: boolean): string;
  getMinuteText(date: TDate): string;
  getSecondText(date: TDate): string;
  getYearText(date: TDate): string;
}
```

### Typescript

The project itself written in typescript, so we are providing our own typescript defenitions. But for the **moment** users its required to add `esModuleInterop` and `allowSyntheticDefaultImports` to your `tsconfig.json`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```
