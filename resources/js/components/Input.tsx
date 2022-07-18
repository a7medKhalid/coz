import React, { useEffect, useRef } from "react";

interface props {
    type?: string;
    name: string;
    value: any;
    className?: any;
    required?: boolean;
    handleChange: any;
}
const Input: React.FC<props> = ({
    type = "text",
    name,
    value,
    className,
    required,
    handleChange,
}) => {
    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                // autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Input;
