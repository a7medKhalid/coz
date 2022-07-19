import React from "react";
import { TagIcon } from "../../../../assets/icons";
import Button from "../../../../components/Button";

interface props {
    img: string;
    title: string;
    price: number;
    description: string;
    categories: string[];
    onEdit: () => void;
    onDelete: () => void;
}
const ProductReady: React.FC<props> = ({
    img,
    title,
    description,
    price,
    onEdit,
    onDelete,
    categories,
}) => {
    return (
        <div className="bg-white border flex flex-col justify-between border-gray-200 rounded overflow">
            <div>
                <img
                    src={img}
                    alt="logo"
                    className="w-full max-h-48 object-cover "
                />
                <div className="py-4 px-4 rtl ">
                    <div className="flex items-center overflow-x-auto">
                        {categories?.map((item) => {
                            return (
                                <div className="py-0.5 mb-2 ml-2 px-4 w-fit rounded-lg border border-gray-200 bg-gray-100 text-xs">
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-between ">
                        <div className="text-md font-bold">{title}</div>
                        <div className="text-md">{price} ريال</div>
                    </div>
                    <div className="text-sm mt-5">{description}</div>
                </div>
            </div>

            <div className="rtl flex items-center bg-gray-100 border-t border-gray-200 py-3  px-4">
                <Button onClick={onEdit}>تعديل</Button>
                <div
                    onClick={onDelete}
                    className="text-red-500 mr-4 hover:bg-red-200 py-1 rounded transition duration-150 cursor-pointer px-4"
                >
                    حذف
                </div>
            </div>
        </div>
    );
};

export default ProductReady;
