import React from "react";
import { Message } from "./Message";

export const TextArea = React.forwardRef(
  ({ name, label, error, required, onChange, onBlur, ...otherProps }, ref) => {
    return (
      <div className="formControl mb-4">
        {label ? (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        ) : null}

        <div className="mt-2">
          <textarea
            id={name}
            name={name}
            className="block w-full rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
