// this is componenet to wrap layouts.. to add shared config

import React, { createContext, useContext, useState } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { Alert, createTheme, Snackbar, ThemeProvider } from "@mui/material";
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
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
    });
    const themeLight = createTheme({
        typography: {
            fontFamily: "cairo, sans-serif",
        },
        palette: {
            background: {
                default: "#f3f4f6",
            },
        },
    });
    const ctx = {
        snackBar,
        setSnackBar,
    };
    return (
        <ThemeProvider theme={themeLight}>
            <LayoutsContext.Provider value={ctx}>
                {snackBar.isShown && (
                    <CustomSnackBar
                        snack={snackBar}
                        setSnackBar={(val) => setSnackBar({ ...val })}
                    />
                )}

                <CacheProvider value={cacheRtl}>{children}</CacheProvider>
            </LayoutsContext.Provider>
        </ThemeProvider>
    );
}
