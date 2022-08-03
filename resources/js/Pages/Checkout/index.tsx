import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Button } from "flowbite-react";
import React from "react";
import Label from "../../Components/Label";
import CustomButton from "../../Components/Button";
import StoreLayout from "../../Layouts/StoreLayout";
import Input from "../../Components/Input";
import Dropdown from "../../Components/Dropdown";

export default function Invoice(props) {
    console.log(props);

    const categories = props.categories;
    const selectedBranch = props.selectedBranch;
    const branches = props.branches;
    const deliveryCost = props?.deliveryCost;
    const vatCost = props?.vatCost;
    const netCost = props?.netCost + vatCost;
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
            <div className="text-2xl font-bold text-right mt-12 mb-5">
                تفاصيل الدفع
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

                <form action="">
                    <div className="rtl">
                        <div className="font-bold my-2">نوع الطلب</div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="type"
                                id="delivery"
                                defaultChecked
                                onClick={() => setIsDelivery(true)}
                            />
                            <Label>توصيل</Label>
                            <div className="mx-2"></div>
                            <input
                                type="radio"
                                name="type"
                                id="pickuo"
                                onClick={() => setIsDelivery(false)}
                            />
                            <Label>استلام</Label>
                        </div>
                        <div className="mt-2"></div>

                        {isDelivery === true && (
                            <div className="w-1/4">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="bg-gray-100 border border-gray-200 rounded px-5 py-1 cursor-pointer">
                                            اختيار المدينة
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        {props.cites?.map((item) => {
                                            return (
                                                <div className="text-center py-2 px-5 cursor-pointer hover:bg-gray-100">
                                                    {item}
                                                </div>
                                            );
                                        })}
                                    </Dropdown.Content>
                                </Dropdown>
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
                            name={"note"}
                            required
                            placeholder={"اكتبها هنا"}
                            rows={3}
                            value={data.note}
                            className={
                                "w-2/4 border-gray-300 mt-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm"
                            }
                            onChange={onHandleChange}
                        ></textarea>

                        <div className="flex items-center mt-5">
                            <div className="w-1/4 font-bold">
                                الاجمالي :{" "}
                                {isDelivery ? netCost + deliveryCost : netCost}{" "}
                                ريال
                            </div>
                            <div className="w-1/4">التكلفة: {netCost} ريال</div>
                            {isDelivery === true && (
                                <div className="w-1/4">
                                    تكلفة التوصيل: {deliveryCost} ريال
                                </div>
                            )}

                            <div className="w-1/4">
                                الضريبة : {vatCost} ريال
                            </div>
                        </div>
                        <CustomButton className="mt-5" type={data}>
                            التالي
                        </CustomButton>
                    </div>
                </form>
            </div>
        </StoreLayout>
    );
}
