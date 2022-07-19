import { useForm } from "@inertiajs/inertia-react";
import { Carousel } from "flowbite-react";
import React from "react";
import Button from "../../../components/Button";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";

import Product from "./components/Product";

interface product {
    id: number;
    name: string;
    description: string;
    price: number;
    isArchived: number;
}
const Products = (props) => {
    const { get } = useForm({});
    const products = props.products.data;
    const [editing, setEditing] = React.useState({ id: -1 });
    const [allCategories, setAllCategories] = React.useState(null);
    console.log({ props });

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 rtl">
                <Product
                    img="https://semantic-ui.com/images/wireframe/image.png"
                    type="create"
                    name=""
                    price={0}
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
                                    id={product.id}
                                    type="edit"
                                    img="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    categories={["s", "e", "3"]}
                                    onEdit={() => {}}
                                    onCancel={() => {
                                        setEditing({ id: -1 });
                                    }}
                                />
                            ) : (
                                <Product
                                    id={product.id}
                                    type="ready"
                                    img="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    categories={["s", "e", "3"]}
                                    onEdit={() => {
                                        setEditing({ id: product.id });
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
