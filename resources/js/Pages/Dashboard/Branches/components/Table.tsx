import React from "react";
import { branchType, employeeType } from "../../../../helpers/types";
import { LayoutsContext } from "../../../../Layouts/LayoutsProvider";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Dropdown from "../../../../Components/Dropdown";

interface props {
    employees: employeeType[];
    branches: branchType[];
}

const Table: React.FC<props> = ({ employees, branches }) => {
    if (branches.length < 1) {
        return (
            <div className="h-screen flex items-center justify-center">
                لا يوجد لديك فروع، لإضافة فرع إضغط على
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
        <div className="overflow-x-auto relative bg-white shadow-xl border border-gray-200 min-h-screen rounded-xl mt-5">
            <table className="w-full  text-sm  text-gray-500  text-right ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            رقم الفرع
                        </th>
                        <th scope="col" className="py-3 px-6">
                            اسم الفرع
                        </th>
                        <th scope="col" className="py-3 px-6">
                            مدير الفرع
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map((item) => {
                        return (
                            <tr className="bg-white border-b  " key={item.id}>
                                <td
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {item.id}
                                </td>
                                <td className="py-4 px-6">{item.name}</td>
                                <td className="py-4 px-6">
                                    {item.user_id ? (
                                        item.user_id
                                    ) : (
                                        <AddManager
                                            employees={employees}
                                            item={item}
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default Table;

const AddManager = ({ employees, item }) => {
    const { setSnackBar } = React.useContext(LayoutsContext);
    const { data, setData, post, processing, errors, reset } = useForm({});
    // const [manager, setManager] = React.useState(null);
    const addManager = (employee) => {
        post(
            route("updateBranch", {
                user_id: employee.id,
                branch_id: item.id,
                name: item.name,
                latitude: item.latitude,
                longitude: item.longitude,
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
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        اختيار مدير للفرع
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
                {employees.map((employee) => {
                    return (
                        <Dropdown.Item
                            key={employee.id}
                            onClick={() => addManager(employee)}
                        >
                            {employee.name}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Content>
        </Dropdown>
    );
};
