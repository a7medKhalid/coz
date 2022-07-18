import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "./Button";

export const CustomModalContext = React.createContext<any>(null);

const CustomModal = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <CustomModalContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </CustomModalContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = React.useContext(CustomModalContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900 opacity-20"
                    onClick={() => toggleOpen()}
                ></div>
            )}
        </>
    );
};

const Title = ({ children, className = "" }) => {
    return (
        <>
            <div
                className={`w-full bg-gray-50 border-b border-gray-100 py-4 px-5 flex items-center justify-end ${className}`}
            >
                {children}
            </div>
        </>
    );
};
const Content = ({ contentClasses = " bg-white", children }) => {
    const { open, setOpen } = React.useContext(CustomModalContext);
    let alignmentClasses = "origin-top";

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2   flex items-center justify-center rounded-md  top-20 left-0 right-0 bottom-0 `}
                >
                    <div
                        className={
                            `rounded-md ring-1  w-2/4 min-h-["50%"] ring-black ring-opacity-5 ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const Footer = ({ children, className = "" }) => {
    const { open, setOpen } = React.useContext(CustomModalContext);

    return (
        <>
            <div
                className={`w-full bg-gray-50 border-t border-gray-100 py-4 px-5 flex items-center justify-end ${className}`}
            >
                <Button
                    className="bg-gray-200 border-gray-300 text-black mr-2"
                    onClick={() => setOpen(false)}
                >
                    إغلاق
                </Button>
                {children}
            </div>
        </>
    );
};
CustomModal.Title = Title;
CustomModal.Trigger = Trigger;
CustomModal.Content = Content;
CustomModal.Footer = Footer;
export default CustomModal;
