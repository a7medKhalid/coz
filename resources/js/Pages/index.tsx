import React from "react";
import StoreLayout from "../Layouts/StoreLayout";
import MapWrapper from "./Dashboard/Branches/components/MapWrapper";
import CategoryProducts from "./store/CategoryProducts";
import bannerImg from "../assets/images/banner.jpg";

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
            <img src={bannerImg} className="rounded-3xl mt-16 md:mt-12" />
            {/* <MapWrapper></MapWrapper> */}
            {products.map((item, index) => {
                return (
                    <CategoryProducts
                        key={index}
                        cateogoryTitle={item.category}
                        products={item.products.data}
                        selectedBranch={selectedBranch}
                    />
                );
            })}
        </StoreLayout>
    );
}
