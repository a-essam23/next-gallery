import {
    LanguageProvider,
    ScrollToTop,
    AuthProvider,
    useAuth,
} from "../context";
import "antd/dist/antd.min.css";
import "swiper/css/bundle";
// import "animate.css/animate.min.css";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                <NextNProgress startPosition={0.1} stopDelayMs={50} />
                <Component {...pageProps} />
            </LanguageProvider>
        </AuthProvider>
    );
}

export default MyApp;
