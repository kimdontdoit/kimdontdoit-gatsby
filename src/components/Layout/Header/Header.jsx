import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import Button from "../../Button";
import { Logo } from "./Logo";

import classNames from "the-great-gatsby-theme/src/utils/classNames";

import ScrollProgress from "../../ScrollProgress";
import SocialLinks from "../../SocialLinks";

import { useHeader } from "./useHeader";
import * as classes from "./Header.module.css";

export const Header = () => {
  const { sticky, t, headerRef } = useHeader();

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
            <Logo sticky={sticky} /*light={headerLight}*/ />
            {/** Accessibility! */}
            <nav
              className={classes.nav}
              aria-label="Main Navigation"
              role="navigation"
            >
              <ul>
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
            </nav>
          </div>

          <div className={`hidden md:flex flex-1 justify-end items-center`}>
            <Button href="/contact" className={`${classes.cta}`}>
              Get in touch
            </Button>

            {!sticky && <SocialLinks />}
          </div>
        </div>
      </div>
    </>
  );
};
