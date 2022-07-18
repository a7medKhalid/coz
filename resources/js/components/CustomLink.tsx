import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

export default function CustomLink({ to, text }) {
    return (
        <div>
            <InertiaLink
                href={route(to)}
                className="text-primary underline font-bold mb-2"
            >
                {text}
            </InertiaLink>
        </div>
    );
}
