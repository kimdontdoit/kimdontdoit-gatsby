import React from "react";
import { BiRefresh } from "react-icons/bi";

import * as classes from "./alert.module.css";

const Alert = () => {
  return (
    <section className="pb-16 container flex" tabIndex={0}>
      <div
        className={` w-full max-w-screen-md mx-auto p-4  bg-gray-100  rounded-lg `}
      >
        <div className="text-gray-700 text-sm">
          <span className="flex items-center font-bold text-base">
            <BiRefresh className="text-lg mr-2" /> Cet article requiert une mise
            à jour
          </span>
        </div>
      </div>
    </section>
  );
};

export default Alert;
