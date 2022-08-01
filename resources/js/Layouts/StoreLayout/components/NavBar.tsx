import React from "react";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";

export default function NavBar({ categories }) {
    return (
        <div className="bg-[#7d94b6] fixed z-50 w-screen shadow-lg flex items-center justify-center ">
            <div className="w-3/4 flex items-center justify-between py-4 ">
                <div className="flex items-center">
                    <Button className="bg-transparent text-white mr-2">
                        تسجيل
                    </Button>
                    <Button className="mr-2 border-2 border-cyan-300">
                        تسجيل الدخول
                    </Button>
                    {/* <img src={appLogo} alt="logo" className="w-8 h-8" /> */}
                </div>

                <div>
                    <div className="bg-[#adbcd1] rounded px-5 py-2">
                        إختيار الفرع
                    </div>
                    {/* <Input
                        handleChange={() => {}}
                        name="search"
                        value={null}
                        placeholder="..ابحث"
                    /> */}
                </div>
                <div className="flex items-center text-right rtl">
                    {categories.map((item) => {
                        return <NavItem item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
}

const NavItem = ({ item }) => {
    return (
        <div className="text-sm text-white font-bold px-2 py-2 hover:bg-sky-400 hover:text-sky-700 rounded transition-all duration-150 cursor-pointer">
            {item}
        </div>
    );
};
