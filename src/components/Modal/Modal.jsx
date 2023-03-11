import React from "react";

import ContactForm from "../Form/ContactForm";
import * as classes from "./modal.module.css";

const Modal = (props) => {
    const {} = props;

    return (
        <div className={classes.root}>
            <div className={classes.innerModal}>
                <h3>Contact</h3>

                <ContactForm />

                <p>
                    Feeling shy? <strong>Send me an email instead</strong>
                </p>
            </div>
        </div>
    );
};

export default Modal;
