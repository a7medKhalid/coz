import { useForm } from "@inertiajs/inertia-react";
import { Badge, Carousel, Label, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
    AddDocumentIcon,
    TagIcon,
    XCircleIcon,
} from "../../../../assets/icons";
import Button from "../../../../components/Button";
import CustomModal from "../../../../components/CustomModal";
import Input from "../../../../components/Input";
import { LayoutsContext } from "../../../../Layouts/LayoutsProvider";

interface category {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
}
interface props {
    id?: number;
    type: "create" | "edit" | "ready";
    images: any;
    name: string;
    price: number;
    description: string;
    categories: category[];
    quantity;
}
const InventoryProduct: React.FC<props> = ({
    id,
    type,
    images,
    name,
    description,
    price,
    quantity,
    categories,
}) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const [showImagesCarousel, setShowImagesCarousel] = React.useState(false);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform,
        setDefaults,
    } = useForm({
        product_id: id,
        quantity: quantity,
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
        console.log({ data });

        post(route("updateInventory"), {
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
                    message: "تم تعديل المنتج بنجاح",
                    status: "success",
                });
            },
        });
    };

    return (
        <div className="bg-white border flex flex-col justify-between border-gray-200 rounded overflow">
            <form onSubmit={submit}>
                <div>
                    <img
                        src={images[0].url}
                        className="w-full h-48 object-cover"
                    />
                    {/* <ImageCarousel /> */}
                    {/* <div className="h-48 w-full"> */}
                    {/* </div> */}
                    <div className="pt-4 py-4 px-4 rtl ">
                        <div className="flex items-center overflow-x-auto overflow-y-hidden">
                            <>
                                {categories?.map((item: any) => {
                                    return (
                                        <div className="py-0.5 mb-2 whitespace-nowrap ml-2 px-4 w-fit rounded-lg border border-gray-200 bg-gray-100 text-xs">
                                            {item}
                                        </div>
                                    );
                                })}
                            </>
                        </div>
                        <div className="flex items-center justify-between ">
                            <div className="text-md font-bold">{name}</div>
                            <div className="text-md">{price} ريال</div>
                        </div>
                        <div className="text-sm mt-5">{description}</div>
                    </div>
                    <div className="px-4 pb-4">
                        <Label>الكمية</Label>
                        <Input
                            handleChange={onHandleChange}
                            name="quantity"
                            value={data.quantity}
                        />
                        <Button className="mt-4 " type="submit">
                            تعديل
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InventoryProduct;
