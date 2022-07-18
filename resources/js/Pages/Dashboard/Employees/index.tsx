import React from "react";
import { branchType, employeeType } from "../../../helpers/types";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Dropdown from "../../../Components/Dropdown";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";

const Employees = (props) => {
    console.log("rr", props);

    const employees = props.employees.data;
    const branches = props.branches;

    if (employees.length < 1) {
        return (
            <div className="h-screen flex items-center justify-center">
                لا يوجد لديك موظفين، لإضافة موظف إضغط على
                <InertiaLink
                    href={route("viewAddBranch")}
                    className={"text-primary underline mx-1"}
                >
                    إضافة فرع
                </InertiaLink>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rtl relative bg-white shadow-xl border border-gray-200 min-h-screen rounded-xl mt-5">
            <table className="w-full  text-sm  text-gray-500 text-right ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            رقم الموظف
                        </th>
                        <th scope="col" className="py-3 px-6">
                            الموظف
                        </th>
                        <th scope="col" className="py-3 px-6">
                            الإيميل
                        </th>
                        <th scope="col" className="py-3 px-6">
                            الفرع الموظف فيه
                        </th>
                        <th scope="col" className="py-3 px-6">
                            تعيين كمدخل منتجات
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((item) => {
                        return (
                            <tr className="bg-white border-b  " key={item.id}>
                                <td
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {item.id}
                                </td>
                                <td className="py-4 px-6">{item.name}</td>
                                <td className="py-4 px-6">{item.email}</td>
                                <td className="py-4 px-6">
                                    {item.branch ? (
                                        item.branch
                                    ) : (
                                        <AssignToBranch
                                            branches={branches}
                                            item={item}
                                        />
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <AssignAsProductManager item={item} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const AssignToBranch = ({ branches, item }) => {
    const { setSnackBar } = React.useContext(LayoutsContext);
    const { data, setData, post, processing, errors, reset } = useForm({});
    const addBranch = (branch) => {
        post(
            route("assignBranchRoleToEmployee", {
                employee_id: item.id,
                branch_id: branch.id,
            }),
            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم تحديث الفرع بنجاح",
                        status: "success",
                    });
                },
                onError: () => {
                    setSnackBar({
                        isShown: true,
                        message: "حصل خطأ",
                        status: "error",
                    });
                },
            }
        );
    };
    // const [manager, setManager] = React.useState(null);
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        اختيار الفرع
                        <svg
                            className="ml-2 -mr-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
                {branches.map((branch) => {
                    return (
                        <Dropdown.Item
                            key={branch.id}
                            onClick={() => addBranch(branch)}
                        >
                            {branch.name}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Content>
        </Dropdown>
    );
};

const AssignAsProductManager = ({ item }) => {
    const { setSnackBar } = React.useContext(LayoutsContext);
    const { data, setData, post, processing, errors, reset } = useForm({});
    const onHandleChange = (event) => {
        post(
            route("assignProductManagerRoleToEmployee", {
                employee_id: item.id,
            }),
            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم تحديث الفرع بنجاح",
                        status: "success",
                    });
                },
            }
        );
    };
    // const [manager, setManager] = React.useState(null);
    return (
        <input
            type="checkbox"
            name="isProductManager"
            checked={item.isProductManager}
            onChange={onHandleChange}
        />
    );
};

Employees.layout = (page) => <DashboardLayout children={page} />;

// const Employees = (props) => {
//     const employees = props.employees.data;
//     const branches = props.branches;
//     // const auth = props.auth.user;
//     const { snackBar, setSnackBar } = useContext(LayoutsContext);
//     const noButtonRef = React.useRef<HTMLButtonElement>(null);

//     const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
//     const [branch, setBranch] = useState({});
//     const [openModal, setOpenModal] = React.useState(false);
//     const { data, setData, post, processing, errors, reset, clearErrors } =
//         useForm({
//             email: "",
//         });
//     const handleClickOpen = () => {
//         setOpenModal(true);
//     };

//     const handleClose = () => {
//         setOpenModal(false);
//     };
//     const onHandleChange = (event) => {
//         setData(
//             event.target.name,
//             event.target.type === "checkbox"
//                 ? event.target.checked
//                 : event.target.value
//         );
//     };

//     const submit = (e) => {
//         e.preventDefault();
//         // clearErrors();
//         post(route("inviteEmployee"), {
//             onSuccess: () => {
//                 setSnackBar({
//                     isShown: true,
//                     message: "تم إرسال دعوة بنجاح",
//                     status: "success",
//                 });
//                 handleClose();
//             },
//         });
//     };
//     function SelectEditInputCell(props: GridRenderCellParams) {
//         const { id, value, field } = props;
//         const apiRef = useGridApiContext();
//         const handleChange = async (event: SelectChangeEvent) => {
//             const branch = branches.filter((v) => v.id == event.target.value);
//             setBranch(branch[0]);
//             await apiRef.current.setEditCellValue({
//                 id,
//                 field,
//                 value: branch[0].name,
//             });

//             apiRef.current.stopCellEditMode({ id, field });
//         };

//         return (
//             <Select
//                 value={value}
//                 onChange={handleChange}
//                 size="small"
//                 sx={{ height: 1, width: "100%" }}
//                 native
//                 autoFocus
//             >
//                 <option>---</option>
//                 {/* <option value={-1}>غير موظف</option> */}
//                 {branches.map((item) => {
//                     return (
//                         <option key={item.id} value={item.id}>
//                             {item.name}
//                         </option>
//                     );
//                 })}
//             </Select>
//         );
//     }
//     function CheckBoxEditCell(props: GridRenderCellParams) {
//         const { id, value, field } = props;
//         const apiRef = useGridApiContext();
//         const handleChange = async (event: SelectChangeEvent) => {
//             await apiRef.current.setEditCellValue({
//                 id,
//                 field,
//                 value: event.target.value,
//             });

//             apiRef.current.stopCellEditMode({ id, field });
//         };

//         return <Checkbox checked={value} onChange={handleChange} />;
//     }
//     const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
//         return <SelectEditInputCell {...params} />;
//     };
//     const renderCheckBoxEditCell: GridColDef["renderCell"] = (params) => {
//         return <CheckBoxEditCell {...params} />;
//     };
//     const columns: GridColDef[] = [
//         { field: "id", headerName: "رقم المعرف", width: 90 },
//         { field: "name", headerName: "الإسم", width: 130 },
//         { field: "email", headerName: "الإيميل", width: 200 },
//         {
//             field: "branch",
//             headerName: "الفرع الموظف فيه",
//             width: 200,
//             editable: true,
//             renderEditCell: renderSelectEditInputCell,
//         },
//         {
//             field: "isProductManager",
//             headerName: "تعيين كمدخل منتجات",
//             width: 200,
//             editable: true,
//             renderEditCell: renderCheckBoxEditCell,
//         },
//     ];

//     const handleNo = () => {
//         const { oldRow, resolve } = promiseArguments;
//         resolve(oldRow); // Resolve with the old row to not update the internal state
//         setPromiseArguments(null);
//     };

//     const handleYes = async () => {
//         const { newRow, oldRow, reject, resolve } = promiseArguments;

//         post(
//             route(
//                 newRow.isProductManager
//                     ? "assignProductManagerRoleToEmployee"
//                     : "assignBranchRoleToEmployee",
//                 {
//                     employee_id: newRow.id,
//                     branch_id: branch.id,
//                 }
//             ),
//             {
//                 onSuccess: () => {
//                     setSnackBar({
//                         isShown: true,
//                         message: "تم تحديث الفرع بنجاح",
//                         status: "success",
//                     });
//                     resolve(newRow);
//                     setPromiseArguments(null);
//                 },
//             }
//         );
//     };
//     function computeMutation(newRow, oldRow) {
//         if (newRow.branch !== oldRow.branch) {
//             return `بالضغظ على نعم سيتم فرع الموظف'${
//                 oldRow?.branch ? oldRow?.branch : "غير موظف"
//             }' الى '${newRow.branch}'`;
//         }
//         if (newRow.isProductManager !== oldRow.isProductManager) {
//             return ` ${
//                 newRow.name || ""
//             } بالضغظ على نعم سيتم تعيين كمدير مخزن `;
//         }
//         return null;
//     }
//     const processRowUpdate = React.useCallback(
//         (newRow, oldRow) =>
//             new Promise((resolve, reject) => {
//                 const mutation = computeMutation(newRow, oldRow);
//                 if (mutation) {
//                     // Save the arguments to resolve or reject the promise later
//                     setPromiseArguments({ resolve, reject, newRow, oldRow });
//                 } else {
//                     resolve(oldRow); // Nothing was changed
//                 }
//             }),
//         []
//     );
//     const handleEntered = () => {
//         // The `autoFocus` is not used because, if used, the same Enter that saves
//         // the cell triggers "No". Instead, we manually focus the "No" button once
//         // the dialog is fully open.
//         // noButtonRef.current?.focus();
//     };
//     const renderConfirmDialog = () => {
//         console.log({ promiseArguments });

//         if (!promiseArguments) {
//             return null;
//         }

//         const { newRow, oldRow } = promiseArguments;
//         const mutation = computeMutation(newRow, oldRow);
//         return (
//             <Dialog
//                 maxWidth="xs"
//                 TransitionProps={{ onEntered: handleEntered }}
//                 open={!!promiseArguments}
//             >
//                 <DialogTitle>
//                     {`'${newRow.name}'`} هل أنت متأكد من تحديث
//                 </DialogTitle>
//                 <DialogContent dividers>{`${mutation}.`}</DialogContent>
//                 <DialogActions>
//                     <Button ref={noButtonRef} onClick={handleNo}>
//                         لا
//                     </Button>
//                     <Button onClick={handleYes}>نعم</Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     };

//     return (
//         <div dir="rtl">
//             <Button id="sendInvite" variant="text" onClick={handleClickOpen}>
//                 ارسال دعوة
//             </Button>
//             <Dialog open={openModal} onClose={handleClose}>
//                 <div dir="rtl">
//                     <Box component="form" onSubmit={submit} noValidate>
//                         <DialogTitle>ارسال دعوة</DialogTitle>
//                         <DialogContent>
//                             <DialogContentText>
//                                 لكي يمكنك إضافة موظف، لابد أولا أن ترسل له دعوة،
//                                 اذا وافق عليها سيظهر في قاعدة البيانات بالأسفل
//                             </DialogContentText>
//                             <TextField
//                                 autoFocus
//                                 margin="dense"
//                                 id="email"
//                                 name="email"
//                                 label="الإيميل"
//                                 type="email"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={onHandleChange}
//                             />
//                             <ValidationErrors errors={errors} />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button id="cancel" onClick={handleClose}>
//                                 اغلاق
//                             </Button>
//                             <LoadingButton
//                                 id="send"
//                                 type="submit"
//                                 loading={processing}
//                             >
//                                 ارسال
//                             </LoadingButton>
//                         </DialogActions>
//                     </Box>
//                 </div>
//             </Dialog>
//             {renderConfirmDialog()}
//             <Box sx={{ height: "80vh" }}>
//                 <DataGrid
//                     rows={employees}
//                     columns={columns}
//                     pageSize={5}
//                     sx={{ backgroundColor: "white" }}
//                     rowsPerPageOptions={[5]}
//                     processRowUpdate={processRowUpdate}
//                     hideFooter
//                     experimentalFeatures={{ newEditingApi: true }}
//                 />
//             </Box>
//         </div>
//     );
// };

// Employees.layout = (page: any) => <DashboardLayout children={page} />;
export default Employees;
