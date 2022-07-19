import React from "react";
import { TagIcon } from "../../../../assets/icons";
import Button from "../../../../components/Button";
import Dropdown from "../../../../Components/Dropdown";
import Input from "../../../../components/Input";

interface props {
    img: string;
    title: string;
    price: number;
    description: string;
    categories: string[];
    onEdit: () => void;
    onDelete: () => void;
}
const ProductEditOrCreate: React.FC<props> = ({
    img,
    title,
    description,
    price,
    onEdit,
    onDelete,
    categories,
}) => {
    const [stateCategories, setStateCategories] = React.useState([
        ...categories,
    ]);
    const addCategory = (event) => {
        if (stateCategories.includes(event.target.value)) {
            return;
        }
        setStateCategories([...stateCategories, event.target.value]);
        event.target.value;
    };
    const removeCategory = (item) => {
        setStateCategories(
            stateCategories.filter((i) => {
                return i !== item;
            })
        );
    };
    return (
        <div className="bg-white border flex flex-col justify-between border-gray-200 rounded overflow">
            <div>
                <img
                    src={img}
                    alt="logo"
                    className="w-full max-h-48 object-cover "
                />
                <div className="py-4 px-4 rtl ">
                    <div className="flex items-center overflow-x-auto">
                        <select
                            name=""
                            onChange={addCategory}
                            className="py-0.5 w-fit text-xs  rounded-lg text-white ml-2 border-none bg-primary"
                        >
                            <option value="">اضافة تصنيف</option>
                            {categories.map((item) => {
                                return <option value={item}>{item}</option>;
                            })}
                        </select>

                        {stateCategories?.map((item) => {
                            return (
                                <div
                                    onClick={() => removeCategory(item)}
                                    className="py-0.5 ml-2 px-4 hover:bg-red-500 hover:text-white transition duration-150 cursor-pointer w-fit rounded-lg border border-gray-200 bg-gray-100 text-xs"
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-between w-full mt-4">
                        <Input
                            name={title}
                            required
                            value={title}
                            parentClassName={"items-start"}
                            placeholder={"اسم المنتج"}
                            handleChange={() => {}}
                        />
                        <div className="relative mr-3">
                            <Input
                                name={price.toString()}
                                required
                                value={price}
                                className={"w-full"}
                                parentClassName={"items-end"}
                                placeholder={"السعر"}
                                handleChange={() => {}}
                            />
                            <div className="absolute bg-gray-100 border border-gray-300 flex items-center justify-center left-0 top-0 h-full px-4 rounded-l  text-xs">
                                ريال
                            </div>
                        </div>
                    </div>
                    {/* <textarea
                        className="
                    border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text-right focus:ring-opacity-50 rounded-md shadow-sm
                    "
                        name={description}
                        value={description}
                        placeholder={description}
                        handleChange={() => {}}
                        cols={30}
                        rows={10}
                    ></textarea> */}
                    <Input
                        name={description}
                        required
                        placeholder={"وصف المنتج"}
                        value={description}
                        className={"w-full"}
                        parentClassName={"items-start mt-4"}
                        handleChange={() => {}}
                    />
                </div>
            </div>

            <div className="rtl flex items-center bg-gray-100 border-t border-gray-200 py-3  px-4">
                <Button onClick={onEdit}>حفظ</Button>
                <div
                    onClick={onDelete}
                    className="text-red-500 mr-4 hover:bg-red-200 py-1 rounded transition duration-150 cursor-pointer px-4"
                >
                    الغاء
                </div>
            </div>
        </div>
    );
};

export default ProductEditOrCreate;

// const AddCategory = () => {
//     return (
//         <Dropdown>
//             <Dropdown.Trigger>
//                 <div className="rounded-md">
//                     <button
//                         type="button"
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
//                     >
//                         التصنيفات
//                         <svg
//                             className="ml-2 -mr-0.5 h-4 w-4"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//             </Dropdown.Trigger>

//             <Dropdown.Content>
//                 <div className=""></div>
//             </Dropdown.Content>
//         </Dropdown>
//     );
// };
