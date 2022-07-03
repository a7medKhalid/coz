import React from "react";

const LoopObject = ({ object }) => {
    return (
        <>
            {Object.keys(object).map((item, index) => {
                return (
                    <div>
                        {index + 1} - {item}: {object[item]}
                    </div>
                );
            })}
        </>
    );
};

export default LoopObject;
