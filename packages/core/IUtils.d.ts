export interface DateIOFormats<TLibFormatToken = string> {
  /** Localized full date, useful for accessibility @example "January 1st, 2019" */
  fullDate: TLibFormatToken;
  /** Date format string with month and day of month @example "01 January" */
  normalDate: TLibFormatToken;
  /** Date format string with weekday, month and day of month @example "Wed, Jan 1st" */
  normalDateWithWeekday: TLibFormatToken;
  /** Shorter day format @example "1 January" */
  shortDate: TLibFormatToken;
  /** Year format string @example "2019" */
  year: TLibFormatToken;
  /** Month format string @example "January" */
  month: TLibFormatToken;
  /** Short month format string @example "Jan" */
  monthShort: TLibFormatToken;
  /** Short month format string @example "January 2018" */
  monthAndYear: TLibFormatToken;
  /** Month with date format string @example "January 1st" */
  monthAndDate: TLibFormatToken;
  /** Day format string @example "12" */
  dayOfMonth: TLibFormatToken;
  /** Hours format string @example "11" */
  hours12h: TLibFormatToken;
  /** Hours format string @example "23" */
  hours24h: TLibFormatToken;
  /** Minutes format string @example "59" */
  minutes: TLibFormatToken;
  /** Seconds format string @example "59" */
  seconds: TLibFormatToken;
  /** Full time localized format string @example "11:44 PM" for US, "23:44" for Europe */
  fullTime: TLibFormatToken;
  /** Not localized full time format string @example "11:44 PM" */
  fullTime12h: TLibFormatToken;
  /** Not localized full time format string @example "23:59" */
  fullTime24h: TLibFormatToken;
  /** Date & time format string with localized time @example "2018, Jan 1st 11:44 PM" */
  fullDateTime: TLibFormatToken;
  /** Not localized date & Time format 12h @example "2018, Jan 1st 11:44 PM" */
  fullDateTime12h: TLibFormatToken;
  /** Not localized date & Time format 24h @example "2018, Jan 1st 23:44" */
  fullDateTime24h: TLibFormatToken;
  /** Localized keyboard input friendly date format @example "2019/01/01" */
  keyboardDate: TLibFormatToken;
  /** Localized keyboard input friendly date/time format @example "2019/01/01 23:44" */
  keyboardDateTime: TLibFormatToken;
  /** Not Localized keyboard input friendly date/time 12h format @example "2019/01/01 11:44 PM" */
  keyboardDateTime12h: TLibFormatToken;
  /** Not localized keyboard input friendly date/time 24h format @example "2019/01/01 23:44" */
  keyboardDateTime24h: TLibFormatToken;
}

export interface IUtils<TDate> {
  formats: DateIOFormats<any>;
  locale?: any;
  moment?: any;
  dayjs?: any;

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

  isWithinRange(value: TDate, range: [TDate, TDate]): boolean;

  startOfMonth(value: TDate): TDate;
  endOfMonth(value: TDate): TDate;
  startOfWeek(value: TDate): TDate;
  endOfWeek(value: TDate): TDate;

  addDays(value: TDate, count: number): TDate;
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
