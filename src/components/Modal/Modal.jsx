import React from "react";
import { Dialog } from "@headlessui/react";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import * as classes from "./Modal.module.css";

export const Modal = (props) => {
    const { isOpen, setIsOpen, children, classes: propsClasses } = props;

    const dialogClasses = classNames(classes.dialog, propsClasses.dialog);

    return (
        <Dialog
            className={classes.overlay}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Dialog.Panel className={dialogClasses}>{children}</Dialog.Panel>
        </Dialog>
    );
};
