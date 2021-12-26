import React from "react";
import "./src/styles/prism-theme.css";
import "./src/styles/global.scss";

import { Layout } from "./src/components/Layout/Layout";

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}
