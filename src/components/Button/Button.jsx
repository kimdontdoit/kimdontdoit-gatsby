import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import * as classes from "./button.module.css";

const Button = (props) => {
    const { children, onClick, type, disabled, className = "", href } = props;

    const buttonClasses = classNames(classes.btn, className);

    const passiveButton = <button className={buttonClasses}>{children}</button>;

    const clickableButton = (
        <button
            onClick={onClick}
            type={type}
            className={buttonClasses}
            disabled={disabled}
        >
            {children}
        </button>
    );

    const htmlLink = (
        <a href={href} className={buttonClasses}>
            {children}
        </a>
    );

    const gatsbyLink = (
        <Link to={href} className={buttonClasses}>
            {children}
        </Link>
    );

    if (href) {
        if (href.startsWith("mailto:")) {
            return htmlLink;
        }

        return gatsbyLink;
    }

    if (onClick) return clickableButton;

    return passiveButton;
};

export default Button;
