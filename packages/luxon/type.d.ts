import { DateTime } from "luxon";

declare module "@date-io/type" {
  export type DateType = DateTime;
}
