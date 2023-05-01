import React from "react";
import classNames from "classnames";

//import classNames from "the-great-gatsby-theme/src/utils/classNames";

import * as defaultClasses from "./heading.module.css";

export const Heading = (props) => {
    const { tag, children, className, text, classes: propsClasses } = props;

    const classes = { ...defaultClasses, ...propsClasses };

    const HeadingClass = classNames(classes.heading, className);

    const HtmlTag = `${tag}`;

    return <HtmlTag className={HeadingClass}>{text || children}</HtmlTag>;
};
