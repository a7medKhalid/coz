import { InertiaLink } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { MarkerIcon, MenuIcon, XCircleIcon } from "../../../assets/icons";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import ViewBranchesModal from "./ViewBranchesModal";
import appLogo from "../../../assets/images/appLogo.png";

export default function MobileNavBar({
    categories,
    selectedBranch,
    branches,
    auth,
}) {
    const [viewSideBar, setViewSideBar] = React.useState(false);
    return (
        <div className="bg-slate-100 border-b-2 border-slate-200  fixed z-40 w-screen  ">
            {viewSideBar && (
                <div className="h-screen w-screen">
                    <CategoriesSideBar
                        auth={auth}
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
                <div className="flex justify-center mx-5">
                    <InertiaLink href={route("store")}>
                        <img src={appLogo} alt="logo" className="w-10" />
                    </InertiaLink>
                </div>
                <div className="mr-5 cursor-pointer">
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
const CategoriesSideBar = ({ categories, onClick, auth }) => {
    return (
        <div className="fixed  z-50 h-screen overflow-y-scroll w-screen  py-10 px-5 bg-gray-100 border-l-2 border-gray-200 text-right">
            <div className="flex justify-end items-center mb-5 text-primary cursor-pointer">
                {/* {!auth?.user ? (
                    <div>
                        <InertiaLink href={route("register")}>
                            <Button className="bg-transparent text-cyan-500 mr-2">
                                تسجيل
                            </Button>
                        </InertiaLink>
                        <InertiaLink href={route("login")}>
                            <Button className="mr-2 border-2 border-cyan-300">
                                تسجيل الدخول
                            </Button>
                        </InertiaLink>
                    </div>
                ) : (
                    <div className="flex items-center ">
                        <InertiaLink href={route("logout")} method="post">
                            <Button className="mr-2 border-2 border-cyan-300">
                                تسجيل الخروج
                            </Button>
                        </InertiaLink>
                        <div className="text-cyan-800 ml-3">
                            مرحبا {auth.user.name}
                        </div>
                    </div>
                )} */}
                <XCircleIcon className={""} onClick={onClick} />
            </div>

            <div className="text-2xl font-bold text-gray-800">التصنيفات</div>
            {categories.map((item) => {
                return <NavItem item={item} />;
            })}
        </div>
    );
};
