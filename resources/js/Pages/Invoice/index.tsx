import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Button } from "flowbite-react";
import React, { StrictMode } from "react";
import Label from "../../Components/Label";
import CustomButton from "../../Components/Button";
import StoreLayout from "../../Layouts/StoreLayout";
import Input from "../../Components/Input";
import Dropdown from "../../Components/Dropdown";
import { Helmet } from "react-helmet";
import { Router } from "@inertiajs/inertia/types/router";

export default function Invoice(props) {
    console.log(props);

    const categories = props.categories;
    const selectedBranch = props.selectedBranch;
    const branches = props.branches;

    const totalPrice = props?.totalPrice;
    const paymentID = props?.paymentID;
    const { data, setData, post } = useForm<any>({
        type: "",
        city: "",
        promocode: "",
        note: "",
    });
    const [isDelivery, setIsDelivery] = React.useState(true);
    const onHandleChange = (event: any) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={branches}
        >
            <Helmet>
                <script
                    src={`https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${paymentID}`}
                ></script>
            </Helmet>
            <div className="text-2xl font-bold text-right mt-12 mb-5">
                الفاتورة
            </div>
            <div className="border border-gray-200 bg-white rounded px-5 py-5">
                <div className="border border-gray-200 px-5 py-2 flex flex-col items-end ">
                    <div className="flex items-center justify-between w-full">
                        <InertiaLink href={route("cart")}>
                            <CustomButton>تعديل العربة</CustomButton>
                        </InertiaLink>
                        <div className="font-bold">المنتجات</div>
                    </div>
                    <div className="py-2 px-5 md:flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="mr-5 text-right text-sm">
                                <div className=" font-bold">اسم المنتح</div>
                                <div className="my-5">20 ريال</div>
                            </div>

                            <div className="bg-gray-400 rounded border border-gray-100 w-20 h-20" />
                        </div>
                    </div>
                </div>

                <div className="rtl">
                    <div className="font-bold my-2">نوع الطلب</div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="type"
                            id="delivery"
                            defaultChecked
                            disabled
                        />
                        <Label>توصيل</Label>
                        <div className="mx-2"></div>
                        <input
                            type="radio"
                            name="type"
                            id="pickuo"
                            disabled={true}
                        />
                        <Label>استلام</Label>
                    </div>
                    <div className="mt-2"></div>

                    {isDelivery === true && (
                        <div className="w-1/4">
                            <div className="bg-gray-200 border border-gray-100 px-5 py-2 text-center rounded-lg text-gray-700">
                                {props.selectedCity}
                            </div>
                        </div>
                    )}
                    <div className="mt-5"></div>
                    <Label>كود الخصم</Label>
                    {props.promocode != null ? (
                        <div className="text-sm font-bold">
                            {props.promocode}
                        </div>
                    ) : (
                        <div className="text-sm font-bold">لا يوجد كود خصم</div>
                    )}

                    <div className="mt-5"></div>

                    <Label>ملاحظات الطلب</Label>
                    {props.note != null ? (
                        <div className="text-sm font-bold">{props.note}</div>
                    ) : (
                        <div className="text-sm font-bold">لا يوجد ملاحظات</div>
                    )}

                    <div className="flex items-center mt-5">
                        <div className="w-1/4 font-bold">
                            الاجمالي : {totalPrice}
                            ريال
                        </div>
                    </div>
                </div>
                <div className="mt-5"></div>
                <form
                    action="http://127.0.0.1:8000/tracking/"
                    className="paymentWidgets"
                    data-brands="VISA MASTER AMEX"
                ></form>
            </div>
            <div className="flex items-center justify-end">
                <InertiaLink href={route("viewOrderOptions")}>
                    <CustomButton
                        className="mt-5 bg-transparent text-primary mx-5"
                        type={data}
                    >
                        تفاصيل الدفع
                    </CustomButton>
                </InertiaLink>
            </div>
        </StoreLayout>
    );
}
