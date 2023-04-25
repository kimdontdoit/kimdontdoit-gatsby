import React, { useState } from "react";
import { graphql } from "gatsby";

import Seo from "the-great-gatsby-theme/src/components/Seo";

import { DoNotDo } from "../components/DoNotDo";
import { Prompt } from "../components/Prompt";

import * as classes from "./donotdo.module.css";

export default function AppPage() {
    // const { t, language } = useI18next("index");
    // 3am march 24 2023

    // T_T donotdo ... wow the name is so bad (written by github copilot)
    // hey, you could probably link ads to this page

    let [isOpen, setIsOpen] = useState(false);

    const prompts = [
        {
            prompt: "Not sure how I came up with this...",
            prompt_metas: {
                type: "simple",
                choices: [],
                type: ""
            }
        },
        {
            prompt: "Are you ready for this?",
            prompt_metas: {
                type: "bool",
                choices: ["Yes [y]", "No [n]"],
                validation: (val) => {
                    return ["Y", "N"].includes(val.toUpperCase());
                }
            }
        },
        {
            prompt: "Actually validation doesn't work yet."
        },
        { prompt: "What's your name?", prompt_metas: { type: "login" } },
        { prompt: "Type in your email to login or register" },
        { prompt: "Type in a unique password (minimum of 8 characters)" }
    ];

    return (
        <>
            <Seo
                title={
                    "donotdo, a purposeful dashboard app for collaboration and productivity by Vladislav Kim"
                }
                skipSiteName={true}
            />
            <DoNotDo isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className={classes.landing}>
                {/* T_T paid plan to save in the cloud, else load from file + localstorage */}

                <div className={classes.container}>
                    <div className={classes.intro}>
                        <span className={classes.badge}>v.0.0.2</span>
                        <h1>⌘Dnd</h1>
                        <p>
                            Smart, purposeful dashboard app for collaboration
                            and productivity.
                        </p>
                    </div>

                    <Prompt prompts={prompts} />
                </div>
            </div>
        </>
    );
}

export const query = graphql`
    query ($language: String!) {
        locales: allLocale(filter: { language: { eq: $language } }) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;
