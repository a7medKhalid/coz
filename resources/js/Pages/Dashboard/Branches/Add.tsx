import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React, { useContext } from "react";
import ValidationErrors from "../../../Components/ValidationErrors";
import MapWrapper from "./components/MapWrapper";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import CustomLink from "../../../components/CustomLink";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import Button from "../../../Components/Button";

export default function Add() {
    const { snackBar, setSnackBar } = useContext(LayoutsContext);
    const { data, setData, post, setDefaults, errors, processing } = useForm({
        name: "",
        latitude: "",
        longitude: "",
    });
    const [selectedPosition, setSelectedPosition] = React.useState({
        lat: 0,
        lng: 0,
    });

    const position = {
        lat: selectedPosition.lat.toString(),
        lng: selectedPosition.lng.toString(),
    };
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
        data.latitude = +position.lat == 0 ? null : position.lat;
        data.longitude = +position.lng == 0 ? null : position.lng;

        post(route("addBranch"), {
            onSuccess: () =>
                setSnackBar({
                    isShown: true,
                    message: "تم إضافة الفرع بنجاح",
                    status: "success",
                }),
        });
    };
    return (
        <div className="rtl">
            <CustomLink to="branches" text="عودة" />
            <form onSubmit={submit}>
                <div className="grid grid-cols-4 gap-5 mt-5 min-h-screen">
                    <div>
                        <ValidationErrors errors={errors} />
                        <Label forInput="name" value="اسم الفرع" />
                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                        <Button className="ml-4 mt-5" processing={processing}>
                            إضافة
                        </Button>
                    </div>
                    <div className="col-span-3 h-3/4">
                        <MapWrapper
                            setSelectedPosition={(val: any) => {
                                setSelectedPosition(val);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
Add.layout = (page) => <DashboardLayout children={page} title="إضافة فرع" />;
