import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Box, Grid, TextField } from "@mui/material";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const Branch = () => {
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
        height: "80vh",
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
                    </Grid>
                    <Grid item md={8}>
                        <Box
                            sx={{
                                // width: "100%",
                                height: "90vh",
                                backgroundColor: "red",
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

export default Branch;
