import { Link } from "@inertiajs/inertia-react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import {
    MAP_ROUTE_TO_AR_NAME,
    MAP_ROUTE_TO_ICON,
} from "../../../assets/consts";
interface routes {
    title: string;
    link: any;
    icon: any;
}
const CustomDrawer = ({ allowedDashboardPagesProps, drawerWidth }) => {
    const locationPathName = location.pathname.split("/");

    const curRouteName = locationPathName[locationPathName.length - 1];

    const allowedDashboardPages: routes[] = allowedDashboardPagesProps.map(
        (item: any) => {
            return {
                title: item,
                link: route(item),
                icon: MAP_ROUTE_TO_ICON[item],
            };
        }
    );

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "background.default",
                    borderColor: blueGrey[50],
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            {/* <Divider sx={{ backgroundColor: "#f9f9f9" }} /> */}
            <List>
                {allowedDashboardPages.map((route) => (
                    <Link
                        as="div"
                        href={route.link}
                        key={route.title}
                        // selected={route.title === curRouteName}
                    >
                        <ListItemButton
                            sx={{
                                direction: "ltr",
                            }}
                        >
                            <ListItemIcon>{route.icon}</ListItemIcon>
                            <ListItemText>
                                {MAP_ROUTE_TO_AR_NAME[route.title]}
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
};
export default CustomDrawer;
