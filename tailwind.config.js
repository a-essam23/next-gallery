/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    important: true,
    theme: {
        fontFamily: {
            silk: ['"Silkscreen"', "cursive"],
        },
        extend: {
            backgroundImage: {
                "preview-image": "url('/src/assets/previewbg.jpg')",
            },
            fontSize: {
                xs: ["11px", "12px"],
                xxs: ["9px", "10px"],
            },
            boxShadow: {
                cd: "6px 5px 3px 0px rgb(0 0 0 / 0.1), 0px 0px 1px 1px rgb(0 0 0 / 0.1)",
                lgb: "0px 0px 15px -3px rgb(0 0 0 / 0.1), 5px 0px 10px 0px rgb(0 0 0 / 0.1)",
                boxLeft:
                    "-5px 5px 10px -5px rgb(0 0 0 / 10%), 0px 0px 0px 1px rgb(0 0 0 / 10%)",
                boxRight:
                    "5px 5px 10px -5px rgb(0 0 0 / 10%), 0px 0px 0px 1px rgb(0 0 0 / 10%)",
                card: "10px 10px 0px 0px rgba(0,0,0,0.75)",
                "card-offset": "20px 20px 0px 0px rgba(0,0,0,0.75)",
            },
            spacing: {
                88: "22rem",
                112: "28rem",
                116: "29rem",
                120: "30rem",
                128: "32rem",
                144: "36rem",
                154: "38rem",
                158: "39rem",
                160: "40rem",
                168: "42rem",
                184: "46rem",
                200: "50rem",
                216: "54rem",
                220: "55rem",
                224: "56rem",
                232: "58rem",
                280: "70rem",
            },
        },
        aspectRatio: { "4/3": "4 / 3", "3/4": "3 / 4", "1/2": "1 / 2" },
    },
    plugins: [
        ({ addUtilities, theme, variants }) => {
            const textTitle = {
                ".text-title": {
                    fontSize: theme("fontSize.4xl"),
                    letterSpacing: theme("letterSpacing.wide"),
                    "@screen sm": {
                        fontSize: theme("fontSize.5xl"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.6xl"),
                        letterSpacing: theme("tracking.wider"),
                    },
                },
            };

            const textH1 = {
                ".text-h1": {
                    fontSize: theme("fontSize.3xl"),
                    "@screen sm": {
                        fontSize: theme("fontSize.4xl"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.5xl"),
                    },
                },
            };

            const textH2 = {
                ".text-h2": {
                    fontSize: theme("fontSize.2xl"),
                    "@screen sm": {
                        fontSize: theme("fontSize.3xl"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.4xl"),
                    },
                },
            };

            const textH3 = {
                ".text-h3": {
                    fontSize: theme("fontSize.xl"),
                    "@screen sm": {
                        fontSize: theme("fontSize.2xl"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.3xl"),
                    },
                },
            };

            const textH4 = {
                ".text-h4": {
                    fontSize: theme("fontSize.lg"),
                    "@screen sm": {
                        fontSize: theme("fontSize.xl"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.2xl"),
                    },
                },
            };

            const textH5 = {
                ".text-h5": {
                    fontSize: theme("fontSize.base"),
                    "@screen sm": {
                        fontSize: theme("fontSize.lg"),
                    },
                    "@screen xl": {
                        fontSize: theme("fontSize.xl"),
                    },
                },
            };

            const textNormal = {
                ".text-normal": {
                    fontSize: theme("fontSize.base"),
                    "@screen xl": {
                        fontSize: theme("fontSize.lg"),
                    },
                },
            };

            addUtilities(
                [textTitle, textH1, textH2, textH3, textH4, textH5, textNormal],
                variants("text")
            );
        },
    ],
};
