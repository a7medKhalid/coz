import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Button from "../../Components/Button";
import Dropdown from "../../Components/Dropdown";
import LoopObject from "../../helpers/LoopObject";
import { LayoutsContext } from "../../Layouts/LayoutsProvider";
import StoreLayout from "../../Layouts/StoreLayout";

export default function Cart(props) {
    const { post } = useForm({});
    const [quantity, setQuantity] = React.useState(1);
    // const { setSnackBar } = React.useContext(LayoutsContext);

    const categories = props.categories;
    // const products = props.products;
    const selectedBranch = props.selectedBranch;
    const cart = props.cart;
    console.log(cart);
    var count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const deleteProductFromCart = (id) => {
        post(
            route("removeFromCart", {
                id: id,
            }),

            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم حذف المنتح من العربة بنجاح",
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
                    {cart.cartProducts?.map((cartItem, index) => {
                        return (
                            <>
                                <div className="py-2 px-5 md:flex items-center justify-between ">
                                    <Button
                                        onClick={() => deleteProductFromCart(5)}
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
                                                {cartItem.price} ريال
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <div className="bg-gray-100 border border-gray-200 rounded px-5 py-1 cursor-pointer">
                                                        الكمية: {quantity}
                                                    </div>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    {count.map((item) => {
                                                        return (
                                                            <div
                                                                className="text-center py-2 px-5 cursor-pointer hover:bg-gray-100"
                                                                onClick={() => {
                                                                    setQuantity(
                                                                        item
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
