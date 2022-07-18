// export * from "./dashboard";

import {
    ArchiveIcon,
    CubeIcon,
    HomeIcon,
    PersonGroupIcon,
} from "../icons/heroIcons";
import React from "react";
export const MAP_ROUTE_TO_ICON = {
    dashboard: <HomeIcon />,
    branches: <CubeIcon />,
    employees: <PersonGroupIcon />,
    products: <ArchiveIcon />,
};

export const MAP_ROUTE_TO_AR_NAME = {
    dashboard: "الرئيسية",
    branches: "ادارة الفروع",
    employees: "ادارة الموظفين",
    products: "ادارة المنتجات",
};
