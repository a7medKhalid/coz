import React from "react";
import StoreLayout from "../Layouts/StoreLayout";
import CategoryProducts from "./store/CategoryProducts";

export default function Store(props) {
    const categories = props.categories;
    const products = props.products.data;
    console.log(props);

    return (
        <StoreLayout categories={categories}>
            <CategoryProducts cateogoryTitle={"الكيك"} products={products} />
        </StoreLayout>
    );
}
