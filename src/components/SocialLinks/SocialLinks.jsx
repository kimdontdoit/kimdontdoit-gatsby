import React from "react";

import * as classes from "./socialLinks.module.css";

const links = [
  {
    className: "linkedin",
    label: "Linkedin",
    url: "https://www.linkedin.com/in/vladislav-kim-3ba4a1172",
    icon: "fa-icon"
  },
  {
    className: "github",
    label: "Github",
    url: "https://github.com/kimdontdoit",
    icon: "fa-icon"
  },
  {
    className: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/kimdontdoit/",
    icon: "fa-icon"
  }
];

const SocialLinks = () => {
  return (
    <ul className={classes.socialLinks}>
      {links.map((link) => (
        <li key={link.className}>
          <a
            className={classes[link.className]}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
