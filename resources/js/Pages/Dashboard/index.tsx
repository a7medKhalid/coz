import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import LoopObject from "../../helpers/LoopObject";

export default function Dashboard(props) {
    // const auth = props.auth.user;

    return (
        <>
            <div>s</div>
        </>
    );
}
Dashboard.layout = (page) => <DashboardLayout children={page} />;
