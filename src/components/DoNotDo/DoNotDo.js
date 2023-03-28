import React, { useState, useEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Dialog } from "@headlessui/react";

import * as classes from "./DoNotDo.module.css";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/#just-show-me-the-code
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const DoNotDo = (props) => {
    const { isOpen, setIsOpen } = props;

    const settings = {
        pomoDuration: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
        longBreakInterval: 4
    };

    const [pomoStatus, setPomoStatus] = useState("stop");
    const [remainingTime, setRemainingTime] = useState(settings.pomoDuration);
    const [shortBreaks, setShortBreaks] = useState(0);

    const currentDate = dayjs().format("D MMMM YYYY");

    const handleClick = (event) => {
        const dataAction = event.target.dataset.action;

        switch (dataAction) {
            case "start":
                setPomoStatus("pomo");
                break;
            case "pause":
                setPomoStatus("pause");
                break;
            case "stop":
                setPomoStatus("stop");
                setRemainingTime(settings.pomoDuration);
                break;
        }

        /**
         *             case "shortBreak":
                isRunning(true);
                setRemainingTime(settings.shortBreak);
            case "longBreak":
                isRunning(true);
                setRemainingTime(settings.longBreak);
                break;
         */
    };

    useInterval(
        () => {
            if (remainingTime === 0) {
                if (pomoStatus === "pomo") {
                    if (shortBreaks < settings.longBreakInterval - 1) {
                        // if short break
                        setShortBreaks(shortBreaks + 1);
                        setRemainingTime(settings.shortBreak);
                    } else {
                        // if long break
                        setPomoStatus("longBreak");
                        setRemainingTime(settings.longBreak);
                    }
                } else if (pomoStatus === "shortBreak") {
                    setPomoStatus("pomo");
                    setRemainingTime(settings.pomoDuration);
                } else if (pomoStatus === "longBreak") {
                    setPomoStatus("pomo");
                    setRemainingTime(settings.pomoDuration);
                }
            } else {
                setRemainingTime(remainingTime - 1);
            }
        },
        ["pomo", "shortBreak", "longBreak"].indexOf(pomoStatus) >= 0
            ? 1000
            : null
    );

    const pomodoro = useMemo(() => {
        const minutes = `${Number.parseInt(remainingTime / 60, 10)}`;
        const seconds = `${Number.parseInt(remainingTime % 60, 10)}`;

        const timeLeftString = `${minutes}:${seconds.padStart(2, "0")}`;

        return {
            minutes: minutes,
            seconds: seconds,
            timeLeftString: timeLeftString
        };
    }, [remainingTime]);

    useEffect(() => {
        // return setIsOpen(false);
    }, []);

    // @todo avatar/profile pic

    // @todo organization

    // @todo account / database

    // @todo background image

    // @todo pomo

    // @todo idea custom css

    // @todo onboard

    return (
        <Dialog
            className={classes.overlay}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Dialog.Panel className={classes.dialog}>
                <div className={classes.topPanel}>
                    <button onClick={() => setIsOpen(false)}>Quit</button>

                    <div>{currentDate}</div>
                </div>

                <div className={classes.widgetsContainer}>
                    <div className={classes.widgetWrap}>
                        <div className={classes.widget}>
                            <div className={classes.widgetHeading}>
                                <h3 className={classes.title}>Pomodoro</h3>
                            </div>

                            <div className={classes.widgetBody}>
                                {`${pomodoro.timeLeftString}`}
                            </div>

                            <div className={classes.widgetFooter}>
                                <div className={classes.actions}>
                                    <button
                                        className={classes.start}
                                        onClick={handleClick}
                                        data-action="start"
                                    >
                                        Start
                                    </button>
                                    <button
                                        className={classes.pause}
                                        onClick={handleClick}
                                        data-action="pause"
                                    >
                                        Pause
                                    </button>
                                    <button
                                        className={classes.end}
                                        onClick={handleClick}
                                        data-action="stop"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};
