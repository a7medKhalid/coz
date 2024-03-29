import React from "react";
import NavBar from "./components/NavBar";
import { ShoppingCartIcon } from "../../assets/icons";
import MapWrapper from "../../Pages/Dashboard/Branches/components/MapWrapper";
import { InertiaLink } from "@inertiajs/inertia-react";
import LayoutsProviders from "../LayoutsProvider";
import appLogo from "../../assets/images/appLogo.png";
import MobileNavBar from "./components/MobileNavBar";

interface props {
    children: any;
    categories: string[];
    selectedBranch: string;
    branches: any;
    auth?: any;
}
const StoreLayout: React.FC<props> = ({
    children,
    categories,
    selectedBranch,
    branches,
    auth,
}) => {
    return (
        <LayoutsProviders>
            <div>
                <div className="visible 2xl:invisible">
                    <MobileNavBar
                        categories={categories}
                        selectedBranch={selectedBranch}
                        branches={branches}
                        auth={auth}
                    />
                </div>
                <div className="invisible 2xl:visible">
                    <NavBar
                        categories={categories}
                        selectedBranch={selectedBranch}
                        branches={branches}
                        auth={auth}
                    />
                    <CategoriesSideBar categories={categories} />
                </div>

                <div className="lg:flex items-center justify-center">
                    <div className="md:w-3/4 py-5 px-5  lg:mb-0 lg:mt-5 relative">
                        {children}
                    </div>
                    <InertiaLink href="cart">
                        <div className="fixed top-24 left-10 md:right-24 w-12 h-12 rounded-full bg-primary border-2 border-cyan-300 cursor-pointer flex items-center justify-center">
                            <ShoppingCartIcon className={"text-white"} />
                        </div>
                    </InertiaLink>
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
        <div className="fixed mt-12 right-0 min-h-screen w-48 overflow-y-scroll py-10 px-5 bg-slate-100 border-l-2 border-slate-200 text-right">
            <div className="text-2xl font-bold text-gray-800">التصنيفات</div>
            {categories.map((item) => {
                return <NavItem item={item} />;
            })}
        </div>
    );
};
