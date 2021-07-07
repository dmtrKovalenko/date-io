import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { IUtils } from "@date-io/core/IUtils";

const DateUtilsContext = createContext<{ utils: IUtils<any> }>({ utils: null });

type DateUtilsProviderProps = {
  adapter: IUtils<any>;
};

function DateUtilsProvider({
  children,
  adapter,
}: PropsWithChildren<DateUtilsProviderProps>) {
  const [utils, setUtils] = useState(adapter);
  return (
    <DateUtilsContext.Provider value={{ utils }}>{children}</DateUtilsContext.Provider>
  );
}

function useDateUtils() {
  const { utils } = useContext(DateUtilsContext);

  return { utils };
}

export { DateUtilsProvider, useDateUtils };
