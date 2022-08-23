import { useForm } from "@inertiajs/inertia-react";
import { Label } from "flowbite-react";
import React from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const Settings = (props) => {
    const settings = props.settings;
    const { setSnackBar } = React.useContext(LayoutsContext);

    const { data, setData, post, transform } = useForm({
        siteName: settings[0]["value"],
        siteDescription: settings[1]["value"],
        siteEmail: settings[2]["value"],
        sitePhone: settings[3]["value"],
        siteTwitter: settings[4]["value"],
        siteInstagram: settings[5]["value"],
        shippingCost: settings[6]["value"],
        shippingTime: settings[7]["value"],
        shippingCities: settings[8]["value"],
    });

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
        transform((data) => {
            return {
                ...data,
                shippingCities: [data.shippingCities],
            };
        });

        post(route("updateSettings"), {
            onError: function (e) {
                console.log({ e });
                setSnackBar({
                    isShown: true,
                    message: "حصل خطا ما",
                    status: "error",
                });
            },
            onSuccess: function () {
                setSnackBar({
                    isShown: true,
                    message: "تم تعديل البيانات بنجاح",
                    status: "success",
                });
            },
        });
    };
    return (
        <div>
            <form onSubmit={submit}>
                <div className="mt-4 rtl">
                    {arr.map((item, index) => {
                        if (item.title === "shippingCities") {
                            return (
                                <div className="w-1/4 mt-4" key={index}>
                                    <Label value={item.ar} />
                                    <select
                                        name={"shippingCities"}
                                        className="mx-5"
                                        multiple
                                    >
                                        <option value={"jeddah"}>جدة</option>
                                    </select>
                                </div>
                            );
                        }
                        return (
                            <div className="w-1/4 mt-4" key={index}>
                                <Label value={item.ar} />
                                <Input
                                    type="text"
                                    name={item.title}
                                    value={data[item.title]}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 flex justify-end">
                    <Button type="submit">حفظ</Button>
                </div>
            </form>
        </div>
    );
};
Settings.layout = (page) => <DashboardLayout children={page} />;
export default Settings;
const arr = [
    { title: "siteName", ar: "اسم الموقع" },
    { title: "siteDescription", ar: "وصف الموقع" },
    { title: "siteEmail", ar: "بريد الموقع" },
    { title: "sitePhone", ar: "رقم الموقع" },
    { title: "siteTwitter", ar: "تويتر الموقع" },
    { title: "siteInstagram", ar: "انستجرام الموقع" },
    { title: "shippingCost", ar: "سعر الشحن" },
    { title: "shippingTime", ar: "وقت الشحن" },
    { title: "shippingCities", ar: "المدن المتوفرة" },
];
