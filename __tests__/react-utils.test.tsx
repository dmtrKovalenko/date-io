import { renderHook } from "@testing-library/react-hooks";
import { DateUtilsProvider, useDateUtils } from "../packages/react/src/react-utils";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import HijriUtils from "../packages/hijri/src";
import React from "react";

const dateFnsUtils = new DateFnsUtils();
const momentFnsUtils = new MomentUtils();
const hijriFnsUtils = new HijriUtils();

test("should work with date-fns adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={dateFnsUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.utils.lib).toEqual("date-fns");
});

test("should work with moment adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={momentFnsUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.utils.lib).toEqual("moment");
});

test("should work with hijri adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={hijriFnsUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.utils.lib).toEqual("moment=hijiri");
});
