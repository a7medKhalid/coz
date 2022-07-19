import React from "react";
import Button from "../../../components/Button";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import ProductEditOrCreate from "./components/ProductEditOrCreate";
import ProductReady from "./components/ProductReady";

const Products = (props) => {
    console.log({ props });

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <ProductEditOrCreate
                    img="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                    title="اكل"
                    price={200}
                    categories={["s", "e", "3"]}
                    description="كيك 5 كيلوجرام"
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
                <ProductReady
                    img="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="اكل"
                    description="كيك 5 كيلوجرام"
                    price={200}
                    categories={["s", "e", "3"]}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
                <ProductReady
                    img="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                    title="اكل"
                    price={200}
                    description="كيك 5 كيلوجرام"
                    categories={["s", "e", "3", "3", "5", "asdfasd", "asdawer"]}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
                <ProductReady
                    img="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                    title="اكل"
                    price={200}
                    description="كيك 5 كيلوجرام"
                    categories={["s", "e", "3"]}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            </div>
        </div>
    );
};

Products.layout = (page: any) => <DashboardLayout children={page} />;
export default Products;
