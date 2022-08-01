import React from "react";
import StoreLayout from "../Layouts/StoreLayout";
import MapWrapper from "./Dashboard/Branches/components/MapWrapper";
import CategoryProducts from "./store/CategoryProducts";

export default function Store(props) {
    const categories = props.categories;
    const products = props.products;
    const selectedBranch = props.selectedBranch;
    console.log(props);

    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={props.branches}
        >
            {/* <MapWrapper></MapWrapper> */}
            {products.map((item, index) => {
                return (
                    <CategoryProducts
                        key={index}
                        cateogoryTitle={item.category}
                        products={item.products.data}
                    />
                );
            })}
        </StoreLayout>
    );
}
