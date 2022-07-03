import React from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
    { field: "id", headerName: "رقم المعرف", width: 80 },
    { field: "name", headerName: "الإسم", width: 130 },
    { field: "email", headerName: "الإيميل", width: 150 },
    { field: "branchName", headerName: "اسم الفرع", width: 200 },
];
const data = [
    {
        id: 1,
        name: "faisal haddad",
        email: "faisal@test.com",
        branchName: "jeddah, prince sultan road",
    },
];
const Employees = () => {
    return (
        <div dir="rtl">
            <Box sx={{ height: "80vh" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    hideFooter
                />
            </Box>
        </div>
    );
};
Employees.layout = (page: any) => <DashboardLayout children={page} />;

export default Employees;
