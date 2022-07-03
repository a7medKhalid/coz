import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import LoopObject from "../../helpers/LoopObject";
import { TextField } from "@mui/material";

export default function Dashboard(props) {
    const auth = props.auth.user;

    return (
        <>
            <div>s</div>
        </>
    );
}
Dashboard.layout = (page) => <DashboardLayout children={page} />;
