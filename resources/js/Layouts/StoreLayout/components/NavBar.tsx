import { InertiaLink } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { MarkerIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import ViewBranchesModal from "./ViewBranchesModal";
export default function NavBar({ categories, selectedBranch, branches, auth }) {
    console.log(auth);

    return (
        <div className="bg-[#7d94b6] fixed z-40 w-screen shadow-lg flex  justify-center items-center ">
            <div className="w-3/4 flex items-center justify-center py-4 ">
                <div>
                    <ViewBranchesModal
                        selectedBranch={selectedBranch}
                        branches={branches}
                    />
                </div>
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
