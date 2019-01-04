# date-io

Abstraction over common javascript date management libraries.

The project expose abstraction interface over [luxon](https://moment.github.io/luxon/), [date-fns v2](https://github.com/date-fns/date-fns) and [moment](https://momentjs.com/).
Which can be easily used by any ui date or time components to use the same date managment lib as user's project use.

That simplifies timezones management, makes your code return exactly the same type that user expect and work with specific calendar systems (e.g. [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar))

### Projects

| Library           |                                                                                                               Downloads |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------: |
| @date-io/moment   |     [![npm download](https://img.shields.io/npm/dm/@date-io/moment.svg)](https://www.npmjs.org/package/@date-io/moment) |
| @date-io/date-fns | [![npm download](https://img.shields.io/npm/dm/@date-io/date-fns.svg)](https://www.npmjs.org/package/@date-io/date-fns) |
| @date-io/luxon    |       [![npm download](https://img.shields.io/npm/dm/@date-io/luxon.svg)](https://www.npmjs.org/package/@date-io/luxon) |

Projects, which are already built over `date-io`:

- [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers)

### Usage example

````js
import LuxonUtils from '@date-io/luxon'
import DateFnsUtils from '@date-io/date-fns'

```js
import LuxonUtils from "@date-io/date-fns";
import DateFnsUtils from "@date-io/date-fns";

const luxon = new LuxonUtils("fr"); // pass french locale
const dateFns = new DateFnsUtils();

const initialLuxonDate = luxon.date();
const initialDateFnsDate = dateFns.date();

const updatedLuxonDate = luxon.addDays(initialLuxonDate, 2);
const updatedDateFnsDate = dateFns.addDays(initialDateFnsDate, 2);
````

### Interface

Implemented interface for now. If you can not find needed method please let us know and we will add it!

```ts
export interface IUtils<TDate> {
  locale?: any;
  moment?: any;

  dateTime12hFormat: string;
  dateTime24hFormat: string;

  time12hFormat: string;
  time24hFormat: string;

  dateFormat: string;
  // constructor (options?: { locale?: any, moment?: any });

  date(value?: any): TDate | null;
  parse(value: string, format: string): TDate | null;

  isNull(value: TDate | null): boolean;
  isValid(value: TDate): boolean;
  getDiff(value: TDate, comparing: TDate): number;
  isEqual(value: TDate, comparing: TDate): boolean;
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
  getNextMonth(value: TDate): TDate;
  getPreviousMonth(value: TDate): TDate;

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
  getDayText(date: TDate): string;
  getHourText(date: TDate, ampm: boolean): string;
  getMinuteText(date: TDate): string;
  getSecondText(date: TDate): string;
  getYearText(date: TDate): string;
}
```
