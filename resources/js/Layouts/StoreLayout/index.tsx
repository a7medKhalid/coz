import React from "react";
import NavBar from "./components/NavBar";
import bannerImg from "../../assets/images/banner.jpg";
import { ShoppingCartIcon } from "../../assets/icons";
import MapWrapper from "../../Pages/Dashboard/Branches/components/MapWrapper";

interface props {
    children: any;
    categories: string[];
    selectedBranch: string;
    branches: any;
}
const StoreLayout: React.FC<props> = ({
    children,
    categories,
    selectedBranch,
    branches,
}) => {
    return (
        <div>
            <NavBar
                categories={categories}
                selectedBranch={selectedBranch}
                branches={branches}
            />
            <div className="flex items-center justify-center">
                <div className="w-3/4 py-5 mt-5 relative">
                    <img src={bannerImg} className="rounded-3xl mt-12" />

                    {children}
                </div>
                <div className="fixed bottom-5 right-24 w-12 h-12 rounded-full bg-primary border-2 border-cyan-300 cursor-pointer flex items-center justify-center">
                    <ShoppingCartIcon className={"text-white"} />
                </div>
            </div>
        </div>
    );
};

export default StoreLayout;
