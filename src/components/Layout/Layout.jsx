import React from "react";

import Topbar from "./Topbar";
import Footer from "./Footer";

import Cursor from "../Cursor";

export function Layout({ children, ...props }) {
  const { className = "", topbarFixed = false } = props;

  return (
    <div className={`flex flex-col min-h-screen`}>
      <Topbar topbarFixed={topbarFixed} />
      <main className={`flex-1 ${className}`}>{children}</main>

      <Cursor />
      <Footer />
    </div>
  );
}
