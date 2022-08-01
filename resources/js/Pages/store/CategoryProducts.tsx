import React from "react";
import { ShoppingCartIcon } from "../../assets/icons";
import Button from "../../Components/Button";
import { product } from "../Dashboard/Products";

interface props {
    cateogoryTitle: string;
    products: product[];
}
const CategoryProducts: React.FC<props> = ({ cateogoryTitle, products }) => {
    return (
        <div>
            <div className="flex item-center justify-end">
                <div className="text-4xl flex flex-col justify-center items-end font-bold text-right py-4 border-blue-400">
                    {cateogoryTitle}
                    <div className="w-2/4 h-2 mt-3  bg-primary rounded-sm" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {products.map((item) => {
                    return (
                        <ProductItem
                            key={item.id}
                            product={item}
                            cateogoryTitle={""}
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
const ProductItem: React.FC<props> = ({ product }) => {
    const addToCart = () => {};
    return (
        <div className="h-80  bg-white  shadow rounded bg-gradient-to-r ">
            <div className="relative">
                <img
                    className="h-3/4 w-full object-cover rounded-t "
                    src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                />

                <div className="h-full bottom-0 absolute bg-gradient-to-t from-gray-800 w-full" />
                <div className="bottom-2 right-2 absolute text-2xl text-white">
                    {product.name}
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pt-5">
                <div
                    onClick={addToCart}
                    className="bg-gray-200 border border-gray-100 rounded px-2 cursor-pointer hover:bg-primary text-gray-400 hover:text-white  transition duration-150 py-1 text-lg"
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
