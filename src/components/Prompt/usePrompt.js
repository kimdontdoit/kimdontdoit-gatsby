import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const usePrompt = (props) => {
    const { classes, initialPrompt } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isSubmitting }
    } = useForm();

    // States
    const [cmdClasses, setCmdClasses] = useState([classes.cmd]);
    const [autoComplete, setAutoComplete] = useState("off");
    const [title, setTitle] = useState("");
    const [lines, setLines] = useState([]);
    const [promptId, setPromptId] = useState(0);
    const [disabled, setDisabled] = useState(false);

    // Functions

    const addLine = (line) => {
        setLines((oldLines) => [...oldLines, line]);
    };

    const clearBuffer = () => {
        setLines([]);
    };

    const promptValid = useCallback(
        (input) => {
            const { metas } = initialPrompt;
            if (metas?.type === "choices" && metas?.options) {
                return metas.options.some(
                    (option) => option.key === input.toLowerCase()
                );
            }

            return false;
        },
        [
            /** todo */
        ]
    );

    // @TODO
    const onSubmit = useCallback((data) => {
        const { prompt } = data;

        addLine(prompt);

        // @TODO depends of type
        if (promptValid(prompt)) {
            addLine("Valid");
        } else {
            addLine("Invalid");
        }

        /**
             * if (prompts && prompts[promptId + 1]) {
                setPromptId(promptId + 1);
                reset();
            } else {
                addLine("That's it folks!");
                setDisabled(true);
            }
            */
    }, []);

    const handleKeydown = (event) => {
        if (event.key === "Escape") {
            // @TODO Do whatever when esc is pressed
        } else if (event.key === "k" && event.ctrlKey) {
            event.preventDefault();

            clearBuffer();

            reset();
        }
    };

    /**
     * useEffect time
     */

    // Set the initial line and prompt
    useEffect(() => {
        if (initialPrompt && lines.length === 0) {
            setPromptId(initialPrompt.id);
        } else {
            // @TODO ERROR?
        }
    }, [initialPrompt]);

    // Listen to keydown event (shortcuts)
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown, false);

        return () => {
            document.removeEventListener("keydown", handleKeydown, false);
        };
    }, []);

    // Display new prompt
    useEffect(() => {
        if (promptId) {
            const { prompt, metas } = initialPrompt;

            addLine(prompt);

            if (metas?.type === "choices") {
                metas?.options.forEach((option) => {
                    addLine(`(${option.key}) ${option.option}`);
                });
            }

            if (metas?.title) {
                setTitle(metas.title);
            }
        }
    }, [promptId]);

    // Shake the cmd
    useEffect(() => {
        if (isSubmitting) {
            setCmdClasses([classes.cmd, classes.shake]);

            setTimeout(() => {
                setCmdClasses([classes.cmd]);
            }, 1000);
        }
    }, [isSubmitting]);

    return {
        autoComplete,
        handleSubmit,
        register,
        cmdClasses,
        disabled,
        lines,
        onSubmit,
        title
    };
};
