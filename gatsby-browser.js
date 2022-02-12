import React from "react";
import "./src/styles/prism-theme.css";
import "./src/styles/global.css";

import { Layout } from "./src/components/Layout/Layout";
import { ThemeProvider } from "./src/context/ThemeContext";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}
