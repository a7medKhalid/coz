// this is componenet to wrap layouts.. to add shared config

import React from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

export default function LayoutsProviders({ children }) {
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
    });

    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
