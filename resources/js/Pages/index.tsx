import React from "react";
import StoreLayout from "../Layouts/StoreLayout";
import MapWrapper from "./Dashboard/Branches/components/MapWrapper";
import CategoryProducts from "./store/CategoryProducts";
import bannerImg from "../assets/images/banner.jpg";
import TrackingDetails from "./Tracking";

export default function Store(props) {
    const categories = props.categories;
    const products = props.products;
    const selectedBranch = props.selectedBranch;
    const auth = props?.auth;

    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={props.branches}
            auth={auth}
        >
            <div className="mt-14">
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
            </div>
        </StoreLayout>
    );
}
