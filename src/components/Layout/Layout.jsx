import React from "react";

import { Header } from "./Header";
import Footer from "./Footer";
import Cursor from "../Cursor";
// import Modal from "../Modal";

export function Layout({ children, ...props }) {
    const { className = "" } = props;

    return (
        <div className={`flex flex-col min-h-screen`}>
            <Header />

            <main className={`flex-1 ${className} `} role="main">
                {children}
            </main>

            <Cursor />

            <Footer />
        </div>
    );
}
