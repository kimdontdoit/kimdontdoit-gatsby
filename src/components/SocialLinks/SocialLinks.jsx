import React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

import { Tooltip } from "../Tooltip";

import * as classes from "./socialLinks.module.css";

const links = [
    {
        className: "linkedin",
        label: "Linkedin",
        url: "https://www.linkedin.com/in/vladislav-kim-3ba4a1172",
        icon: <FaLinkedinIn />
    },
    {
        className: "github",
        label: "Github",
        url: "https://github.com/kimdontdoit",
        icon: <FaGithub />
    },
    {
        className: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/kimdontdoit/",
        icon: <FaInstagram />
    }
];

const SocialLinks = () => {
    return (
        <ul className={classes.root}>
            {links.map((link) => (
                <li className={classes.socialLink} key={link.className}>
                    <Tooltip title={`${link.label}`}>
                        <a
                            aria-label={`${link.label}`}
                            className={classes[link.className]}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {link.icon}
                        </a>
                    </Tooltip>
                </li>
            ))}
        </ul>
    );
};

export default SocialLinks;
