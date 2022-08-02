import { Modal } from "flowbite-react";
import React from "react";
import { MarkerIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import ViewBranchesModal from "./ViewBranchesModal";

export default function NavBar({ categories, selectedBranch, branches }) {
    return (
        <div className="bg-[#7d94b6] fixed z-50 w-screen shadow-lg flex  justify-center items-center ">
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
                    <ViewBranchesModal
                        selectedBranch={selectedBranch}
                        branches={branches}
                    />
                </div>
                <div className="flex items-center text-right">
                    <Input
                        handleChange={() => {}}
                        name="search"
                        value={null}
                        placeholder="..ابحث"
                    />
                </div>
            </div>
        </div>
    );
}
