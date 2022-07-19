const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

    ],

    theme: {
        extend: {
            colors: {
                primary: "#06b6d4",
            },
        },
    },

    plugins: [require("@tailwindcss/forms"),
    require('flowbite/plugin')

],
};
