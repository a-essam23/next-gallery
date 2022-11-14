import {
    LanguageProvider,
    ScrollToTop,
    AuthProvider,
    useAuth,
} from "../context";
import "antd/dist/antd.css";
import "swiper/css/bundle";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

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
