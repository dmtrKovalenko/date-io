import { renderHook, act } from "@testing-library/react-hooks";
import { DateUtilsProvider, useDateUtils } from "../packages/react/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import HijriUtils from "../packages/hijri/src";
import React from "react";

const dateFnsUtils = new DateFnsUtils();
const momentUtils = new MomentUtils();
const hijriUtils = new HijriUtils();

test("should work with date-fns adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={dateFnsUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.dateUtils.lib).toEqual("date-fns");
});

test("should work with moment adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={momentUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.dateUtils.lib).toEqual("moment");
});

test("should work with hijri adapter", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={hijriUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.dateUtils.lib).toEqual("moment=hijiri");
});

test("should be able to switch adapters", () => {
  const wrapper = ({ children }) => (
    <DateUtilsProvider adapter={dateFnsUtils}>{children}</DateUtilsProvider>
  );
  const { result } = renderHook(() => useDateUtils(), { wrapper });
  expect(result.current.dateUtils.lib).toEqual("date-fns");

  act(() => result.current.setAdapter(momentUtils));

  expect(result.current.dateUtils.lib).toEqual("moment");

  act(() => result.current.setAdapter(hijriUtils));

  expect(result.current.dateUtils.lib).toEqual("moment=hijiri");
});
