import React from "react";
import { IntlProvider } from "react-intl";

// Messages
import en from "../../i18n/en.json";
import fr from "../../i18n/fr.json";

import Cursor from "../Cursor";
import Topbar from "./Topbar";
import Footer from "./Footer";

const messages = { en, fr };

export const flattenMessages = (nestedMessages, prefix = "") => {
  if (nestedMessages === null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export function Layout({ locale, children }) {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className={`flex flex-col min-h-screen`}>
        <Topbar />

        <main className={`flex-1`}>{children}</main>

        <Cursor />

        <Footer />
      </div>
    </IntlProvider>
  );
}
