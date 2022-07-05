import React, { useState } from "react";
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

const columns: GridColDef[] = [
    { field: "id", headerName: "رقم المعرف", width: 80 },
    { field: "name", headerName: "الإسم", width: 130 },
    { field: "email", headerName: "الإيميل", width: 150 },
    { field: "branchName", headerName: "اسم الفرع", width: 200 },
];

const Employees = (props) => {
    console.log({ props });

    const auth = props.auth.user;
    Employees.layout = (page: any) => (
        <DashboardLayout children={page} auth={auth} />
    );

    const [openModal, setOpenModal] = React.useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
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
                setOnSuccess(true);
                handleClose();
            },
        });
    };
    return (
        <div dir="rtl">
            <Snackbar
                open={onSuccess}
                autoHideDuration={3000}
                onClose={() => setOnSuccess(false)}
            >
                <Alert
                    severity="success"
                    sx={{ width: "100%" }}
                    onClose={() => setOnSuccess(false)}
                >
                    تم ارسال الدعوة بنجاح
                </Alert>
            </Snackbar>
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
                    rows={data}
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
