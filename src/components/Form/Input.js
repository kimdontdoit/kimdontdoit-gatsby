import React from "react";
import { Message } from "./Message";
import * as classes from "./Input.module.css";

export const Input = React.forwardRef(
  (
    { name, label, info, error, required, onChange, onBlur, ...otherProps },
    ref
  ) => {
    return (
      <div className="formControl mb-4">
        <div className="flex justify-between">
          {label ? (
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
          ) : null}

          {info ? (
            <span id={`${name}-description`} className="text-sm text-gray-500">
              {info}
            </span>
          ) : null}
        </div>

        <div className="mt-2">
          <input
            id={name}
            name={name}
            className={classes.input}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            {...otherProps}
          />
        </div>

        {error?.type === "required" ? (
          <Message>{`${label} is required`}</Message>
        ) : error?.message ? (
          <Message>{error.message}</Message>
        ) : null}
      </div>
    );
  }
);
