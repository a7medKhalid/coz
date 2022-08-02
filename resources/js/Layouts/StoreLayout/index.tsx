import React from "react";
import NavBar from "./components/NavBar";
import bannerImg from "../../assets/images/banner.jpg";
import { ShoppingCartIcon } from "../../assets/icons";
import MapWrapper from "../../Pages/Dashboard/Branches/components/MapWrapper";
import { InertiaLink } from "@inertiajs/inertia-react";
import LayoutsProviders from "../LayoutsProvider";

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
        <LayoutsProviders>
            <div>
                <NavBar
                    categories={categories}
                    selectedBranch={selectedBranch}
                    branches={branches}
                />
                <CategoriesSideBar categories={categories} />
                <div className="flex items-center justify-center">
                    <div className="md:w-3/4 py-5 px-5 mt-5 relative">
                        <img
                            src={bannerImg}
                            className="rounded-3xl mt-16 md:mt-12"
                        />

                        {children}
                    </div>
                    <div className="fixed bottom-5 right-5 md:right-24 w-12 h-12 rounded-full bg-primary border-2 border-cyan-300 cursor-pointer flex items-center justify-center">
                        <ShoppingCartIcon className={"text-white"} />
                    </div>
                </div>
            </div>
        </LayoutsProviders>
    );
};

export default StoreLayout;
const NavItem = ({ item }) => {
    return (
        <InertiaLink href={`/?category=${item}`}>
            <div className="text-md text-gray-700 font-bold px-2 py-2 hover:bg-sky-400 hover:text-sky-100 rounded transition-all duration-150 cursor-pointer">
                {item}
            </div>
        </InertiaLink>
    );
};
const CategoriesSideBar = ({ categories }) => {
    return (
        <div className="fixed mt-12 right-0 min-h-screen overflow-y-auto py-10 px-5 bg-gray-100 border-l-2 border-gray-200 text-right">
            <div className="text-2xl font-bold text-gray-800">التصنيفات</div>
            {categories.map((item) => {
                return <NavItem item={item} />;
            })}
        </div>
    );
};
