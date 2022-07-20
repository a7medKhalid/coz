import React, { useContext } from "react";
import { branchType, employeeType } from "../../../helpers/types";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Dropdown from "../../../Components/Dropdown";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import CustomModal, {
    CustomModalContext,
} from "../../../components/CustomModal";
import Button from "../../../components/Button";
import ValidationErrors from "../../../Components/ValidationErrors";
import Label from "../../../components/Label";
import Input from "../../../components/Input";

const Employees = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const employees = props.employees.data;
    const branches = props.branches;

    if (employees.length < 1) {
        return (
            <div className="h-screen flex items-center justify-center">
                <SendInvite />
                <div className="mx-1"></div>
                لا يوجد لديك موظفين، لإضافة موظف إضغط على
            </div>
        );
    }

    return (
        <>
            <SendInvite />
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
                                <tr
                                    className="bg-white border-b  "
                                    key={item.id}
                                >
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.id}
                                    </td>
                                    <td className="py-4 px-6">{item.name}</td>
                                    <td className="py-4 px-6">{item.email}</td>
                                    <td className="py-4 px-6">
                                        <AssignToBranch
                                            branches={branches}
                                            item={item}
                                        />
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
        </>
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
                        {item.branch ? item.branch : " اختيار الفرع"}
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
                employee_id: event.target.checked ? null : item.id,
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

const SendInvite = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });
    const { setSnackBar } = React.useContext(LayoutsContext);

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
        post(route("inviteEmployee"), {
            onSuccess: () => {
                setSnackBar({
                    isShown: true,
                    message: "تم إرسال دعوة بنجاح",
                    status: "success",
                });
            },
        });
    };
    return (
        <CustomModal>
            <CustomModal.Trigger>
                <div className="flex items-center justify-end">
                    <span className="inline-flex rounded-md">
                        <Button>ارسال دعوة</Button>
                    </span>
                </div>
            </CustomModal.Trigger>
            <CustomModal.Content>
                <CustomModal.Title>ارسال دعوة</CustomModal.Title>
                <div className="rtl py-5 px-5">
                    <ValidationErrors errors={errors} />
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <div className="text-sm font-bold mb-5">
                                لكي يمكنك إضافة موظف، لابد أولا أن ترسل له دعوة،
                                اذا وافق عليها سيظهر في قاعدة البيانات بالأسفل
                            </div>
                            <Label forInput="email" value="الإيميل" />
                            <Input
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                    </form>
                </div>
                <CustomModal.Footer>
                    <Button onClick={submit}>ارسال</Button>
                </CustomModal.Footer>
            </CustomModal.Content>
        </CustomModal>
    );
};
Employees.layout = (page) => <DashboardLayout children={page} />;

export default Employees;
