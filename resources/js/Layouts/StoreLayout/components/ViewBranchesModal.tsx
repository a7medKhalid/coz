import React from "react";
import { Modal } from "flowbite-react";
import { MarkerIcon } from "../../../assets/icons";
import MapWrapper from "../../../Pages/Dashboard/Branches/components/MapWrapper";
import Button from "../../../Components/Button";
import { useForm } from "@inertiajs/inertia-react";

const ViewBranchesModal = ({ selectedBranch, branches }) => {
    const { post } = useForm({});
    const [showModal, setShowModal] = React.useState(false);
    const [selectedBranchState, setSelectedBranchState] = React.useState({
        id: "",
        name: "",
    });
    const [selectedPosition, setSelectedPosition] = React.useState({
        lat: 0,
        lng: 0,
    });

    const setBranch = () => {
        console.log(selectedBranch);

        post(
            route("updateBranch", {
                branch_id: selectedBranchState.id,
            })
        );
        hideModal();
    };
    // state selected branch
    function viewModal() {
        setShowModal(true);
    }
    function hideModal() {
        setShowModal(false);
    }
    return (
        <React.Fragment>
            <div
                onClick={viewModal}
                className="bg-[#adbcd1]  hover:text-white cursor-pointer transition duration-150 rounded px-5 py-2 flex items-center justify-center text-gray-700"
            >
                {selectedBranch != null ? selectedBranch.name : "اختر فرع"}
                <MarkerIcon className={"ml-2"} />
            </div>
            <Modal show={showModal} onClose={hideModal}>
                {/* <Modal.Header>الفروع</Modal.Header> */}
                <Modal.Body>
                    <div className="grid grid-cols-8">
                        <div className="col-span-6 h-80">
                            <MapWrapper
                                setSelectedPosition={(val: any) => {
                                    null;
                                }}
                                staticMarker={selectedPosition}
                            />
                        </div>
                        <div className="col-span-2">
                            {branches.map((item, index) => {
                                return (
                                    <BranchItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        len={branches.length}
                                        setSelectedPosition={(val: any) => {
                                            setSelectedPosition(val);
                                        }}
                                        selectedBranchState={
                                            selectedBranchState
                                        }
                                        setSelectedBranchState={(val: any) => {
                                            setSelectedBranchState(val);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="bg-transparent text-red-400"
                        onClick={hideModal}
                    >
                        إلغاء
                    </Button>
                    <Button onClick={setBranch}>تحديد الفرع</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

// create branch item component
const BranchItem = ({
    item,
    index,
    len,
    setSelectedPosition,
    setSelectedBranchState,
    selectedBranchState,
}) => {
    return (
        <div
            onClick={() => {
                setSelectedPosition({
                    lng: +item.longitude,
                    lat: +item.latitude,
                });
                setSelectedBranchState(item);
            }}
            className={`${
                item.id === selectedBranchState.id
                    ? "bg-sky-400 text-white"
                    : "bg-transparent"
            } px-5 py-2 flex items-center justify-end text-gray-700 cursor-pointer text-right`}
        >
            {item.name}
            <MarkerIcon className={"ml-2"} />
            {/* {index !== len - 1 && <div className="h-0.5 w-full bg-gray-200" />} */}
        </div>
    );
};

export default ViewBranchesModal;
