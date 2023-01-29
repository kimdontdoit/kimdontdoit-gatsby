import React, { useContext, useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import Button from "../Button";
import { Logo } from "./Header";

import classNames from "the-great-gatsby-theme/src/utils/classNames";

import ScrollProgress from "../ScrollProgress";
import SocialLinks from "../SocialLinks";
import ThemeContext from "../../context/ThemeContext";

import * as classes from "./Topbar.module.css";

const Topbar = () => {
  const [sticky, setSticky] = useState(false);
  const { topbarTransparent } = useContext(ThemeContext);
  const { t } = useI18next();

  const handleScroll = () => {
    /** Bring the sticky back. Maybe on scroll up + disappear when inactive */
    /** Sticky, make a component that's not full width (differentiation) */

    window.scrollY > 150 ? setSticky(true) : setSticky(false);
  };

  /** Make into a hook */
  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <ScrollProgress />
      {/** Change color, maybe gradient? Appear only on scroll */}
      <div
        className={classNames(
          classes.topbar,
          topbarTransparent && classes.topbarTransparent,
          sticky && classes.sticky
        )}
      >
        {/** Add border under nav */}
        <div className={`container`}>
          <div className="max-w-screen-lg mx-auto flex flex-row py-4">
            <div className={`flex-1 flex text-base`}>
              <Logo />

              {/** Conver to array of menu items */}

              {/** Accessibility! */}

              <ul className="flex ml-8 md:ml-16 items-center">
                <li>
                  <Link
                    to="/articles"
                    className={`font-medium hover:opacity-30`}
                    activeClassName={`opacity-30`}
                  >
                    {t("posts")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/snippets"
                    className={`font-medium hover:opacity-30`}
                    activeClassName={`opacity-30`}
                  >
                    Snippets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className={`hidden md:inline font-medium hover:opacity-30`}
                    activeClassName={`opacity-30`}
                  >
                    {t("categories")}
                  </Link>
                </li>
              </ul>
            </div>

            {/** Make responsive version (On menu button click) */}

            {/*<Button
                            href="/vladislav-kim-a-propos"
                            className="bg-black text-white"
                        >
                            don't do it
                </Button>*/}

            {/** Review social buttons */}
            {
              <div
                className={`hidden md:flex flex-1 justify-end items-center `}
              >
                <SocialLinks />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
