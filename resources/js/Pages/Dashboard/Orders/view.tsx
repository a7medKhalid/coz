import React from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";

export default function View(props) {
    console.log(props);
    const order = props.order;
    const products = props.order.products;
    const branch = props.order.branch;

    return (
        <div className="rtl">
            <div className="font-bold text-2xl mb-2">تفاصيل الطلب</div>
            <div className="flex items-center">
                <div className="font-bold">الفرع :</div>
                <div>{branch.name}</div>
            </div>
            {arr.map((item) => {
                return (
                    <div className="flex items-center">
                        <div className="font-bold">{item.ar} :</div>
                        <div>{order[item.title]}</div>
                    </div>
                );
            })}
            <div className="text-2xl font-bold mt-4 mb-2">المنتجات</div>
            {products.map((item, index) => {
                console.log({ item });

                return (
                    <div className="ltr flex flex-col items-end">
                        <div className="py-2 px-5 flex-wrap flex items-center justify-between ">
                            <div className="flex items-center">
                                <div className="mr-5 text-right">
                                    <div className=" font-bold">
                                        {item.name}
                                    </div>
                                    <div className="my-5">
                                        {item.price} ريال
                                    </div>
                                </div>

                                <div className="bg-gray-400 rounded border border-gray-100 w-28 h-28" />
                            </div>
                        </div>
                        {index != products.length - 1 && (
                            <div className="h-0.5 w-full bg-gray-100 mt-3"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
const arr = [
    { title: "id", ar: "رقم الطلب" },
    { title: "customerName", ar: "اسم العميل" },
    { title: "status", ar: "الحالة" },
    { title: "notes", ar: "الملاحظات" },
    { title: "phone", ar: "رقم الجوال" },
    { title: "paymentId", ar: "رقم الدفع" },
    { title: "totalPrice", ar: "الإجمالي" },
    { title: "type", ar: "نوع الطلب" },
];

View.layout = (page) => <DashboardLayout children={page} />;
