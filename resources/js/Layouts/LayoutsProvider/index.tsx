// this is componenet to wrap layouts.. to add shared config

import React, { createContext, useContext, useState } from "react";
import CustomSnackBar from "./components/CustomSnackBar";

interface snackBarInterface {
    isShown: boolean;
    message: string;
    status: string;
}
export const LayoutsContext: any = createContext<any>(null);
export default function LayoutsProviders({ children }) {
    const [snackBar, setSnackBar] = useState<snackBarInterface>({
        isShown: false,
        message: "",
        status: "",
    });

    const ctx = {
        snackBar,
        setSnackBar,
    };
    return (
        <LayoutsContext.Provider value={ctx}>
            {snackBar.isShown && (
                <CustomSnackBar
                    snack={snackBar}
                    setSnackBar={(val) => setSnackBar({ ...val })}
                />
            )}
            {children}
        </LayoutsContext.Provider>
    );
}
