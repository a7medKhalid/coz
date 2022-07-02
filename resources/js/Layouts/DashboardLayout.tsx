import { InertiaLink, Link } from "@inertiajs/inertia-react";
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
interface props {
    children: React.ReactNode;
}
const DashboardLayout: React.FC<props> = ({ children }) => {
    const drawerWidth = 240;
    const getRoutes = [
        {
            title: "branches",
            link: route("logout"),
            icon: <LogoutIcon />,
        },
        {
            title: "branches",
            link: route("logout"),
            icon: <LogoutIcon />,
        },
        {
            title: "branches",
            link: route("logout"),
            icon: <LogoutIcon />,
        },
    ];
    const postRoutes = [
        {
            title: "logout",
            link: route("logout"),
            icon: <LogoutIcon />,
        },
    ];
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    mr: `${drawerWidth}px`,
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
                anchor="right"
            >
                <Toolbar />
                <Avatar src="../assets/images/appLogo.png" />
                <Divider />
                <List>
                    {getRoutes.map((route, index) => (
                        <InertiaLink
                            as="ListItem"
                            href={route.link}
                            key={route.title}
                        >
                            <ListItemButton
                                sx={{
                                    direction: "rtl",
                                }}
                            >
                                <ListItemIcon>{route.icon}</ListItemIcon>
                                <ListItemText
                                    primary={route.title}
                                    sx={{
                                        textAlign: "right",
                                    }}
                                />
                            </ListItemButton>
                        </InertiaLink>
                    ))}
                </List>
                <Divider />
                <List>
                    {postRoutes.map((route, index) => (
                        <InertiaLink
                            as="ListItem"
                            href={route.link}
                            key={route.title}
                            method="post"
                        >
                            <ListItemButton
                                sx={{
                                    direction: "rtl",
                                }}
                            >
                                <ListItemIcon>{route.icon}</ListItemIcon>
                                <ListItemText
                                    primary={route.title}
                                    sx={{
                                        textAlign: "right",
                                    }}
                                />
                            </ListItemButton>
                        </InertiaLink>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default DashboardLayout;
