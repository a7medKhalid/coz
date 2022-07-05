import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField,
} from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";
import LoadingButton from "@mui/lab/LoadingButton";
import ValidationErrors from "../../../Components/ValidationErrors";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const columns: GridColDef[] = [
    { field: "id", headerName: "رقم المعرف", width: 90 },
    { field: "name", headerName: "الإسم", width: 130 },
    { field: "email", headerName: "الإيميل", width: 240 },
    { field: "branchName", headerName: "اسم الفرع", width: 200 },
];

const Employees = (props) => {
    console.log({ props });
    const employees = props.employees.data;
    // const auth = props.auth.user;
    const { snackBar, setSnackBar } = useContext(LayoutsContext);

    const [openModal, setOpenModal] = React.useState(false);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            email: "",
        });
    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };
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
        // clearErrors();
        post(route("inviteEmployee"), {
            onSuccess: () => {
                setSnackBar({
                    isShown: true,
                    message: "تم إرسال دعوة بنجاح",
                    status: "success",
                });
                handleClose();
            },
        });
    };
    return (
        <div dir="rtl">
            <Button variant="text" onClick={handleClickOpen}>
                ارسال دعوة
            </Button>
            <Dialog open={openModal} onClose={handleClose}>
                <div dir="rtl">
                    <Box component="form" onSubmit={submit} noValidate>
                        <DialogTitle>ارسال دعوة</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                لكي يمكنك إضافة موظف، لابد أولا أن ترسل له دعوة،
                                اذا وافق عليها سيظهر في قاعدة البيانات بالأسفل
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                name="email"
                                label="الإيميل"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={onHandleChange}
                            />
                            <ValidationErrors errors={errors} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>اغلاق</Button>
                            <LoadingButton type="submit" loading={processing}>
                                ارسال
                            </LoadingButton>
                        </DialogActions>
                    </Box>
                </div>
            </Dialog>
            <Box sx={{ height: "80vh" }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    sx={{ backgroundColor: "white" }}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    hideFooter
                />
            </Box>
        </div>
    );
};

export default Employees;
Employees.layout = (page: any) => <DashboardLayout children={page} />;
