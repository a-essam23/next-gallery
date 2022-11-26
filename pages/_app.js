import {
    LanguageProvider,
    ScrollToTop,
    AuthProvider,
    useAuth,
    MetaProvider,
} from "../context";
import "antd/dist/reset.css";
import "swiper/css/bundle";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <MetaProvider>
                <LanguageProvider>
                    <NextNProgress startPosition={0.1} stopDelayMs={50} />
                    <Component {...pageProps} />
                </LanguageProvider>
            </MetaProvider>
        </AuthProvider>
    );
}

export default MyApp;
