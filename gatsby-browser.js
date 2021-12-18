import React from "react";
import "./src/styles/global.scss";
import "./src/styles/prism.css";

import { Layout } from "./src/components/Layout/Layout";

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}
