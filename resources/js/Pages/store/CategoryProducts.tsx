import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { ArrowLeftIcon, ShoppingCartIcon } from "../../assets/icons";
import Button from "../../Components/Button";
import { LayoutsContext } from "../../Layouts/LayoutsProvider";
import { product } from "../Dashboard/Products";

interface props {
    cateogoryTitle: string;
    products: product[];
    selectedBranch: string;
}
const CategoryProducts: React.FC<props> = ({
    cateogoryTitle,
    products,
    selectedBranch,
}) => {
    return (
        <div>
            <div className="flex item-center justify-end mt-5">
                <div className="flex items-center justify-between w-full">
                    <InertiaLink
                        href={`/?category=${cateogoryTitle}`}
                        className="flex items-center text-blue-500 underline cursor-pointer font-bold"
                    >
                        <ArrowLeftIcon className={"mr-2"} />
                        <div className="">رؤية الكل</div>
                    </InertiaLink>
                    <div className="text-4xl tracking-wide flex flex-col justify-center items-end font-bold text-right py-4 border-blue-400">
                        {cateogoryTitle}
                        <div className="w-2/4 h-2 mt-3  bg-primary rounded-sm" />
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 rtl">
                {products.map((item) => {
                    return (
                        <ProductItem
                            key={item.id}
                            product={item}
                            cateogoryTitle={""}
                            selectedBranch={selectedBranch}
                            products={[]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryProducts;

interface props {
    product: product;
}
const ProductItem: React.FC<props> = ({ product, selectedBranch }) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const { post, transform, data } = useForm({
        quantity: 1,
    });
    const addToCart = ({ productID }) => {
        if (selectedBranch === null) {
            setSnackBar({
                isShown: true,
                message: "يجب تحديد الفرع",
                status: "error",
            });
            return;
        }

        post(
            route("addToCart", {
                product_id: productID,
                quantity: data.quantity,
            }),
            {
                onSuccess: (e) => {
                    console.log({ e });

                    setSnackBar({
                        isShown: true,
                        message: "تم إضافة المنتح الى العربة بنجاح",
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
        <div className="h-full  bg-white  shadow rounded bg-gradient-to-r hover:bg-gray-100 cursor-pointer">
            <InertiaLink href={`/products?product_id=${product.id}`}>
                <div className="relative">
                    <img
                        className="h-3/4 w-full object-cover rounded-t "
                        src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="img"
                    />
                    <div className="h-full bottom-0 absolute bg-gradient-to-t from-gray-800 w-full" />
                    <div className="bottom-2 tracking-wide right-2 absolute text-2xl text-white">
                        {product.name}
                    </div>
                </div>
            </InertiaLink>
            <div className="flex items-center justify-between px-5 py-5">
                <div
                    onClick={() => addToCart({ productID: product.id })}
                    className="bg-gray-200  border  border-gray-100 rounded px-2 cursor-pointer hover:bg-primary text-gray-400 hover:text-white  transition duration-150 py-1 text-lg"
                >
                    <ShoppingCartIcon className={""} />
                </div>
                {/* <Button className="text-white bg-white"></Button> */}
                <div className="text-3xl font-bold rtl flex items-end">
                    {product.price}
                    <div className="text-sm mr-2">ريال</div>
                </div>
            </div>
        </div>
    );
};
