import React, { useContext, useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Alert, Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import AddBranch from "./components/AddBranch";

const Branches = (props) => {
    // const {} = useLoadScript()

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    return (
        <Wrapper
            apiKey={"AIzaSyDHqnCUbpApAczIlH7VrOdw4tU8SNpi5l8"}
            render={render}
        >
            <Head title="Dashboard" />
            <div dir="rtl">
                <AddBranch />
            </div>
        </Wrapper>
    );
};

export default Branches;
Branches.layout = (page) => <DashboardLayout children={page} />;
