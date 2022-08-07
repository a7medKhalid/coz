import { useForm } from "@inertiajs/inertia-react";
import { Modal } from "flowbite-react";
import React from "react";
import { TrashIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import CustomModal from "../../../components/CustomModal";
import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import ValidationErrors from "../../../Components/ValidationErrors";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const PromoCodes = (props) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const { post } = useForm({});
    const promocodes = props.promocodes;

    // if promocodes is empty, show message in center of viewport
    if (promocodes === null || promocodes === undefined) {
        return (
            <div className="h-screen flex items-center justify-center">
                <AddPromocode />
                <div className="mx-1"></div>
                <h1>لا يوجد لديك أكواد خصم</h1>
            </div>
        );
    }

    const deletePromocode = (id) => {
        post(
            route("deletePromocode", {
                promocode_id: id,
            }),

            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم حذف الكود بنجاح",
                        status: "success",
                    });
                },
                onError: () => {
                    setSnackBar({
                        isShown: true,
                        message: "حدث خطأ ما",
                        status: "error",
                    });
                },
            }
        );
    };

    return (
        <>
            <AddPromocode />
            <div className="overflow-x-auto rtl relative bg-white shadow-xl border border-gray-200 min-h-screen rounded-xl mt-5">
                <table className="w-full  text-sm  text-gray-500 text-right ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                رقم المعرف
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الرمز
                            </th>
                            <th scope="col" className="py-3 px-6">
                                نسبة الخصم
                            </th>
                            <th scope="col" className="py-3 px-6">
                                الاستخدمات المتبقية
                            </th>
                            <th scope="col" className="py-3 px-6">
                                متعدد الإستخدمات؟
                            </th>
                            <th scope="col" className="py-3 px-6">
                                حذف
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {promocodes.map((item) => {
                            return (
                                <tr
                                    className="bg-white border-b  "
                                    key={item.id}
                                >
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.id}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.code}
                                    </td>
                                    <td
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                        {item.details.discount}
                                    </td>
                                    <td className="py-4 px-6">
                                        {item.usages_left}
                                    </td>
                                    <td className="py-4 px-6">
                                        {item.multi_use ? "نعم" : "لا"}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div
                                            className="cursor-pointer"
                                            onClick={() =>
                                                deletePromocode(item.id)
                                            }
                                        >
                                            <TrashIcon
                                                className={"text-red-500"}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const AddPromocode = () => {
    const [isModalShown, setIsModalShown] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        code: "",
        discount: "",
        expired_at: "",
        usages_left: "",
        multi_use: "",
    });

    // show modal
    const showModal = () => {
        setIsModalShown(true);
    };
    // hide modal
    const hideModal = () => {
        setIsModalShown(false);
    };

    const { setSnackBar } = React.useContext(LayoutsContext);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("createPromocode"), {
            onSuccess: () => {
                setSnackBar({
                    isShown: true,
                    message: "تم إضافة الكود بنجاح",
                    status: "success",
                });
            },
            onError: () => {
                setSnackBar({
                    isShown: true,
                    message: "حدث خطأ ما",
                    status: "error",
                });
            },
        });
    };
    return (
        <>
            <div className="flex items-center justify-end">
                <span className="inline-flex rounded-md">
                    <Button onClick={showModal}>اضافة كود خصم</Button>
                </span>
            </div>
            <Modal show={isModalShown} onClose={hideModal}>
                <CustomModal.Title>اضافة كود خصم</CustomModal.Title>
                <Modal.Body>
                    <div className="rtl py-5 px-5">
                        <ValidationErrors errors={errors} />
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <div className="text-sm font-bold mb-5">
                                    الرجاء تعبئة البيانات أدناه لإضافة كود خصم
                                </div>
                                <Label forInput="الرمز" value="الرمز" />
                                <Input
                                    type="text"
                                    name="code"
                                    value={data.الرمز}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Label forInput="discount" value="نسبة الخصم" />
                                <Input
                                    type="text"
                                    name="discount"
                                    value={data.discount}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Label forInput="expired_at" value="تنتهي في" />
                                <Input
                                    type="date"
                                    name="expired_at"
                                    value={data.expired_at}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Label
                                    forInput="usages_left"
                                    value="عدد الاستخدمات"
                                />
                                <Input
                                    type="text"
                                    name="usages_left"
                                    value={data.usages_left}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />
                                <div className="flex items-center justify-end">
                                    <Label
                                        forInput="multi_use"
                                        className={"w-full"}
                                        value="متعدد الإستخدمات ؟ "
                                    />
                                    <Input
                                        type="checkbox"
                                        name="multi_use"
                                        value={data.multi_use}
                                        className="mt-1 block "
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        className="bg-gray-200 text-black"
                        onClick={hideModal}
                    >
                        اخفاء
                    </Button>
                    <Button onClick={submit}>ارسال</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

PromoCodes.layout = (page) => <DashboardLayout children={page} />;
export default PromoCodes;
