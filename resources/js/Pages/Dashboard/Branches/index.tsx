import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "../../../Layouts/DashboardLayout";
const Branches = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    // const {} = useLoadScript()
    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    const center = {
        lat: -3.745,
        lng: -38.523,
    };

    return (
        <>
            <Head title="Dashboard" />
            <div dir="rtl">
                <Grid container>
                    <Grid xs>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="branch title"
                            name="title"
                            // autoComplete="email"
                            autoFocus
                            onChange={onHandleChange}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mt: 2 }}
                        >
                            اضافة
                        </Button>
                    </Grid>
                    <Grid item md={8} sx={{ ml: 2 }}>
                        <Box
                            sx={{
                                // width: "100%",
                                height: "85vh",
                                backgroundColor: "gray",
                            }}
                        >
                            s
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
Branches.layout = (page) => <DashboardLayout children={page} />;

export default Branches;
