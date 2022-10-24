import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { useLang } from "../hooks";

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
