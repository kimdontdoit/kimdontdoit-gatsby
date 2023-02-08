import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import Button from "../../Button";
import { Logo } from "./Logo";

import classNames from "the-great-gatsby-theme/src/utils/classNames";

import ScrollProgress from "../../ScrollProgress";
import SocialLinks from "../../SocialLinks";
import ThemeContext from "../../../context/ThemeContext";

import * as classes from "./Header.module.css";

export const Header = () => {
  const [sticky, setSticky] = useState(false);
  const { headerTransparent, headerLight } = useContext(ThemeContext);
  const { t } = useI18next();

  const headerRef = useRef();

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      window.scrollY > 300 ? setSticky(true) : setSticky(false);
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      {/** Change color, maybe gradient? Appear only on scroll */}

      <div
        className={classNames(
          classes.root,
          headerTransparent && classes.headerTransparent,
          headerLight && classes.headerLight,
          sticky && classes.sticky
        )}
        ref={headerRef}
      >
        {/** Add border under nav */}
        <div className={classes.innerHeader}>
          <div className={`flex-1 flex text-base`}>
            <Logo sticky={sticky} light={headerLight} />
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
                      activeClassName={`opacity-30`}
                    >
                      {navItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/** Make responsive version (On menu button click) */}

          {
            <div className={`hidden md:flex flex-1 justify-end items-center`}>
              {/*<Button href="/vladislav-kim-a-propos" className={classes.cta}>
                Get in touch
                </Button>*/}

              {!sticky && <SocialLinks />}
            </div>
          }
        </div>
      </div>
    </>
  );
};
