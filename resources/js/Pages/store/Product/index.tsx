import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { ShoppingCartIcon } from "../../../assets/icons";
import LoopObject from "../../../helpers/LoopObject";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import StoreLayout from "../../../Layouts/StoreLayout";

function ProductDetails(props) {
    const product = props.product;
    return (
        <StoreLayout
            categories={props.categories}
            selectedBranch={props.selectedBranch}
            branches={props.branches}
        >
            <div className="mt-14">
                <Product
                    product={product}
                    selectedBranch={props.selectedBranch}
                />
            </div>
        </StoreLayout>
    );
}

export default ProductDetails;
const Product = ({ product, selectedBranch }) => {
    const { setSnackBar } = React.useContext(LayoutsContext);
    const [quantity, setQuantity] = React.useState(1);
    const { post } = useForm({});
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
                quantity: quantity,
            }),
            {
                onSuccess: (e) => {
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
        <div className="grid grid-cols-3">
            <div className="col-span-1 text-right px-5">
                <div className="text-2xl font-bold tracking-widest">
                    {product.name}
                </div>
                <div className="text-xl mt-5">{product.description}</div>
                <div className="text-3xl font-bold rtl flex items-end mt-5">
                    {product.price}
                    <div className="text-sm mr-2">ريال</div>
                </div>
                <div className="rtl mt-5">
                    <div
                        onClick={() => addToCart({ productID: product.id })}
                        className="bg-gray-200 w-fit  border z-50 border-gray-100 rounded px-2 cursor-pointer hover:bg-primary text-gray-400 hover:text-white  transition duration-150 py-1 text-lg"
                    >
                        <ShoppingCartIcon className={""} />
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <img
                    className="h-4/4 w-full object-cover rounded-t "
                    src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                />
            </div>
        </div>
    );
};
