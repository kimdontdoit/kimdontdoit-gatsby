import React, { useState } from "react";
import { Link } from "gatsby-plugin-react-i18next";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import ScrollProgress from "../../ScrollProgress";
import SocialLinks from "../../SocialLinks";
import { Button } from "../../Button";
import { Modal } from "../../Modal";

import { Logo } from "./Logo";
import { useHeader } from "./useHeader";
import * as classes from "./Header.module.css";

export const Header = () => {
    const { sticky, t, headerRef } = useHeader();
    let [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);

    const logo = <Logo sticky={sticky} /*light={headerLight}*/ />;

    const navItems = [
        {
            href: "/articles",
            label: t("posts")
        },
        { href: "/snippets", label: "Snippets" },
        {
            href: "/categories",
            label: t("categories")
        }
    ];

    const nav = (
        <nav
            className={classes.nav}
            aria-label="Main Navigation"
            role="navigation"
        >
            <ul className={classes.navItems}>
                {navItems.map((navItem) => (
                    <li className={classes.navItem} key={navItem.href}>
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
            <ul className={`md:hidden`}>
                <li className={classes.navItem}>
                    <div className={`text-base font-medium`}>
                        <button onClick={() => setMobileHeaderOpen(true)}>
                            MENU
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    );

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
                        {logo}
                        {/** Accessibility! */}
                        {nav}
                    </div>

                    <div
                        className={`hidden md:flex flex-1 justify-end items-center`}
                    >
                        <Button href="/contact" className={`${classes.cta}`}>
                            Get in touch
                        </Button>

                        {!sticky && <SocialLinks />}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={mobileHeaderOpen}
                setIsOpen={setMobileHeaderOpen}
                classes={classes}
            >
                <button onClick={() => setMobileHeaderOpen(false)}>
                    Deactivate
                </button>
                {logo}
                {nav}

                <Button href="/contact" className={`${classes.cta}`}>
                    Get in touch
                </Button>

                <SocialLinks />
            </Modal>
        </>
    );
};
