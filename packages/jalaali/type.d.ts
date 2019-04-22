import { Moment } from "moment-jalaali";

declare module "@date-io/type" {
  export type DateType = Moment;
}
