# date-io

Abstraction over common JavaScript date management libraries.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The project exposes an abstraction interface over [date-fns v2](https://github.com/date-fns/date-fns) and [moment](https://momentjs.com/).
It allows you to build any UI date or time components, while utilizing the same date management library in use within your user's project.

It simplifies timezone management, allows your code to return the exact same type that your user expects and works with specific calendar systems (e.g. [Hijri calendar](https://en.wikipedia.org/wiki/Hijri_calendar))

### Projects

| Library           |                                                                                                               Downloads |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------: |
| @date-io/date-fns | [![npm download](https://img.shields.io/npm/dm/@date-io/date-fns.svg)](https://www.npmjs.org/package/@date-io/date-fns) |
| @date-io/moment   |     [![npm download](https://img.shields.io/npm/dm/@date-io/moment.svg)](https://www.npmjs.org/package/@date-io/moment) |
| @date-io/hijri    |       [![npm download](https://img.shields.io/npm/dm/@date-io/hijri.svg)](https://www.npmjs.org/package/@date-io/hijri) |

### Usage example

```js
import MomentAdapter from "@date-io/moment";
import DateFnsAdapter from "@date-io/date-fns";

const dateFns = new DateFnsAdapter();
const moment = new MomentAdapter({ locale: "fr" }); // pass french locale

const initialMomentDate = moment.date("2018-10-28T11:44:00.000Z");
const initialDateFnsDate = dateFns.date("2018-10-28T11:44:00.000Z");

const updatedMomentDate = moment.addDays(initialMomentDate, 2);
const updatedDateFnsDate = dateFns.addDays(initialDateFnsDate, 2);

moment.format(updatedMomentDate, "fullDateTime24h"); // "2018, octobre 30 11:44"
dateFns.format(updatedMomentDate, "fullDateTime24h"); // "2018, October 30th 11:44"
```

### Interface

The implemented interface. If you cannot find the method you require, please let us know, and we will add it!

Localized output will of course vary based on the locale and date library used. Inline examples here are based on using
`moment` with the `en-US` locale.

<!--inline-interface-start-->

```tsx
export interface DateIOFormats<TLibFormatToken = string> {
  /** Localized full date @example "Jan 1, 2019" */
  fullDate: TLibFormatToken;
  /** Partially localized full date with weekday, useful for text-to-speech accessibility @example "Tuesday, January 1, 2019" */
  fullDateWithWeekday: TLibFormatToken;
  /** Date format string with month and day of month @example "1 January" */
  normalDate: TLibFormatToken;
  /** Date format string with weekday, month and day of month @example "Wed, Jan 1" */
  normalDateWithWeekday: TLibFormatToken;
  /** Shorter day format @example "Jan 1" */
  shortDate: TLibFormatToken;
  /** Year format string @example "2019" */
  year: TLibFormatToken;
  /** Month format string @example "January" */
  month: TLibFormatToken;
  /** Short month format string @example "Jan" */
  monthShort: TLibFormatToken;
  /** Short month format string @example "January 2018" */
  monthAndYear: TLibFormatToken;
  /** Month with date format string @example "January 1" */
  monthAndDate: TLibFormatToken;
  /** Weekday format string @example "Wednesday" */
  weekday: TLibFormatToken;
  /** Short weekday format string @example "Wed" */
  weekdayShort: TLibFormatToken;
  /** Day format string @example "1" */
  dayOfMonth: TLibFormatToken;
  /** Hours format string @example "11" */
  hours12h: TLibFormatToken;
  /** Hours format string @example "23" */
  hours24h: TLibFormatToken;
  /** Minutes format string @example "44" */
  minutes: TLibFormatToken;
  /** Seconds format string @example "00" */
  seconds: TLibFormatToken;
  /** Full time localized format string @example "11:44 PM" for US, "23:44" for Europe */
  fullTime: TLibFormatToken;
  /** Not localized full time format string @example "11:44 PM" */
  fullTime12h: TLibFormatToken;
  /** Not localized full time format string @example "23:44" */
  fullTime24h: TLibFormatToken;
  /** Date & time format string with localized time @example "Jan 1, 2018 11:44 PM" */
  fullDateTime: TLibFormatToken;
  /** Not localized date & Time format 12h @example "Jan 1, 2018 11:44 PM" */
  fullDateTime12h: TLibFormatToken;
  /** Not localized date & Time format 24h @example "Jan 1, 2018 23:44" */
  fullDateTime24h: TLibFormatToken;
  /** Localized keyboard input friendly date format @example "02/13/2020 */
  keyboardDate: TLibFormatToken;
  /** Localized keyboard input friendly date/time format @example "02/13/2020 23:44" */
  keyboardDateTime: TLibFormatToken;
  /** Partially localized keyboard input friendly date/time 12h format @example "02/13/2020 11:44 PM" */
  keyboardDateTime12h: TLibFormatToken;
  /** Partially localized keyboard input friendly date/time 24h format @example "02/13/2020 23:44" */
  keyboardDateTime24h: TLibFormatToken;
}

export type Unit =
  | "years"
  | "quarters"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export interface IUtils<TDate> {
  formats: DateIOFormats<any>;
  locale?: any;
  moment?: any;
  dayjs?: any;
  /** Name of the library that is used right now */
  lib: string;

  // constructor (options?: { formats?: DateIOFormats, locale?: any, instance?: any });

  date(value?: any): TDate | null;
  toJsDate(value: TDate): Date;
  parse(value: string, format: string): TDate | null;

  getCurrentLocaleCode(): string;
  is12HourCycleInCurrentLocale(): boolean;
  /** Returns user readable format (taking into account localized format tokens), useful to render helper text for input (e.g. placeholder). For luxon always returns empty string. */
  getFormatHelperText(format: string): string;

  isNull(value: TDate | null): boolean;
  isValid(value: any): boolean;
  getDiff(value: TDate, comparing: TDate | string, unit?: Unit): number;
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

  isWithinRange(value: TDate, range: [TDate, TDate]): boolean;

  startOfMonth(value: TDate): TDate;
  endOfMonth(value: TDate): TDate;
  startOfWeek(value: TDate): TDate;
  endOfWeek(value: TDate): TDate;

  addSeconds(value: TDate, count: number): TDate;
  addMinutes(value: TDate, count: number): TDate;
  addHours(value: TDate, count: number): TDate;
  addDays(value: TDate, count: number): TDate;
  addWeeks(value: TDate, count: number): TDate;
  addMonths(value: TDate, count: number): TDate;

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
  getDaysInMonth(value: TDate): number;
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

<!--inline-interface-end-->

### For library authors

If you are a library author that exposes date/time management utils or controls you may want to use date-io to interop with the most popular libraries. Here are some instructions of how to use date-fns as an adapter.

#### 1. Install the bindings

First of all it is required to provide the adapters for your users. We do not recommend to install the date-io directly by the end users, cause it may be easy to mismatch the version. The better way will be to reexport them.

Firstly install all the adapters you want to support and lock the version.

> Yes, you will install all of them as dependencies. But every adapter is 50kb unpacked npm module and relieas to the library as for **optional peer dependency**. It **won't** be included in user bundle until user will choose which library he want's to use.

```json
{
  "dependencies": {
    "@date-io/date-fns": "x.x.x",
    "@date-io/moment": "x.x.x"
  }
}
```

#### 2. Reexport the bindings

```js
// you-awesome-lib/adapters/date-fns
export { default } from "@date-io/date-fns";
```

You can also manually extend the adapter if you need to. Create a custom interface:

```ts
// your-awesome-lib/adapters/CustomAdapter
import { IUtils } from "@date-io/core";

interface CustomUtils<TDate> extends IUtils<TDate> {
  getDayOfYear(day: TDate): number;
}
```

And extend date-io classes implementing your custom interface:

```ts
// you-awesome-lib/adapters/date-fns
import { CustomUtils } from "../CustomUtils";
import getDayOfYear from "date-fns/getDayOfYear";
import DateIODateFnsAdapter from "@date-io/date-fns";

export class DateFnsAdapter extends DateIODateFnsAdapter implements CustomUtils<Date> {
  getDayOfYear(date: Date) {
    return getDayOfYear(date);
  }
}
```

#### 3. Use it for date-time management

Register it using your library context. It may be react context, dependency injection container or any other tool that allow user to register the used library **1 time**.

```tsx
// react example
import { DateFnsAdapter } from "your-awesome-lib/adapters/date-fns";

<DateLibProvider adapter={DateFnsAdapter}>{/* ... */}</DateLibProvider>;
```

```tsx
// angular example
import { Injectable } from "@angular/core";
import { DateFnsAdapter } from "your-awesome-lib/adapters/date-fns";

@Injectable({
  providedIn: "root",
})
export class DateAdapter extends DateFnsAdapter {}
```

And use the interface of date-io (or your custom interface).

```ts
import { IUtils } from "@date-io/core";

function myFunctionInLibrary<TDate>(date: TDate, adapter: IUtils<TDate>) {
  // ...
  const weekArray = adapter.getWeekArray(Date);
  // ...
}
```
