import { Box, CssBaseline, Paper, Toolbar } from "@mui/material";
import React from "react";

import LayoutsProviders from "../LayoutsProviders";
import CustomDrawer from "./components/CustomDrawer";
import CustomAppBar from "./components/CustomAppBar";

interface props {
    children: any;
    auth: any;
}

const DashboardLayout: React.FC<props> = ({ auth, children }) => {
    const allowedDashboardPagesProps = children.props.allowedDashboardPages;

    const drawerWidth = 240;

    return (
        <LayoutsProviders>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <CustomAppBar auth={auth} drawerWidth={drawerWidth} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
                >
                    <Toolbar />
                    <Paper
                        sx={{
                            bgcolor: "white",
                            minHeight: "90vh",
                            borderRadius: 5,
                            p: 3,
                            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.07)",
                        }}
                    >
                        {children}
                    </Paper>
                </Box>
                <CustomDrawer
                    allowedDashboardPagesProps={allowedDashboardPagesProps}
                    drawerWidth={drawerWidth}
                />
            </Box>
        </LayoutsProviders>
    );
};

export default DashboardLayout;
