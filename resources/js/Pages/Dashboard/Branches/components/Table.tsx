import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    useGridApiContext,
} from "@mui/x-data-grid";
import React from "react";
import { branchType, employeeType } from "../../../../helpers/types";
import { LayoutsContext } from "../../../../Layouts/LayoutsProvider";
import { useForm } from "@inertiajs/inertia-react";

interface props {
    employees: employeeType[];
    branches: branchType[];
}
const Table: React.FC<props> = ({ employees, branches }) => {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({});

    const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
    const [employee, setEmployee] = React.useState<any>(null);
    const noButtonRef = React.useRef<HTMLButtonElement>(null);
    const { snackBar, setSnackBar } = React.useContext(LayoutsContext);

    function computeMutation(newRow, oldRow) {
        if (newRow.user_id !== oldRow.user_id) {
            return `
          ${newRow.name} كمدير فرع ل ${newRow.user_id} سيتم تعيين 
            `;
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
    function SelectEditInputCell(props: GridRenderCellParams) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();
        const handleChange = async (event: SelectChangeEvent) => {
            const employee = employees.filter(
                (v) => v.id === +event.target.value
            );
            setEmployee(employee[0]);
            await apiRef.current.setEditCellValue({
                id,
                field,
                value: employee[0].name,
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
                {employees.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    );
                })}
            </Select>
        );
    }
    const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
        return <SelectEditInputCell {...params} />;
    };
    const columns: GridColDef[] = [
        { field: "id", headerName: "رقم المعرف", width: 90 },
        { field: "name", headerName: "اسم الفرع", width: 130 },
        {
            field: "user_id",
            headerName: "مدير الفرع",
            width: 200,
            renderEditCell: renderSelectEditInputCell,
            editable: true,
        },
    ];
    const handleEntered = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
    };

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;
        console.log({ newRow });

        post(
            route("updateBranch", {
                user_id: employee.id,
                branch_id: newRow.id,
                name: newRow.name,
                latitude: newRow.latitude,
                longitude: newRow.longitude,
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
                <DialogContent dividers>{`${mutation}`}</DialogContent>
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
        <Box sx={{ height: "80vh" }}>
            {renderConfirmDialog()}

            <DataGrid
                rows={branches}
                columns={columns}
                hideFooter
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
};
export default Table;
