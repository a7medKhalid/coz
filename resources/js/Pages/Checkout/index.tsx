import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Button } from "flowbite-react";
import React from "react";
import Label from "../../Components/Label";
import CustomButton from "../../Components/Button";
import StoreLayout from "../../Layouts/StoreLayout";
import Input from "../../Components/Input";
import Dropdown from "../../Components/Dropdown";
import ValidationErrors from "../../Components/ValidationErrors";

export default function Checkout(props) {
    console.log(props);

    const categories = props.categories;
    const selectedBranch = props.selectedBranch;
    const branches = props.branches;
    const deliveryCost = props?.deliveryCost;
    const vatCost = props?.vatCost;
    const totalCost = props?.cartTotal + vatCost;
    const cities = props?.cities;
    const { data, setData, post } = useForm<any>({
        type: "",
        city: "",
        promocode: "",
        notes: "",
        phone: "",
        isDelivery: "",
        deliveryCity: "",
    });
    const [isDelivery, setIsDelivery] = React.useState(true);
    const onHandleChange = (event: any) => {
        if (event.target.name === "isDelivery") {
            setIsDelivery(true);
        }
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("setOrderOptions"));
    };

    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={branches}
        >
            <div className="text-2xl font-bold text-right mt-12 mb-5">
                تفاصيل الطلب
            </div>
            <div className="border border-gray-200 bg-white rounded px-5 py-5">
                <form>
                    <div className="rtl">
                        <ValidationErrors errors={props.errors} />
                    </div>
                    <div className="rtl">
                        <Label>توصيل؟</Label>
                        <input
                            type="checkbox"
                            name="isDelivery"
                            onChange={onHandleChange}
                            checked={isDelivery}
                        />
                        <div className="mt-2"></div>

                        {isDelivery === true && (
                            <div className="w-1/4">
                                <Label>المدينة</Label>
                                <select name="deliveryCity">
                                    {cities?.map((item) => {
                                        return (
                                            <option className="text-center py-2 px-5 cursor-pointer hover:bg-gray-100">
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        <div className="mt-5"></div>

                        <Label>هل لديك كود خصم ؟</Label>
                        <Input
                            type="text"
                            name="promocode"
                            value={data.promocode}
                            className="mt-1 block w-1/4"
                            placeholder="اكتبه هنا"
                            handleChange={onHandleChange}
                            required
                        />
                        <div className="mt-5"></div>

                        <Label>هل لديك ملاحظات تريد أن تضيفها للطلب؟</Label>
                        <textarea
                            name={"notes"}
                            required
                            placeholder={"اكتبها هنا"}
                            rows={3}
                            value={data.notes}
                            className={
                                "w-2/4 border-gray-300 mt-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm"
                            }
                            onChange={onHandleChange}
                        ></textarea>

                        <Label>رقم الجوال</Label>
                        <Input
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-1/4"
                            placeholder="رقم الجوال"
                            handleChange={onHandleChange}
                            required
                        />
                        <div className="flex items-center mt-5">
                            <div className="w-1/4 font-bold">
                                الاجمالي :{" "}
                                {isDelivery
                                    ? totalCost + deliveryCost
                                    : totalCost}{" "}
                                ريال
                            </div>
                            <div className="w-1/4">
                                التكلفة: {totalCost} ريال
                            </div>
                            {isDelivery === true && (
                                <div className="w-1/4">
                                    تكلفة التوصيل: {deliveryCost} ريال
                                </div>
                            )}

                            <div className="w-1/4">
                                الضريبة : {vatCost} ريال
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-end">
                <CustomButton onClick={submit} className="mt-5" type={data}>
                    الفاتورة والدفع
                </CustomButton>
                <InertiaLink href={route("cart")}>
                    <CustomButton
                        className="mt-5 bg-transparent text-primary mx-5"
                        type={data}
                    >
                        العربة
                    </CustomButton>
                </InertiaLink>
            </div>
        </StoreLayout>
    );
}
