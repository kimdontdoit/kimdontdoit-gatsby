import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
//import classNames from "the-great-gatsby-theme/src/utils/classNames";
import classNames from "classnames";

import * as defaultClasses from "./Button.module.css";

export const Button = (props) => {
    const {
        label,
        className,
        children,
        onClick,
        type,
        disabled,
        classes: propsClasses,
        href
    } = props;

    const classes = {
        ...defaultClasses,
        ...propsClasses
    };
    const buttonClasses = classNames(classes.btn, className);

    const value = label || children;

    const passiveButton = <button className={buttonClasses}>{children}</button>;

    const clickableButton = (
        <button
            onClick={onClick}
            type={type}
            className={buttonClasses}
            disabled={disabled}
        >
            {value}
        </button>
    );

    if (href) {
        if (href.startsWith("mailto:")) {
            return (
                <a href={href} className={buttonClasses}>
                    {value}
                </a>
            );
        }

        return (
            <Link to={href} className={buttonClasses}>
                {value}
            </Link>
        );
    }

    if (onClick) return clickableButton;

    return passiveButton;
};
