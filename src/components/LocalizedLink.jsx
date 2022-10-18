import React from "react";
import { Link } from "gatsby";
import { injectIntl, intlShape } from "react-intl";

import locales from "../i18n/locales";

const LocalizedLink = ({ to, intl: { locale }, ...props }) => {
  const path = locales[locale].default ? to : `/${locale}${to}`;

  return <Link {...props} to={path} />;
};

export default injectIntl(LocalizedLink);
