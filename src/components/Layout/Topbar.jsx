import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import ScrollProgress from "../ScrollProgress";
import SocialLinks from "../SocialLinks";

import * as classes from "./Topbar.module.css";

const Topbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 150 ? setSticky(true) : setSticky(false);
    });
  });

  return (
    <>
      <ScrollProgress />
      <div className={`${classes.topbar} ${sticky ? classes.sticky : ""}`}>
        <div className={`container flex flex-row py-4`}>
          <div className={`flex-1 flex text-lg`}>
            <Link to="/">
              <StaticImage
                src="../../images/kimdontdoit_logo_dark.svg"
                alt="Kimdontdoit Wavy Logo"
                objectFit="contain"
                loading="eager"
                placeholder="none"
                className={`${classes.logo}`}
                height={40}
                width={92}
              />
            </Link>

            <ul className="flex ml-16 items-center">
              <li>
                <Link
                  to="/articles"
                  className={`font-bold hover:text-opa-30`}
                  activeClassName={`text-opa-30`}
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/snippets"
                  className={`font-bold hover:text-opa-30`}
                  activeClassName={`text-opa-30`}
                >
                  Snippets
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={`hidden md:inline font-bold hover:text-opa-30`}
                  activeClassName={`text-opa-30`}
                >
                  Catégories
                </Link>
              </li>
            </ul>
          </div>

          {!sticky && (
            <div className={`hidden md:flex flex-1 justify-end items-center `}>
              <SocialLinks />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
