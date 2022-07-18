import React from "react";

const CustomSnackBar = ({ snack, setSnackBar }) => {
    const CLASSES_MAP = {
        success: "bg-green-200 text-green-700 font-bold  text-center",
        error: "bg-red-200 text-red-700 font-bold  text-center",
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
                className={`absolute top-0 h-10 w-screen flex text-sm items-center justify-center px-10 py-5 ${
                    CLASSES_MAP[snack.status]
                }`}
            >
                تم اضافة الفرع بنجاح
            </div>
        );
    }
    return null;
};

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
