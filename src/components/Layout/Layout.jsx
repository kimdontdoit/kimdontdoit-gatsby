import React, { useContext } from "react";

import ThemeContext from "../../context/ThemeContext";
import { Header } from "./Header";
import Footer from "./Footer";
import Cursor from "../Cursor";

export function Layout({ children, ...props }) {
  const { className = "" } = props;

  return (
    <div className={`flex flex-col min-h-screen`}>
      <Header />

      <main className={`flex-1 ${className}`}>{children}</main>

      <Cursor />

      <Footer />
    </div>
  );
}
