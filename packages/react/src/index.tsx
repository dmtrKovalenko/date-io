import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { IUtils } from "@date-io/core/IUtils";
import "../type/index";

type DateContextInterface = {
  utils: IUtils<any>;
  setAdapter: (adapter: IUtils<any>) => void;
};

const DateUtilsContext = createContext<DateContextInterface>({
  utils: null,
  setAdapter: () => {},
});

type DateUtilsProviderProps = {
  adapter: IUtils<any>;
};

function DateUtilsProvider({
  children,
  adapter,
}: PropsWithChildren<DateUtilsProviderProps>) {
  const [utils, setAdapter] = useState(adapter);
  return (
    <DateUtilsContext.Provider value={{ utils, setAdapter }}>
      {children}
    </DateUtilsContext.Provider>
  );
}

function useDateUtils() {
  const { utils, setAdapter } = useContext(DateUtilsContext);

  return { utils, setAdapter };
}

function withDateUtils(Component) {
  class WrappedComponent extends React.Component<{ forwardedRef: any }> {
    render() {
      const props = this.props;
      return (
        <DateUtilsContext.Consumer>
          {({ utils }) => {
            return (
              <Component ref={this.props?.forwardedRef} {...props} dateUtils={utils} />
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
