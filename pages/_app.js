import {
    LanguageProvider,
    ScrollToTop,
    AuthProvider,
    useAuth,
    MetaProvider,
} from "../context";
import "swiper/css/bundle";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "../context/UserProvider";
import App from "next/app";

function MyApp({ Component, pageProps, session }) {
    return (
        <UserProvider session={session}>
            <LanguageProvider>
                <NextNProgress startPosition={0.1} stopDelayMs={50} />
                <Component {...pageProps} />
            </LanguageProvider>
        </UserProvider>
    );
}

MyApp.getInitialProps = async (context) => {
    const { ctx } = context;
    if (ctx.req?.session) ctx.req?.session.reload(() => {});
    const appProps = await App.getInitialProps(context);
    return { ...appProps, session: ctx.req?.session };
};
export default MyApp;
