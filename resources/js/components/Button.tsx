import React from "react";

export default function Button({
    type = "submit",
    className = "",
    processing = false,
    children,
    onClick = () => {},
}) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 font-bold bg-primary border-2 border-sky-300 rounded-md text-xs text-white uppercase tracking-widest active:bg-primary transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
