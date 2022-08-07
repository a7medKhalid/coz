import { InertiaLink } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { MarkerIcon, MenuIcon, XCircleIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import ViewBranchesModal from "./ViewBranchesModal";

export default function MobileNavBar({ categories, selectedBranch, branches }) {
    const [viewSideBar, setViewSideBar] = React.useState(false);
    return (
        <div className="bg-[#7d94b6] fixed z-40 w-screen shadow-lg ">
            {viewSideBar && (
                <div className="h-screen w-screen">
                    <CategoriesSideBar
                        categories={categories}
                        onClick={() => setViewSideBar(!viewSideBar)}
                    />
                </div>
            )}
            <div className=" flex items-center justify-end px-10 py-4 ">
                <ViewBranchesModal
                    selectedBranch={selectedBranch}
                    branches={branches}
                />
                <div className="mx-5">
                    <MenuIcon
                        className={""}
                        onClick={(val) => setViewSideBar(!viewSideBar)}
                    />
                </div>
            </div>
        </div>
    );
}

const NavItem = ({ item }) => {
    return (
        <InertiaLink href={`/?category=${item}`}>
            <div className="text-md text-gray-700 font-bold px-2 py-2 hover:bg-sky-400 hover:text-sky-100 rounded transition-all duration-150 cursor-pointer">
                {item}
            </div>
        </InertiaLink>
    );
};
const CategoriesSideBar = ({ categories, onClick }) => {
    return (
        <div className="fixed  z-50 h-screen overflow-y-scroll w-screen  py-10 px-5 bg-gray-100 border-l-2 border-gray-200 text-right">
            <div className="flex justify-end mb-5 text-primary cursor-pointer">
                <XCircleIcon className={""} onClick={onClick} />
            </div>

            <div className="text-2xl font-bold text-gray-800">التصنيفات</div>
            {categories.map((item) => {
                return <NavItem item={item} />;
            })}
        </div>
    );
};
