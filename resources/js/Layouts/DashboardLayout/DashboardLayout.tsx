import React from "react";

import CustomDrawer from "./components/CustomDrawer";
import CustomAppBar from "./components/CustomAppBar";
import LayoutsProviders from "../LayoutsProvider";
import { MAP_ROUTE_TO_AR_NAME, MAP_ROUTE_TO_ICON } from "../../assets/consts";
import { InertiaLink } from "@inertiajs/inertia-react";
import appLogo from "../../assets/images/appLogo.png";
import { LogoutIcon } from "../../assets/icons";
interface props {
    children: any;
    title?: string;
}

const SideBar = ({ allowedDashboardPages, setActivePage, activePage }) => {
    return (
        <div
            className="fixed  top-0 right-0 h-screen w-16 pt-3 flex flex-col
                  bg-white  shadow-lg z-50"
        >
            <div className="text-lg text-center font-bold mb-3 text-primary">
                كوز
            </div>
            {allowedDashboardPages.map((item, index) => {
                return (
                    <InertiaLink
                        key={index}
                        href={route(item)}
                        onClick={() => setActivePage(item)}
                    >
                        <SideBarIcon
                            isActive={activePage === item}
                            icon={MAP_ROUTE_TO_ICON[item]}
                            text={MAP_ROUTE_TO_AR_NAME[item]}
                        />
                    </InertiaLink>
                );
            })}
            <div className=" absolute bottom-0  w-full flex flex-col items-center justify-center px-2">
                <img src={appLogo} alt="logo" className="w-8 h-8" />
                <Divider className="my-2" />
                <InertiaLink href={route("logout")} method="post">
                    <LogoutIcon className="text-red-500 w-6 h-6 " />
                </InertiaLink>
            </div>
        </div>
    );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", isActive }) => (
    <div
        className={`relative flex items-center justify-center 
    h-11 w-11 mt-2 mb-1 mx-auto  
   hover:bg-primary  
    hover:text-white
    hover:rounded-xl rounded-3xl
    transition-all duration-300 ease-linear
    cursor-pointer shadow-lg group ${
        isActive
            ? "bg-primary text-white rounded-xl"
            : "bg-gray-200 text-primary"
    }`}
    >
        {icon}
        <span
            className="absolute w-auto p-2 m-2 min-w-max right-14 rounded-md shadow-md
    text-white bg-gray-800 
    text-xs font-bold 
    transition-all duration-100 scale-0 origin-right group-hover:scale-100"
        >
            {text}
        </span>
    </div>
);
const Divider = ({ className }) => (
    <hr
        className={`bg-gray-200 
    border border-gray-100 w-full rounded-full
    mx-2 ${className}`}
    />
);

const DashboardLayout: React.FC<props> = ({ children, title }) => {
    const allowedDashboardPagesProps = children.props.allowedDashboardPages;
    const drawerWidth = 240;
    const locationPathName = location.pathname.split("/");
    const curRouteName = locationPathName[locationPathName.length - 1];
    const [activePage, setActivePage] = React.useState(curRouteName);

    return (
        <LayoutsProviders>
            <div className="relative ">
                <SideBar
                    allowedDashboardPages={allowedDashboardPagesProps}
                    activePage={activePage}
                    setActivePage={(val) => {
                        setActivePage(val);
                    }}
                />

                <div className="mr-16 p-4 pl-8 mt-5 z-10">
                    <div className="text-4xl text-gray-800 text-right font-bold mb-4 drop-shadow-md">
                        {title ? title : MAP_ROUTE_TO_AR_NAME[activePage]}
                    </div>
                    <hr
                        className="bg-gray-200 
    border border-gray-200  rounded-full  w-full mb-5
    "
                    />

                    {children}
                </div>
            </div>
        </LayoutsProviders>
    );
};

export default DashboardLayout;
