// this is componenet to wrap layouts.. to add shared config

import React from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";

export default function LayoutsProviders({ children }) {
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
    });
    const themeLight = createTheme({
        typography: {
            fontFamily: "Noto Sans Arabic, sans-serif",
        },
        palette: {
            background: {
                default: "#f3f4f6",
            },
        },
    });
    return (
        <ThemeProvider theme={themeLight}>
            <CacheProvider value={cacheRtl}>{children}</CacheProvider>
        </ThemeProvider>
    );
}
