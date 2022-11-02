import React from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import { useHeader } from "./useHeader.js";
import * as classes from "./Footer.module.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  const { languages } = useI18next();

  console.log(languages);

  const { t } = useHeader();

  return (
    <footer className={`${classes.footer} bg-dark text-white`}>
      <div className={`${classes.footerContainer} container text-center py-12`}>
        <div
          role="link"
          className={`${classes.scrollTopLink} mb-8`}
          onClick={scrollToTop}
          onKeyDown={scrollToTop}
          tabIndex={0}>
          {t("title")}
        </div>

        <div>
          <p className={`opacity-30`}>
            {`Kimdontdoit copyright 2022 ${t("copyright-line")}`}
            <a
              href="https://www.gatsbyjs.com/"
              target="_blank"
              rel="noreferrer noopener">
              Gatsby
            </a>
            {` — ${t("open-source")}`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
