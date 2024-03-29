import React, { useEffect, useRef } from "react";

interface props {
    type?: string;
    name: string;
    value: any;
    className?: any;
    required?: boolean;
    handleChange?: any;
    placeholder?: string;
    parentClassName?: string;
    disabled?: boolean;
    autoComplete?: any;
    onKeyPress?: any;
    min?: any;
    max?: any;
}
const Input: React.FC<props> = ({
    type = "text",
    name,
    placeholder,
    value,
    className,
    required,
    parentClassName,
    handleChange,
    autoComplete,
    disabled,
    onKeyPress,
    min,
    max,
}) => {
    return (
        <div className={`flex flex-col items-start  w-full ${parentClassName}`}>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onKeyPress={onKeyPress}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                disabled={disabled}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                min={min}
                max={max}
            />
        </div>
    );
};

export default Input;
