import { LanguageProvider, ScrollToTop } from "../context";
import "antd/dist/antd.min.css";
import "swiper/css/bundle";
// import "animate.css/animate.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <ScrollToTop />
            <Component {...pageProps} />
        </LanguageProvider>
    );
}

export default MyApp;
