import React from "react";
import { BiRefresh } from "react-icons/bi";

// import * as classes from "./alert.module.css";

const Alert = () => {
  return (
    <section className="pb-16 container flex">
      <div
        className={` w-full md:max-w-screen-lg mx-auto p-4  bg-yellow-100  rounded-lg `}>
        <div className="text-yellow-700 text-sm">
          <span className="flex items-center font-medium text-base">
            <BiRefresh className="text-lg mr-2" /> Cet article requiert une mise
            à jour
          </span>
        </div>
      </div>
    </section>
  );
};

export default Alert;
