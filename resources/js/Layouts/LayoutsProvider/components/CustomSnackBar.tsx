import React from "react";

const CustomSnackBar = ({ snack, setSnackBar }) => {
    // const CLASSES_MAP = {
    //     success: "bg-green-200 text-green-700 font-bold  text-center",
    //     error: "bg-red-200 text-red-700 font-bold  text-center",
    // };
    const STATUS_MAP = {
        success: <Success />,
        error: <Error />,
    };
    React.useEffect(() => {
        setTimeout(() => {
            setSnackBar({
                ...snack,
                isShown: false,
            });
        }, 5000);
    }, [snack.isShown]);
    if (snack.isShown) {
        return (
            <div
                id="toast-success"
                className="fixed rtl top-10 right-20 z-50 flex items-center justify-between  p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow-2xl border border-gray-200 "
                role="alert"
            >
                <div className="flex items-center">
                    {STATUS_MAP[snack.status]}

                    <div className="mr-3 text-sm font-normal">
                        {snack.message}
                    </div>
                </div>
                <button
                    type="button"
                    className=" bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                    data-dismiss-target="#toast-success"
                    aria-label="Close"
                >
                    <span className="sr-only">اغلاق</span>
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        );
    }
    return null;
};

const Success = () => {
    return (
        <div className="inline-flex flex-shrink-0 justify-center items-center  w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <span className="sr-only">Check icon</span>
        </div>
    );
};
const Error = () => {
    return (
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
            <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <span className="sr-only">Error icon</span>
        </div>
    );
};
// <div
//     classNameName={`absolute top-0 h-10 w-screen flex text-sm items-center justify-center px-10 py-5 ${
//         CLASSES_MAP[snack.status]
//     }`}
// >
//     {snack.message}
// </div>;

export default CustomSnackBar;
//  <Snackbar
//         open={snack.isShown}
//         autoHideDuration={3000}
//         onClose={() => setSnackBar({ ...snack, isShown: false })}
//     >
//         <Alert
//             severity={snack.status}
//             sx={{ width: "100%" }}
//             onClose={() => setSnackBar({ ...snack, isShown: false })}
//         >
//             {snack.message}
//         </Alert>
//     </Snackbar>
