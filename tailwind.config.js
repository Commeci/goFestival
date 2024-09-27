/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            maxWidth: {
                480: "480px", // Custom max-width of 480px
            },
            colors: {
                "custom-orange": {
                    DEFAULT: "#FF8343",
                    light: "#FFD700",
                    dark: "#FF5F00",
                },
                "custom-darkmode": "#212135",
                "custom-font": {
                    DEFAULT: "#161616",
                    gray: "#636363",
                    lightgray: "#B9B9B9",
                },
            },
            boxShadow: {
                top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
                bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
            spacing: {
                "header-height": "100px",
                "navigation-height": "100px",
            },
        },
    },
    plugins: [],
};
