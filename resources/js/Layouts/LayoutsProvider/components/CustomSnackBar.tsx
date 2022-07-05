import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomSnackBar = ({ snack, setSnackBar }) => {
    return (
        <Snackbar
            open={snack.isShown}
            autoHideDuration={3000}
            onClose={() => setSnackBar({ ...snack, isShown: false })}
        >
            <Alert
                severity={snack.status}
                sx={{ width: "100%" }}
                onClose={() => setSnackBar({ ...snack, isShown: false })}
            >
                {snack.message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;
