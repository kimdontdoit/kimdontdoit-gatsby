import React from "react";
import * as classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${classes.footer} bg-primary`}>
      <div className={`${classes.footerContainer} container text-center py-12`}>
        <div className={`${classes.scrollTopLink} mb-8`}>Back to the top</div>
        <div>
          <p className={`opacity-30`}>
            Kimdontdoit copyright 2021 Roule sans stress sur{" "}
            <a
              href="https://www.gatsbyjs.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Gatsby
            </a>{" "}
            — logiciel open source
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
