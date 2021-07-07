import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { IUtils } from "@date-io/core/IUtils";

type DateContextInterface = { utils: IUtils<any>, setAdapter: (adapter: IUtils<any>) => void }

const DateUtilsContext = createContext<DateContextInterface>({ utils: null, setAdapter: () => {} });

type DateUtilsProviderProps = {
  adapter: IUtils<any>;
};

function DateUtilsProvider({
  children,
  adapter,
}: PropsWithChildren<DateUtilsProviderProps>) {
  const [utils, setAdapter] = useState(adapter);
  return (
    <DateUtilsContext.Provider value={{ utils, setAdapter }}>{children}</DateUtilsContext.Provider>
  );
}

function useDateUtils() {
  const { utils, setAdapter } = useContext(DateUtilsContext);

  return { utils, setAdapter };
}

export { DateUtilsProvider, useDateUtils };
