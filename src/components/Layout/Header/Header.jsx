import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import { Logo } from "./Logo";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import ScrollProgress from "../../ScrollProgress";

import { useHeader } from "./useHeader";
import * as defaultClasses from "./Header.module.css";

export const Header = (props) => {
    const { classes: propsClasses } = props;

    const { sticky, headerRef } = useHeader();
    const classes = { ...defaultClasses, ...propsClasses };

    const navItems = [];

    return (
        <>
            <ScrollProgress />
            {/** Change color, maybe gradient? Appear only on scroll */}

            <div
                className={classNames(classes.root, sticky && classes.sticky)}
                ref={headerRef}
            >
                {/** Add border under nav */}
                <div className={classes.innerHeader}>
                    <div className={`flex-1 flex text-base`}>
                        <Logo
                            sticky={sticky}
                            text="Ai"
                            className={classes.logo}
                        />
                        {/** Accessibility! */}
                        <nav
                            className={classes.nav}
                            aria-label="Main Navigation"
                            role="navigation"
                        >
                            <ul>
                                {navItems.map((navItem) => (
                                    <li
                                        className={classes.navItem}
                                        key={navItem.href}
                                    >
                                        <Link
                                            to={navItem.href}
                                            className={`text-base font-medium`}
                                            activeClassName={classes.activeLink}
                                        >
                                            {navItem.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
