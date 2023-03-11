import React from "react";

export const Message = ({ heading, children }) => {
    return (
        <div className="rounded-md bg-red-50 p-4 mt-2">
            <div className="flex">
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        {heading}
                    </h3>

                    <div>
                        <p className="text-sm text-red-700">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
