import React from "react";
import NavBar from "./components/NavBar";
import bannerImg from "../../assets/images/banner.jpg";
import { ShoppingCart } from "../../assets/icons";

interface props {
    children: any;
    categories: string[];
}
const StoreLayout: React.FC<props> = ({ children, categories }) => {
    return (
        <div>
            <NavBar categories={categories} />
            <div className="flex items-center justify-center">
                <div className="w-3/4 py-5 mt-5 relative">
                    <img src={bannerImg} className="rounded-3xl mt-12" />
                    {children}
                </div>
                <div className="fixed bottom-5 right-24 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <ShoppingCart className={"text-white"} />
                </div>
            </div>
        </div>
    );
};

export default StoreLayout;
