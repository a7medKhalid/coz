import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import LoopObject from "../../helpers/LoopObject";
import { LayoutsContext } from "../../Layouts/LayoutsProvider";
import StoreLayout from "../../Layouts/StoreLayout";

export default function Cart(props) {
    const { post } = useForm({});
    // const { setSnackBar } = React.useContext(LayoutsContext);

    const categories = props.categories;
    // const products = props.products;
    const selectedBranch = props.selectedBranch;
    const cart = props.cart;
    console.log(cart);

    const deleteProductFromCart = (id) => {
        console.log({ id });

        post(
            route("removeFromCart", {
                id: id,
            })
            // {
            //     onSuccess: () => {
            //         setSnackBar({
            //             isShown: true,
            //             message: "تم حذف المنتح من العربة بنجاح",
            //             status: "success",
            //         });
            //     },
            //     onError: () => {
            //         setSnackBar({
            //             isShown: true,
            //             message: "حدث خطأ ما",
            //             status: "error",
            //         });
            //     },
            // }
        );
    };

    if (cart.cartProducts.length === 0) {
        return (
            <StoreLayout
                categories={categories}
                selectedBranch={selectedBranch}
                branches={props.branches}
            >
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-5">
                            عربة التسوق فارغة
                        </h1>
                        <InertiaLink href={route("store")}>
                            عودة الى المتجر
                        </InertiaLink>
                    </div>
                </div>
            </StoreLayout>
        );
    }
    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={props.branches}
        >
            <div className="text-2xl font-bold text-right mt-12 mb-5">
                العربة
            </div>

            <div className="w-full">
                <div className="border border-gray-200 bg-white rounded px-5 py-5 w-full">
                    <div className="text-right font-bold">
                        الإجمالي: {cart.totalPrice} ريال
                    </div>
                    {cart.cartProducts?.data?.map((cartItem, index) => {
                        let count: any = [];
                        console.log(cartItem.availableQuantity);

                        for (let i = 0; i < cartItem.availableQuantity; i++) {
                            count.push(i + 1);
                        }

                        return (
                            <>
                                <div className="py-2 px-5 flex-wrap flex items-center justify-between ">
                                    <Button
                                        onClick={() =>
                                            deleteProductFromCart(cartItem.id)
                                        }
                                        className="bg-red-500"
                                    >
                                        حذف
                                    </Button>
                                    <div className="flex items-center">
                                        <div className="mr-5 text-right">
                                            <div className=" font-bold">
                                                {cartItem.name}
                                            </div>
                                            <div className="my-5">
                                                {cartItem.price *
                                                    cartItem.quantity}{" "}
                                                ريال
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <div className="bg-gray-100 border border-gray-200 rounded px-5 py-1 cursor-pointer">
                                                        الكمية:{" "}
                                                        {cartItem.quantity}
                                                    </div>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    {count.map((item) => {
                                                        return (
                                                            <div
                                                                className="text-center py-2 px-5 cursor-pointer hover:bg-gray-100"
                                                                onClick={() => {
                                                                    post(
                                                                        route(
                                                                            "addToCart",
                                                                            {
                                                                                product_id:
                                                                                    cartItem.id,
                                                                                quantity:
                                                                                    item,
                                                                            }
                                                                        )
                                                                    );
                                                                }}
                                                            >
                                                                {item}
                                                            </div>
                                                        );
                                                    })}
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>

                                        <div className="bg-gray-400 rounded border border-gray-100 w-28 h-28" />
                                    </div>
                                </div>
                                {index != cart.cartProducts.length - 1 && (
                                    <div className="h-0.5 w-full bg-gray-100 mt-3"></div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>

            <div className="rtl mt-5">
                <InertiaLink href={route("viewOrderOptions")}>
                    <Button>التالي</Button>
                </InertiaLink>
            </div>
            {/* <LoopObject object={cart.cartProducts[0]} /> */}
            {/* <MapWrapper></MapWrapper> */}
        </StoreLayout>
    );
}
