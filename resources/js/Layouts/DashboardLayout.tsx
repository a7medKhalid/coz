import { Link, usePage } from "@inertiajs/inertia-react";
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import route from "../../../vendor/tightenco/ziggy/src/js";
import LayoutsProviders from "./LayoutsProviders";
import { MAP_ROUTE_TO_ICON } from "../assets/consts";

interface props {
    children: any;
}

interface routes {
    title: string;
    link: any;
    icon: any;
}
const DashboardLayout: React.FC<props> = ({ children }) => {
    const allowedDashboardPagesProps = children.props.allowedDashboardPages;

    const allowedDashboardPages: routes[] = allowedDashboardPagesProps.map(
        (item: any) => {
            return {
                title: item,
                link: route(item),
                icon: "test",
            };
        }
    );
    const drawerWidth = 240;

    const postRoutes = [
        {
            title: "logout",
            link: "logout",
            icon: <LogoutIcon />,
        },
    ];
    const locationPathName = location.pathname.split("/");
    const curRouteName = locationPathName[locationPathName.length - 1];

    return (
        <LayoutsProviders>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${drawerWidth}px)`,
                        ml: `${drawerWidth}px`,
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" noWrap component="div">
                            لوحة تحكم كوز
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
                >
                    <Toolbar />
                    {children}
                </Box>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Avatar src="../assets/images/appLogo.png" />
                    <Divider />
                    <List>
                        {allowedDashboardPages.map((route) => (
                            <Link
                                as="ListItem"
                                href={route.link}
                                key={route.title}
                                selected={route.title === curRouteName}
                            >
                                <ListItemButton
                                    sx={{
                                        direction: "ltr",
                                    }}
                                >
                                    <ListItemIcon>{route.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={route.title}
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    />
                                </ListItemButton>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {postRoutes.map((route) => (
                            <Link
                                as="ListItem"
                                href={route.link}
                                key={route.title}
                                method="post"
                            >
                                <ListItemButton
                                    sx={{
                                        direction: "ltr",
                                    }}
                                >
                                    <ListItemIcon>{route.icon}</ListItemIcon>

                                    <ListItemText
                                        primary={route.title}
                                        sx={{
                                            textAlign: "left",
                                        }}
                                    />
                                </ListItemButton>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </LayoutsProviders>
    );
};

export default DashboardLayout;
