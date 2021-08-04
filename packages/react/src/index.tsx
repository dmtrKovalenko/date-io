import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { IUtils } from "@date-io/core/IUtils";
import "../type/index";

type DateContextInterface = {
  dateUtils: IUtils<any>;
  setAdapter: (adapter: IUtils<any>) => void;
};

const DateUtilsContext = createContext<DateContextInterface>({
  dateUtils: null,
  setAdapter: () => {},
});

type DateUtilsProviderProps = {
  adapter: IUtils<any>;
};

function DateUtilsProvider({
  children,
  adapter,
}: PropsWithChildren<DateUtilsProviderProps>) {
  const [dateUtils, setAdapter] = useState(adapter);
  return (
    <DateUtilsContext.Provider value={{ dateUtils, setAdapter }}>
      {children}
    </DateUtilsContext.Provider>
  );
}

function useDateUtils() {
  const { dateUtils, setAdapter } = useContext(DateUtilsContext);

  return { dateUtils, setAdapter };
}

function withDateUtils(Component) {
  class WrappedComponent extends React.Component<{ forwardedRef: any }> {
    render() {
      const props = this.props;
      return (
        <DateUtilsContext.Consumer>
          {({ dateUtils, setAdapter }) => {
            return (
              <Component
                ref={this.props?.forwardedRef}
                {...props}
                dateUtils={dateUtils}
                setAdapter={setAdapter}
              />
            );
          }}
        </DateUtilsContext.Consumer>
      );
    }
  }
  const ForwardedComponent = React.forwardRef(function (props, ref) {
    return <WrappedComponent forwardedRef={ref} {...props} />;
  });
  ForwardedComponent.prototype = {};
  return ForwardedComponent;
}

export { DateUtilsProvider, useDateUtils, withDateUtils };
