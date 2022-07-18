import React from "react";

interface props {
    forInput?: any;
    value?: string;
    children?: any;
    className?: any;
}
const Label: React.FC<props> = ({ forInput, value, className, children }) => {
    return (
        <label
            htmlFor={forInput}
            className={
                "block font-medium text-right text-sm text-gray-700" + className
            }
        >
            {value ? value : children}
        </label>
    );
};
export default Label;
