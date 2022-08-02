import { useForm } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { TrashIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import CustomModal from "../../../components/CustomModal";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import ValidationErrors from "../../../Components/ValidationErrors";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const Customers = (props) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const { post } = useForm({});
    const customers = props.customers;
    console.log({ customers });

    // if promocodes is empty, show message in center of viewport
    if (customers.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="mx-1"></div>
                <h1>لا يوجد لديك عملاء مسجلين حساب</h1>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto rtl relative bg-white shadow-xl border border-gray-200 min-h-screen rounded-xl mt-5">
                <table className="w-full  text-sm  text-gray-500 text-right ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                رقم المعرف
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الاسم
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الإيميل
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item) => {
                            return (
                                <tr
                                    className="bg-white border-b  "
                                    key={item.id}
                                >
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.name}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.email}
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

Customers.layout = (page) => <DashboardLayout children={page} />;
export default Customers;
