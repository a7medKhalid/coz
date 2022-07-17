import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext } from "react";
import ValidationErrors from "../../../Components/ValidationErrors";
import AddIcon from "@mui/icons-material/Add";
import MapWrapper from "./components/MapWrapper";
import { LayoutsContext } from "../../../Layouts/LayoutsProvider";
import DashboardLayout from "../../../Layouts/DashboardLayout/DashboardLayout";
import CustomLink from "../../../components/CustomLink";

export default function Add() {
    const { snackBar, setSnackBar } = useContext(LayoutsContext);
    const { data, setData, post, setDefaults, errors } = useForm({
        name: "",
        latitude: "",
        longitude: "",
    });
    const [selectedPosition, setSelectedPosition] = React.useState({
        lat: 0,
        lng: 0,
    });

    const position = {
        lat: selectedPosition.lat.toString(),
        lng: selectedPosition.lng.toString(),
    };
    const onHandleChange = (event: any) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const submit = (e) => {
        e.preventDefault();
        data.latitude = position.lat == 0 ? null : position.lat;
        data.longitude = position.lng == 0 ? null : position.lng;

        post(route("addBranch"), {
            onSuccess: () =>
                setSnackBar({
                    isShown: true,
                    message: "تم إضافة الفرع بنجاح",
                    status: "success",
                }),
        });
    };
    return (
        <div dir="rtl">
            <Grid container>
                <Grid item xs>
                    <Box component="form" onSubmit={submit} noValidate>
                        <CustomLink to="branches" text="عودة" />
                        <ValidationErrors errors={errors} />
                        {/* <LoopObject object={selectedPosition} /> */}
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="عنوان الفرع"
                            name="name"
                            // autoComplete="email"
                            autoFocus
                            onChange={onHandleChange}
                        />
                        <Button
                            variant="outlined"
                            type={"submit"}
                            id="addBranchButton"
                            startIcon={<AddIcon />}
                            sx={{ mt: 2 }}
                        >
                            اضافة
                        </Button>
                    </Box>
                </Grid>
                <Grid item md={8} sx={{ ml: 2, height: "80vh" }}>
                    <MapWrapper
                        setSelectedPosition={(val: any) => {
                            setSelectedPosition(val);
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
Add.layout = (page) => <DashboardLayout children={page} />;
