import React from "react";
import { useI18next, Link } from "gatsby-plugin-react-i18next";
import { useLocation } from "@reach/router";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import { Tooltip } from "../../Tooltip";

import * as defaultClasses from "./Logo.module.css";

export const Logo = (props) => {
    const {
        sticky,
        tooltip,
        className,
        classes: propsClasses,
        light,
        logoAlt = "Logo",
        image,
        text
    } = props;

    const classes = {
        ...defaultClasses,
        ...propsClasses
    };

    const { pathname } = useLocation();
    const { t } = useI18next();

    const logoClasses = classNames(
        classes.root,
        sticky && classes.sticky,
        className
    );

    const logoTextClasses = classNames(className);

    const logo = image ? (
        <img
            alt={logoAlt}
            src={image}
            height="69"
            width="151"
            className={logoClasses}
        />
    ) : (
        <h2 className={logoTextClasses}>{text}</h2>
    );

    if (pathname === "/" || pathname === "/en/" || !tooltip) {
        return logo;
    }

    return (
        <Tooltip
            id="logo-tooltip"
            title={t("back-to-home")}
            bg="#0ea5e9"
            mt="0.5rem"
        >
            <Link to="/">{logo}</Link>
        </Tooltip>
    );
};
