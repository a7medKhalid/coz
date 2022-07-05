import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { blueGrey, deepOrange } from "@mui/material/colors";
import React from "react";
import logo from "../../../assets/images/appLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@inertiajs/inertia-react";

const CustomAppBar = ({ drawerWidth }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: "background.default",
                    width: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            fontWeight={"bold"}
                            color={blueGrey[800]}
                            noWrap
                            component="span"
                        >
                            {/* {auth.name} مرحبا */}
                        </Typography>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    fontSize: 13,
                                    width: 32,
                                    height: 32,
                                    bgcolor: deepOrange[400],
                                }}
                            >
                                FH
                            </Avatar>
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h6"
                            color={blueGrey[800]}
                            noWrap
                            component="div"
                            fontWeight={"bold"}
                        >
                            لوحة تحكم كوز
                        </Typography>
                        <Avatar src={logo} alt="logo" sx={{ mr: 2 }} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem sx={{ textAlign: "right" }}>حسابي</MenuItem>
                <Divider />

                <MenuItem sx={{ direction: "ltr" }}>
                    <Link href={route("logout")} method="post" as="div">
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        تسجيل الخروج
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
};
export default CustomAppBar;
