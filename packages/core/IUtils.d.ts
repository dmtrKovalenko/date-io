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
