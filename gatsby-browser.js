import React from "react";
import "./src/styles/prism-theme.css";
import "./src/styles/global.css";

import { Layout } from "./src/components/Layout/Layout";
import { ThemeProvider } from "./src/context/ThemeContext";
import { GameProvider } from "./src/components/Game/GameContext";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <GameProvider>{element}</GameProvider>
  </ThemeProvider>
);

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}
