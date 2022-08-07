import { useForm } from "@inertiajs/inertia-react";
import { Label } from "flowbite-react";
import React from "react";
import { TrashIcon } from "../../../assets/icons";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import ValidationErrors from "../../../Components/ValidationErrors";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";

const Categories = (props) => {
    const { setSnackBar } = React.useContext(LayoutsContext);

    const categories = props.categories;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });
    const [editing, setEditing] = React.useState({
        editing: false,
        id: null,
        value: null,
    });

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

        post(route("createCategory"));

        setSnackBar({
            isShown: true,
            message: "تم اضافة التصنيف بنجاح",
            status: "success",
        });
        reset();
    };
    const deleteCategory = (id) => {
        post(
            route("deleteCategory", {
                category_id: id,
            }),

            {
                onSuccess: () => {
                    setSnackBar({
                        isShown: true,
                        message: "تم حذف التصنيف بنجاح",
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
    const editCategory = () => {
        post(
            route(
                "updateCategory",
                {
                    category_id: editing.id,
                    name: editing.value,
                },
                {
                    onSuccess: () => {
                        setSnackBar({
                            isShown: true,
                            message: "تم تعديل التصنيف بنجاح",
                            status: "success",
                        });
                    },
                }
            )
        );
    };
    return (
        <div className="rtl">
            <ValidationErrors errors={errors} />
            <form onSubmit={submit} className="mt-4 mb-5">
                <Label value="اضافة تصنيف" />
                <div className="flex items-center justify-start">
                    <Input
                        parentClassName="w-fit ml-2"
                        type="text"
                        name="name"
                        value={data.name}
                        placeholder="اسم التصنيف"
                        autoComplete="off"
                        className="mt-1 block"
                        handleChange={onHandleChange}
                        required
                    />
                    <Button>اضافة</Button>
                </div>
            </form>
            {categories.map((item) => {
                return (
                    <div className="bg-white shadow rounded flex items-center justify-between py-5 px-10">
                        {editing.editing && editing.id === item.id ? (
                            <input
                                type="text"
                                name="name"
                                value={editing.value}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        editCategory();
                                        setEditing({
                                            editing: false,
                                            id: null,
                                            value: null,
                                        });
                                    }
                                }}
                                placeholder="اسم التصنيف"
                                autoComplete="off"
                                className="mt-1 block w-2/4"
                                onChange={(e) => {
                                    setEditing({
                                        ...editing,
                                        value: e.target.value,
                                    });
                                }}
                                required
                            />
                        ) : (
                            <div
                                className="font-bold"
                                onClick={() =>
                                    setEditing({
                                        editing: true,
                                        id: item.id,
                                        value: item.name,
                                    })
                                }
                            >
                                {item.name}
                            </div>
                        )}

                        <TrashIcon
                            className={
                                "cursor-pointer text-red-500 hover:text-red-700"
                            }
                            onClick={() => deleteCategory(item.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
Categories.layout = (page) => <DashboardLayout children={page} />;

export default Categories;
