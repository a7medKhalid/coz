import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import LoopObject from "../../helpers/LoopObject";
import { TextField } from "@mui/material";

export default function Dashboard(props) {
    const auth = props.auth.user;

    Dashboard.layout = (page) => (
        <DashboardLayout auth={auth} children={page} />
    );
    return (
        <>
            <div>s</div>
        </>
    );
}
