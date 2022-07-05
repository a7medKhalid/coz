import { Box, Container } from "@mui/material";
import React from "react";

export default function AuthLayout({ children }) {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {children}
            </Box>
        </Container>
    );
}
