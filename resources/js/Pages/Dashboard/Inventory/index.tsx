import React from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { product } from "../Products";
import Product from "../Products/components/Product";
import InventoryProduct from "./components/InventoryProduct";

export default function Inventory(props) {
    const products: product[] = props.products.data;
    console.log(props);

    const images = [
        {
            id: 0,
            name: "test",
            url: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ];
    return (
        <div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 rtl">
                {products.map((product: product) => {
                    return (
                        <div>
                            <InventoryProduct
                                id={product.id}
                                type="edit"
                                images={[...product.images, ...images]}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                categories={product.categories}
                                quantity={product.quantity}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Inventory.layout = (page: any) => <DashboardLayout children={page} />;
