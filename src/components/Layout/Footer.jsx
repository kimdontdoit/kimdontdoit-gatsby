import React from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import * as classes from "./Footer.module.css";

const scrollToTop = () => {
    if (typeof window !== "undefined") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};

const Footer = () => {
    const { t, languages, language, originalPath } = useI18next();

    return (
        <footer
            className={`${classes.footer} bg-dark text-white`}
            role="contentinfo"
        >
            <div className={`container text-center py-12`}>
                <div
                    role="link"
                    className={`${classes.scrollTopLink} mb-8`}
                    onClick={scrollToTop}
                    onKeyDown={scrollToTop}
                    tabIndex={0}
                >
                    {t(`back-to-top`)}
                </div>

                <div>
                    <p className={`opacity-30`}>
                        {`Kimdontdoit copyright 2023`}
                        <br />
                        {`${t("copyright-line")} `}
                        <a
                            href="https://www.gatsbyjs.com/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Gatsby
                        </a>
                        {` — ${t("open-source")}`}
                    </p>
                </div>

                {/*<div>
          <ul className={classes.languageSwitcher}>
            {languages && languages.map((lng) => {
              if (lng !== language) {
                return (
                  <li key={lng}>
                    {`${t('change-to')} `}
                    <Link to={originalPath} language={lng}>
                      {language === 'fr' ? 'English' : 'Française'}
                    </Link>
                  </li>
                )
              } else {

                return null
              }
            })}
          </ul>
        </div>*/}
            </div>
        </footer>
    );
};

export default Footer;
