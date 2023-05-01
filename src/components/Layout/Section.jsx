import React from "react";
import classNames from "classnames";

import * as defaultClasses from "./Section.module.css";

export const Section = (props) => {
    const { children, className, classes: propsClasses } = props;

    const classes = {
        ...defaultClasses,
        ...propsClasses
    };
    const sectionClasses = classNames(classes.section, className);

    return (
        <section className={sectionClasses}>
            <div className="container max-w-screen-lg">{children}</div>
        </section>
    );
};
