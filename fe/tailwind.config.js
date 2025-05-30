/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "360px", // breakpoint cho mọi thiết bị mobile phổ biến
            },
            animation: {
                fadeIn: "fadeIn 0.7s ease-in-out forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            fontFamily: {
                brush: ["Brush Script MT", "cursive"],
            },
        },
    },
    plugins: [],
};
