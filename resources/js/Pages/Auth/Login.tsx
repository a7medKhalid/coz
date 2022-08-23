import React, { useEffect } from "react";

import { Head, InertiaLink, Link, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "../../components/ValidationErrors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import AuthLayout from "../../Layouts/AuthLayout";
import appLogo from "../../assets/images/appLogo.png";

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
        // <AuthLayout>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <ValidationErrors errors={errors} />
                <div className="flex items-center justify-center">
                    <img src={appLogo} alt="logo" className="w-12 h-12" />
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <Label forInput="email" value="الإيميل" />
                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="كلمة السر" />
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("register")}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            ليس لديك حساب؟
                        </Link>

                        <Button className="ml-4" processing={processing}>
                            تسجيل الدخول
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        // </AuthLayout>
    );
}
