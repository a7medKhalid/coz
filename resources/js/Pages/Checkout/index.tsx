import React from "react";
import StoreLayout from "../../Layouts/StoreLayout";

export default function Invoice(props) {
    const categories = props.categories;
    const selectedBranch = props.selectedBranch;
    const branches = props.selectedBranch;
    return (
        <StoreLayout
            categories={categories}
            selectedBranch={selectedBranch}
            branches={branches}
        >
            ss
        </StoreLayout>
    );
}
