import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import StoreLayout from "../../Layouts/StoreLayout";
import MapWrapper from "../Dashboard/Branches/components/MapWrapper";
import Product from "../Dashboard/Products/components/Product";

interface props {
    orderId: string;
    orderStatus: string;
    orderTotal: string;
    orderType: string;
    orderBranchName: string;
    orderBranchLatitude: string;
    orderBranchLongitude: string;
}
const TrackingDetails: React.FC<props> = (props) => {
    console.log(props);
    // 'branches' => $branches ,
    //             'selectedBranch' => $selectedBranch,
    const list = [
        { key: "orderId", ar: "رقم الطلب", en: "Order ID" },
        { key: "orderStatus", ar: "حالة الطلب" },
        { key: "orderTotal", ar: "المبلغ الكلي" },
        { key: "orderType", ar: "نوع الطلب" },
        { key: "orderBranchName", ar: "اسم الفرع" },
        // {key: "orderBranchLatitude",    ar:"خط الطول" },
        // {key: "orderBranchLongitude",    ar:"خط العرض" },
    ];
    return (
        // <StoreLayout
        //     categories={props.categories}
        //     selectedBranch={props.selectedBranch}
        //     branches={props.branches}
        // >
        <div className="mt-14">
            <div className="text-4xl font-bold text-center mb-4">
                حالة الطلب
            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <div className="h-[80vh] w-full">
                        <MapWrapper
                            setSelectedPosition={(val: any) => {
                                null;
                            }}
                            staticMarker={{
                                lat: props.orderBranchLatitude,
                                lng: props.orderBranchLongitude,
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    {list.map((item) => {
                        return (
                            <div className="flex items-center justify-start rtl">
                                <div className="font-bold">{item.ar} : </div>
                                <div className="font">{props[item?.key]}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        // </StoreLayout>
    );
};
export default TrackingDetails;
