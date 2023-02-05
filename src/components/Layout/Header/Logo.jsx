import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import { StaticImage } from "gatsby-plugin-image";

import * as classes from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/">
      {/*<StaticImage
        src="../../images/kimdontdoit_logo_2023.svg"
        alt="Kimdontdoit Wavy Logo"
        objectFit="contain"
        loading="eager"
        placeholder="none"
        layout="fixed"
        className={`${classes.logo}`}
        height={32}
      />*/}
    </Link>
  );
};
