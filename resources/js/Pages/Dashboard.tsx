import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "../Layouts/DashboardLayout";
import LoopObject from "../helpers/LoopObject";
import { TextField } from "@mui/material";
import Branch from "./Branch";

export default function Dashboard(props) {
    const auth = props.auth.user;

    return (
        <>
            <Branch />
        </>
    );
}
Dashboard.layout = (page) => <DashboardLayout children={page} />;
