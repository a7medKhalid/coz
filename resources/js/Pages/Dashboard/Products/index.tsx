import { useForm } from "@inertiajs/inertia-react";
import { Carousel } from "flowbite-react";
import React, { useEffect } from "react";
import Button from "../../../components/Button";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";

import Product from "./components/Product";

interface category {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
}
export interface product {
    id: number;
    name: string;
    description: string;
    images: any;
    price: number;
    categories?: category[];
    isArchived: number;
    quantity: number;
}
const Products = (props) => {
    const { get } = useForm({});
    const products = props.products.data;
    const [editing, setEditing] = React.useState<product>({ id: -2 });

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
                <Product
                    images={[
                        "https://semantic-ui.com/images/wireframe/image.png",
                    ]}
                    type="create"
                    name=""
                    price={0}
                    allCategories={props.categories}
                    categories={[]}
                    description=""
                    onEdit={() => {}}
                    onCancel={() => {}}
                />
                {products.map((product: product) => {
                    return (
                        <div>
                            {editing.id === product.id ? (
                                <Product
                                    id={editing.id}
                                    type="edit"
                                    images={[...product.images, ...images]}
                                    name={editing.name}
                                    description={editing.description}
                                    price={editing.price}
                                    allCategories={props.categories}
                                    categories={editing.categories}
                                    onEdit={() => {}}
                                    onCancel={() => {
                                        setEditing({ id: -1 });
                                    }}
                                />
                            ) : (
                                <Product
                                    id={product.id}
                                    type="ready"
                                    images={[...images, ...product.images]}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    allCategories={props.categories}
                                    categories={product.categories}
                                    onEdit={() => {
                                        setEditing({ ...product });
                                    }}
                                    onCancel={() => {}}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Products.layout = (page: any) => <DashboardLayout children={page} />;
export default Products;
