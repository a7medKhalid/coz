import React, { useEffect } from "react";

import { Head, InertiaLink, Link, useForm } from "@inertiajs/inertia-react";
import Button from "@mui/material/Button";
import ValidationErrors from "../../Components/ValidationErrors";
import {
    Box,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import AuthLayout from "../../Layouts/AuthLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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

        post(route("login"));
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <InertiaLink href="/forget">
                            Forgot password?
                        </InertiaLink>
                    </Grid>
                    <Grid item>
                        <InertiaLink href="/register">
                            {"Don't have an account? Sign Up"}
                        </InertiaLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
}
