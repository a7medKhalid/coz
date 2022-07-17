import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    useGridApiContext,
} from "@mui/x-data-grid";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    TextField,
} from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";
import LoadingButton from "@mui/lab/LoadingButton";
import ValidationErrors from "../../../Components/ValidationErrors";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import { Inertia } from "@inertiajs/inertia";

const Employees = (props) => {
    const employees = props.employees.data;
    const branches = props.branches;
    // const auth = props.auth.user;
    const { snackBar, setSnackBar } = useContext(LayoutsContext);
    const noButtonRef = React.useRef<HTMLButtonElement>(null);

    const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
    const [branch, setBranch] = useState({});
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
    function SelectEditInputCell(props: GridRenderCellParams) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();
        const handleChange = async (event: SelectChangeEvent) => {
            const branch = branches.filter((v) => v.id == event.target.value);
            setBranch(branch[0]);
            await apiRef.current.setEditCellValue({
                id,
                field,
                value: branch[0].name,
            });

            apiRef.current.stopCellEditMode({ id, field });
        };

        return (
            <Select
                value={value}
                onChange={handleChange}
                size="small"
                sx={{ height: 1, width: "100%" }}
                native
                autoFocus
            >
                <option>---</option>
                {/* <option value={-1}>غير موظف</option> */}
                {branches.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    );
                })}
            </Select>
        );
    }
    function CheckBoxEditCell(props: GridRenderCellParams) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();
        const handleChange = async (event: SelectChangeEvent) => {
            await apiRef.current.setEditCellValue({
                id,
                field,
                value: event.target.value,
            });

            apiRef.current.stopCellEditMode({ id, field });
        };

        return <Checkbox checked={value} onChange={handleChange} />;
    }
    const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
        return <SelectEditInputCell {...params} />;
    };
    const renderCheckBoxEditCell: GridColDef["renderCell"] = (params) => {
        return <CheckBoxEditCell {...params} />;
    };
    const columns: GridColDef[] = [
        { field: "id", headerName: "رقم المعرف", width: 90 },
        { field: "name", headerName: "الإسم", width: 130 },
        { field: "email", headerName: "الإيميل", width: 200 },
        {
            field: "branch",
            headerName: "الفرع الموظف فيه",
            width: 200,
            editable: true,
            renderEditCell: renderSelectEditInputCell,
        },
        {
            field: "assignProductManager",
            headerName: "تعيين كمدخل منتجات",
            width: 200,
            editable: true,
            renderEditCell: renderCheckBoxEditCell,
        },
    ];

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        post(
            route("assignBranchRoleToEmployee", {
                employee_id: newRow.id,
                branch_id: branch.id,
            }),
            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم تحديث الفرع بنجاح",
                        status: "success",
                    });
                    resolve(newRow);
                    setPromiseArguments(null);
                },
            }
        );
    };
    function computeMutation(newRow, oldRow) {
        if (newRow.branch !== oldRow.branch) {
            return `فرع الموظف من '${
                oldRow?.branch ? oldRow?.branch : "غير موظف"
            }' الى '${newRow.branch}'`;
        }
        if (newRow.assignProductManager !== oldRow.assignProductManager) {
            return `تعيين كمدير مخزن '${newRow.name || ""}`;
        }
        return null;
    }
    const processRowUpdate = React.useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        []
    );
    const handleEntered = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
    };
    const renderConfirmDialog = () => {
        console.log({ promiseArguments });

        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);
        return (
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: handleEntered }}
                open={!!promiseArguments}
            >
                <DialogTitle>
                    {`'${newRow.name}'`} هل أنت متأكد من تحديث
                </DialogTitle>
                <DialogContent dividers>
                    {`بالضغط على نعم سيتم تغير ${mutation}.`}
                </DialogContent>
                <DialogActions>
                    <Button ref={noButtonRef} onClick={handleNo}>
                        لا
                    </Button>
                    <Button onClick={handleYes}>نعم</Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <div dir="rtl">
            <Button id="sendInvite" variant="text" onClick={handleClickOpen}>
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
                            <Button id="cancel" onClick={handleClose}>
                                اغلاق
                            </Button>
                            <LoadingButton
                                id="send"
                                type="submit"
                                loading={processing}
                            >
                                ارسال
                            </LoadingButton>
                        </DialogActions>
                    </Box>
                </div>
            </Dialog>
            {renderConfirmDialog()}
            <Box sx={{ height: "80vh" }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    sx={{ backgroundColor: "white" }}
                    rowsPerPageOptions={[5]}
                    processRowUpdate={processRowUpdate}
                    hideFooter
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
    );
};

Employees.layout = (page: any) => <DashboardLayout children={page} />;
export default Employees;
