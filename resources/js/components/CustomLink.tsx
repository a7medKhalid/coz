import { InertiaLink } from "@inertiajs/inertia-react";
import { Box } from "@mui/material";
import React from "react";

export default function CustomLink({ to, text }) {
    return (
        <Box sx={{ mb: 2 }}>
            <InertiaLink href={route(to)}>{text}</InertiaLink>
        </Box>
    );
}
