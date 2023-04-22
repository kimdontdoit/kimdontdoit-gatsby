import React, { useEffect, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import * as classes from "./Prompt.module.css";

export const Prompt = (props) => {
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
