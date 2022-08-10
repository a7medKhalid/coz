import { InertiaLink } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { MarkerIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import ViewBranchesModal from "./ViewBranchesModal";
import appLogo from "../../../assets/images/appLogo.png";
export default function NavBar({ categories, selectedBranch, branches, auth }) {
    return (
        <div className="bg-slate-100 fixed z-40 w-screen border-b-2 border-slate-200 flex  justify-center items-center max-h-20 pr-10">
            <div className="w-3/4 flex items-center justify-between py-4 rtl">
                <div className="flex justify-center cursor-pointer">
                    <InertiaLink href={route("store")}>
                        <img src={appLogo} alt="logo" className="w-10" />
                    </InertiaLink>
                </div>
                <div>
                    <ViewBranchesModal
                        selectedBranch={selectedBranch}
                        branches={branches}
                    />
                </div>
                <div></div>
                {/* <div className="flex items-center text-right">
                    <Input
                        handleChange={() => {}}
                        name="search"
                        value={null}
                        placeholder="..ابحث"
                    />
                </div> */}
            </div>
        </div>
    );
}
