import React, { useEffect } from "react";

import AuthLayout from "../../Layouts/AuthLayout";
import { Head, InertiaLink, Link, useForm } from "@inertiajs/inertia-react";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import ValidationErrors from "../../Components/ValidationErrors";
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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

        post(route("register"));
    };

    return (
        <AuthLayout>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <ValidationErrors errors={errors} />
            </Box>
            <Box component="form" onSubmit={submit} noValidate>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={onHandleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onHandleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onHandleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="confirm password"
                    type="password"
                    id="password_confirmation"
                    autoComplete="passwordConfirmation"
                    onChange={onHandleChange}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign up
                </Button>
                <Grid container>
                    <Grid item>
                        <InertiaLink href="/login">
                            {"have an account? Sign in"}
                        </InertiaLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
}
