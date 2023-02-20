import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import * as classes from "./tooltip.module.css";

export const Tooltip = ({ children, title, bg, mt, ...otherProps }) => {
  let [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <Transition
        show={isVisible}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <div
          className={classes.root}
          style={{ backgroundColor: bg, marginTop: mt }}
          {...otherProps}
        >
          {title}
        </div>
      </Transition>
    </div>
  );
};
