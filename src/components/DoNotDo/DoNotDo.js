import React from "react";

import { Dialog } from "@headlessui/react";

export const DoNotDo = (props) => {
    const { isOpen, setIsOpen } = props;

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                </p>

                <button onClick={() => setIsOpen(false)}>Quit</button>
            </Dialog.Panel>
        </Dialog>
    );
};
