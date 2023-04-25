import React, { useRef } from "react";

import { usePrompt } from "./usePrompt";

import * as classes from "./Prompt.module.css";

export const Prompt = (props) => {
    const { config } = props;

    const cmdRef = useRef(null);

    const {
        handleSubmit,
        register,
        cmdClasses,
        disabled,
        lines,
        onSubmit,
        title,
        autoComplete
    } = usePrompt({
        classes,
        ...config
    });

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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={classes.line}>
                                <div className={classes.innerLine}>
                                    <input
                                        type="text"
                                        {...register("prompt")}
                                        autoComplete={autoComplete}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
