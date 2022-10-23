import { Html, Head, Main, NextScript } from "next/document";
import { useLang } from "../hooks";

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
