import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapWrapper from "./components/MapWrapper";

const Branches = (props) => {
    const { setData, post } = useForm({
        name: "",
    });
    // const auth = props.auth.user;

    const onHandleChange = (event: any) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route("login"));
    // };

    // const {} = useLoadScript()
    const render = (status: Status) => {
        return <h1>asd</h1>;
    };
    return (
        <Wrapper
            apiKey={"AIzaSyDHqnCUbpApAczIlH7VrOdw4tU8SNpi5l8"}
            render={render}
        >
            <Head title="Dashboard" />
            <div dir="rtl">
                <Grid container>
                    <Grid item xs>
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
                    <Grid item md={8} sx={{ ml: 2, height: "80vh" }}>
                        <MapWrapper />
                    </Grid>
                </Grid>
            </div>
        </Wrapper>
    );
};

export default Branches;
Branches.layout = (page) => <DashboardLayout children={page} />;
