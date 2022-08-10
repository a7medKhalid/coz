import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { TrashIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import CustomModal from "../../../components/CustomModal";
import Dropdown from "../../../Components/Dropdown";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import ValidationErrors from "../../../Components/ValidationErrors";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const Orders = (props) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const { post } = useForm({});
    const orders = props.orders.data;
    console.log(orders);

    // if orders is empty, show message in center of viewport
    if (orders.length < 1) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="mx-1"></div>
                <h1>لا يوجد لديك طلبات حاليا</h1>
            </div>
        );
    }

    const updateOrderStatus = (id, status) => {
        post(
            route("updateOrder", {
                orderId: id,
                status: status,
            }),

            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم تعديل الحالة بنجاح بنجاح",
                        status: "success",
                    });
                },
                onError: () => {
                    setSnackBar({
                        isShown: true,
                        message: "حدث خطأ ما",
                        status: "error",
                    });
                },
            }
        );
    };

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
                                الفرع
                            </th>
                            <th scope="col" className="py-3 px-6">
                                اسم العميل
                            </th>
                            <th scope="col" className="py-3 px-6">
                                رقم الجوال
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الحالة
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الإجمالي
                            </th>
                            <th scope="col" className="py-3 px-6">
                                تفاصيل الطلب
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item) => {
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
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.branch}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.customerName}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.phone}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                {item.status ===
                                                    "processing" && (
                                                    <div className="bg-sky-100 border border-sky-200 text-sky-800 w-fit px-1 rounded">
                                                        قيد التنفيذ
                                                    </div>
                                                )}
                                                {item.status ===
                                                    "completed" && (
                                                    <div className="bg-green-100 border border-green-200 text-green-800 w-fit px-1 rounded">
                                                        مننتهية
                                                    </div>
                                                )}
                                                {item.status !== "completed" &&
                                                    item.status !==
                                                        "processing" && (
                                                        <div className="bg-gray-100 border border-gray-200 text-gray-800 w-fit px-1 rounded">
                                                            {item.status}
                                                        </div>
                                                    )}
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            item.id,
                                                            "processing"
                                                        )
                                                    }
                                                >
                                                    قيد التنفيذ
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            item.id,

                                                            "completed"
                                                        )
                                                    }
                                                >
                                                    منتهية
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        updateOrderStatus(
                                                            item.id,

                                                            "cancelled"
                                                        );
                                                    }}
                                                >
                                                    ملغية
                                                </Dropdown.Item>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.totalPrice}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        <InertiaLink href={`orders/${item.id}`}>
                                            <Button>تفاصيل الطلب</Button>
                                        </InertiaLink>
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

Orders.layout = (page) => <DashboardLayout children={page} />;
export default Orders;
