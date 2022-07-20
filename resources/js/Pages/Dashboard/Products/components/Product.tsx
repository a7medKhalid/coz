import { useForm } from "@inertiajs/inertia-react";
import { Badge, Carousel, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
    AddDocumentIcon,
    TagIcon,
    XCircleIcon,
} from "../../../../assets/icons";
import Button from "../../../../components/Button";
import CustomModal from "../../../../components/CustomModal";
import Input from "../../../../components/Input";
import { LayoutsContext } from "../../../../Layouts/LayoutsProvider";

interface category {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
}
interface props {
    id?: number;
    type: "create" | "edit" | "ready";
    images: any;
    name: string;
    price: number;
    description: string;
    allCategories: category[];
    categories: category[];
    onEdit: () => void;
    onCancel: () => void;
}
const Product: React.FC<props> = ({
    id,
    type,
    images,
    name,
    description,
    allCategories,
    price,
    onEdit,
    onCancel,
    categories,
}) => {
    const { setSnackBar } = React.useContext(LayoutsContext);
    const [stateCategories, setStateCategories] = React.useState<any>([
        ...categories,
    ]);

    const [showImagesCarousel, setShowImagesCarousel] = React.useState(false);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform,
        setDefaults,
    } = useForm({
        product_id: id,
        name: name,
        description: description,
        price: price,
        isArchived: 0,
        categories: null,
    });

    useState({
        id: 5,
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

        const c: any = stateCategories.map((sc) => {
            return allCategories.filter((ac) => {
                return ac.name === sc;
            });
        });

        const categoriesIds = c.map((i) => {
            return i[0].id;
        });
        console.log(categoriesIds);

        transform((data) => ({
            ...data,
            categories: categoriesIds,
        }));

        switch (type) {
            case "create":
                post(route("createProduct"), {
                    onError: function (e) {
                        console.log({ e });
                        setSnackBar({
                            isShown: true,
                            message: "حصل خطا ما",
                            status: "error",
                        });
                    },
                    onSuccess: function () {
                        setSnackBar({
                            isShown: true,
                            message: "تم اضافة المنتج بنجاح",
                            status: "success",
                        }),
                            reset();
                        setStateCategories([]);
                        window.location.reload();
                    },
                });
                break;
            case "edit":
                post(route("updateProduct"), {
                    onError: function (e) {
                        console.log({ e });
                        setSnackBar({
                            isShown: true,
                            message: "حصل خطا ما",
                            status: "error",
                        });
                    },
                    onSuccess: () =>
                        setSnackBar({
                            isShown: true,
                            message: "تم تعديل المنتج بنجاح",
                            status: "success",
                        }),
                });
                break;
        }

        onCancel();
    };
    const onDelete = (e) => {
        e.preventDefault();
        post(route("deleteProduct"), {
            onError: (e) =>
                setSnackBar({
                    isShown: true,
                    message: "حصل خطا ما",
                    status: "error",
                }),
            onSuccess: () =>
                setSnackBar({
                    isShown: true,
                    message: "تم حذف المنتج بنجاح",
                    status: "success",
                }),
        });
    };

    const addCategory = (event) => {
        if (event.target.value < 1) {
            return null;
        }
        if (stateCategories.includes(event.target.value)) {
            return;
        }
        const c: any = allCategories?.filter((i) => {
            return i.name == event.target.value;
        });

        setStateCategories([...stateCategories, event.target.value]);
        setData("categories", [...stateCategories, c[0].id]);
    };
    const removeCategory = (item) => {
        const c: any = allCategories.filter((i) => {
            return i.name === item;
        });

        setStateCategories(
            stateCategories.filter((i) => {
                return i !== c[0].name;
            })
        );
    };
    const categoryByID = (n) => {
        if (n < 1) {
            return null;
        }
        let c: any = [];

        c = allCategories?.filter((i) => {
            return i.name == n;
        });

        return c[0]?.name;
    };

    return (
        <div className="bg-white border flex flex-col justify-between border-gray-200 rounded overflow">
            <form onSubmit={submit}>
                <div>
                    <ProductImage images={images} productID={id} />
                    {/* <ImageCarousel /> */}
                    {/* <div className="h-48 w-full"> */}
                    {/* </div> */}
                    <div className="py-4 px-4 rtl h-52">
                        <div className="flex items-center overflow-x-auto overflow-y-hidden">
                            {type !== "ready" ? (
                                <>
                                    <select
                                        required={
                                            type === "edit" ? false : true
                                        }
                                        name=""
                                        onChange={addCategory}
                                        className="py-0.5 w-fit text-xs  rounded-lg text-white ml-2 border-none bg-primary"
                                    >
                                        <option value={""}>اضافة تصنيف</option>
                                        {allCategories.map((item) => {
                                            return (
                                                <option value={item.name}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    {stateCategories?.map((item) => {
                                        return (
                                            <div
                                                onClick={() =>
                                                    removeCategory(item)
                                                }
                                                className="py-0.5 ml-2 whitespace-nowrap  px-4 hover:bg-red-500 hover:text-white  transition duration-150 cursor-pointer  rounded-lg border border-gray-200 bg-gray-100 text-xs"
                                            >
                                                {categoryByID(item)}
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {categories?.map((item) => {
                                        return (
                                            <div className="py-0.5 mb-2 whitespace-nowrap ml-2 px-4 w-fit rounded-lg border border-gray-200 bg-gray-100 text-xs">
                                                {item}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                        {type === "ready" ? (
                            <>
                                <div className="flex items-center justify-between ">
                                    <div className="text-md font-bold">
                                        {name}
                                    </div>
                                    <div className="text-md">{price} ريال</div>
                                </div>
                                <div className="text-sm mt-5">
                                    {description}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <Input
                                        name={"name"}
                                        required
                                        value={data.name}
                                        parentClassName={"items-start"}
                                        placeholder={"اسم المنتج"}
                                        handleChange={onHandleChange}
                                    />
                                    <div className="relative mr-3">
                                        <Input
                                            name={"price"}
                                            required
                                            value={data.price}
                                            type="number"
                                            className={"w-full"}
                                            parentClassName={"items-end"}
                                            placeholder={"السعر"}
                                            handleChange={onHandleChange}
                                        />
                                        <div className="absolute bg-gray-100 border border-gray-300 flex items-center justify-center left-0 top-0 h-full px-4 rounded-l  text-xs">
                                            ريال
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    name={"description"}
                                    required
                                    placeholder={"وصف المنتج"}
                                    rows={3}
                                    value={data.description}
                                    className={
                                        "w-full border-gray-300 mt-4 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm"
                                    }
                                    onChange={onHandleChange}
                                ></textarea>
                                {/* <Input /> */}
                            </>
                        )}
                    </div>
                </div>

                <div className="rtl flex items-center bg-gray-100 border-t border-gray-200 py-3  px-4">
                    {type === "ready" && (
                        <Button onClick={onEdit} type={"button"}>
                            {"تعديل"}
                        </Button>
                    )}
                    {type !== "ready" && (
                        <Button onClick={onEdit} type={"submit"}>
                            {type == "create" ? "اضافة" : "حفظ"}
                        </Button>
                    )}
                    {type === "ready" ? (
                        <div
                            onClick={onDelete}
                            className="text-red-500 mr-4 hover:bg-red-200 py-1 rounded transition duration-150 cursor-pointer px-4"
                        >
                            {"حذف"}
                        </div>
                    ) : null}
                    {type === "edit" ? (
                        <div
                            onClick={onCancel}
                            className="text-red-500 mr-4 hover:bg-red-200 py-1 rounded transition duration-150 cursor-pointer px-4"
                        >
                            {"الغاء"}
                        </div>
                    ) : null}
                </div>
            </form>
        </div>
    );
};

export default Product;

const ProductImage = ({ images, productID }) => {
    // console.log({ images });

    const { data, setData, post, processing, transform, progress } = useForm({
        product_id: productID,
        image: null,
    });
    const { setSnackBar } = React.useContext(LayoutsContext);

    const uploadImage = (e: any) => {
        transform((data) => ({
            ...data,
            image: e.target.files[0],
        }));

        post(route("addProductImage"), {
            onError: function (e) {
                console.log({ e });
                setSnackBar({
                    isShown: true,
                    message: "حصل خطا ما",
                    status: "error",
                });
            },
            onSuccess: () =>
                setSnackBar({
                    isShown: true,
                    message: "تم تعديل المنتج بنجاح",
                    status: "success",
                }),
        });
    };
    const removeImage = (img: any) => {
        post(
            route("deleteProductImage", {
                image_id: img.id,
                product_id: productID,
            }),
            {
                onError: function (e) {
                    setSnackBar({
                        isShown: true,
                        message: "حصل خطا ما",
                        status: "error",
                    });
                },
                onSuccess: () =>
                    setSnackBar({
                        isShown: true,
                        message: "تم تعديل المنتج بنجاح",
                        status: "success",
                    }),
            }
        );
    };
    const [show, setShow] = React.useState(false);
    const inputRef = React.useRef(null);
    return (
        <React.Fragment>
            <img
                onClick={() => setShow(true)}
                src={images[0].url}
                className="w-full h-48 object-cover"
            />
            <Modal show={show} onClose={() => setShow(false)}>
                <Modal.Header>صور المنتج</Modal.Header>
                <Modal.Body>
                    <div className=" mb-2">
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                    <div className="grid grid-cols-3 rtl gap-3 h-96 overflow-y-scroll">
                        <form>
                            <div onClick={() => inputRef?.current?.click()}>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    name="image"
                                    id=""
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={uploadImage}
                                />
                                <div className=" h-72 border-2 border-gray-200 hover:bg-gray-100 cursor-pointer border-dashed flex items-center justify-center">
                                    <AddDocumentIcon
                                        className={"w-10 h-10 text-primary"}
                                    />
                                </div>
                            </div>
                        </form>

                        {images.map((img) => {
                            return (
                                <div className="relative">
                                    <img
                                        src={img.url}
                                        className={"h-72  object-cover"}
                                    />
                                    <div
                                        onClick={() => removeImage(img)}
                                        className="absolute right-2 top-2 transition-all duration-150  text-red-500 cursor-pointer hover:scale-150 "
                                    >
                                        <XCircleIcon className={""} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={onClick}>I accept</Button>
                    <Button color="gray" onClick={onClick}>
                        Decline
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};
// <CustomModal>
//     <CustomModal.Trigger>
//         <img src={images[0]} className="w-full h-48 object-cover" />
//     </CustomModal.Trigger>
//     <CustomModal.Content>
//         <CustomModal.Title>صور المنتج</CustomModal.Title>
//         {/* <div className="rtl py-5 px-5 "> */}
//         <div className="grid grid-cols-3 ">
//             {images.map((img) => {
//                 return (
//                     <img
//                         src={img}
//                         className={"h-56 w-56 object-cover"}
//                     />
//                 );
//             })}
//         </div>

//         {/* </div> */}
//         <CustomModal.Footer></CustomModal.Footer>
//     </CustomModal.Content>
// </CustomModal>
