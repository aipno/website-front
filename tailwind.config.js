/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0066CC',
                dark: '#1A1A1A',
                accent: '#00CC66',
                light: '#F8F9FA'
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
}

