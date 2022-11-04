import React from "react";
import "./src/styles/prism-theme.css";
import "./src/styles/global.css";

import {Layout} from "./src/components/Layout/Layout";
import {ThemeProvider} from "./src/context/ThemeContext";

export const wrapRootElement = ({element}) => (
  <ThemeProvider>{element}</ThemeProvider>
);

export const wrapPageElement = ({element}) => {
  return React.cloneElement(
    element,  // I18nextProvider
    element.props,
    React.cloneElement(
      element.props.children,  // I18nextContext.Provider
      element.props.children.props,
      React.createElement(
        Layout,
        undefined,
        element.props.children.props.children,
      ),
    ),
  );
};