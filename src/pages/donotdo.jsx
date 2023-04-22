import React, { useEffect, useCallback, useRef, useState } from "react";
import { graphql } from "gatsby";
import { useForm } from "react-hook-form";

import Seo from "the-great-gatsby-theme/src/components/Seo";

import { DoNotDo } from "../components/DoNotDo";

import * as classes from "./donotdo.module.css";

const Prompt = (props) => {
    const { prompts } = props;

    const cmdRef = useRef(null);

    const [title, setTitle] = useState("");
    const [lines, setLines] = useState([]);
    const [promptId, setPromptId] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            //Do whatever when esc is pressed
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const currentLine = useCallback(() => {
        lines.slice(-1).pop();
    }, [lines]);

    useEffect(() => {
        // What happens when the current line changes
    }, [currentLine]);

    useEffect(() => {
        addLine(prompts[promptId]?.prompt);
    }, [promptId]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting }
    } = useForm();

    const onSubmit = (data) => {
        const { prompt } = data;

        if (prompt) {
            addLine(prompt);
        }

        if (prompts[promptId + 1]) {
            setPromptId(promptId + 1);
            reset();
        } else {
            addLine("That's it folks!");
            setDisabled(true);
        }
    };

    const addLine = async (line) => {
        await setLines([...lines, line]);
    };

    const currentValidation = useCallback((value) => {
        if (
            isSubmitting &&
            typeof prompts[promptId]?.prompt_metas?.validation === "function"
        ) {
            return prompts[promptId]?.prompt_metas?.validation(value);
        }

        return true;
    });

    const [cmdClasses, setCmdClasses] = useState([classes.cmd]);

    useEffect(() => {
        if (isSubmitting) {
            setCmdClasses([classes.cmd, classes.shake]);
        }

        setTimeout(() => {
            setCmdClasses([classes.cmd]);
        }, 1000);
    }, [isSubmitting]);

    return (
        <div className={cmdClasses.join(" ")} ref={cmdRef}>
            {title ? <div className={classes.menu}>{title}</div> : null}

            <div className={classes.cmdInner}>
                <div className={classes.lines}>
                    {lines.map((line, index) => {
                        return (
                            <div
                                key={`${line}-${index}`}
                                className={classes.line}
                            >
                                {line}
                            </div>
                        );
                    })}

                    {!disabled && (
                        <div className={classes.line}>
                            <span>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        type="text"
                                        {...register("prompt", {
                                            validate: (value) =>
                                                currentValidation(value)
                                        })}
                                        autoFocus
                                    />
                                </form>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

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
