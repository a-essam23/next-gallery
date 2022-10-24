import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    const { isAr, language } = useLang();
    return (
        <Html dir={isAr ? "rtl" : "ltr"} lang={language}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
