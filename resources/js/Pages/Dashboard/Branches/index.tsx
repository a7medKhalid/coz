import React, { useContext, useEffect } from "react";
import { Head, InertiaLink, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import AddBranch from "./Add";
import { branchType, employeeType } from "../../../helpers/types";
import Table from "./components/Table";
import CustomLink from "../../../components/CustomLink";

const Branches = (props) => {
    // const {} = useLoadScript()
    console.log({ props });

    return (
        <>
            <Head title="Dashboard" />
            <div dir="rtl">
                <CustomLink to="viewAddBranch" text="اضافة فرع" />
                <Table employees={props.employees} branches={props.branches} />
                {/* <AddBranch /> */}
            </div>
        </>
    );
};

export default Branches;
Branches.layout = (page) => <DashboardLayout children={page} />;
