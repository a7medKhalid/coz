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
                <CustomLink to="viewAddBranch" text="اضافة فرع" />
                <Table employees={props.employees} branches={props.branches} />
                {/* <AddBranch /> */}
            </div>
        </Wrapper>
    );
};

export default Branches;
Branches.layout = (page) => <DashboardLayout children={page} />;
