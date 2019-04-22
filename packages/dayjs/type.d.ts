import { Dayjs } from "dayjs";

declare module "@date-io/type" {
  export type DateType = Dayjs;
}
