// export * from "./dashboard";

import {
    ArchiveIcon,
    CogIcon,
    CubeIcon,
    HomeIcon,
    PersonGroupIcon,
    TagIcon,
} from "../icons/heroIcons";
import React from "react";
export const MAP_ROUTE_TO_ICON = {
    dashboard: <HomeIcon />,
    branches: <CubeIcon />,
    employees: <PersonGroupIcon />,
    products: <ArchiveIcon />,
    inventory: <CubeIcon />,
    promocodes: <TagIcon className={""} />,
    customers: <PersonGroupIcon />,
    settings: <CogIcon className={""} />,
};

export const MAP_ROUTE_TO_AR_NAME = {
    dashboard: "الرئيسية",
    branches: "ادارة الفروع",
    employees: "ادارة الموظفين",
    products: "ادارة المنتجات",
    inventory: "ادارة المخرون",
    promocodes: "ادارة الخصومات",
    customers: "عرض العملاء",
    settings: "الاعدادات",
};
