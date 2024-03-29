import { Layout as AntLayout } from "antd";
import {
    Header as AntHeader,
    Content as AntContent,
    Footer as AntFooter,
} from "antd/lib/layout/layout";
import { Breadcrumb, NavBar, Footer, Header } from "../../components";
import { useLang } from "../../hooks";
import LanguageSelection from "./LanguageSelection";

export default function Layout({ children, className }) {
    const { isAr, language } = useLang();
    //// TODO FIX COMPONENTS
    return (
        <AntLayout
            dir={isAr ? "rtl" : "ltr"}
            lang={language}
            className="bg-white"
        >
            <Header />
            <LanguageSelection />
            <AntHeader className="h-auto p-0 m-0 flex justify-center main-theme sticky z-10 top-0 shadow-lg">
                <NavBar />
            </AntHeader>
            <Breadcrumb />
            <AntContent
                className={`container flex flex-col main-theme min-h-screen relative ${className}`}
            >
                {children}
            </AntContent>
            <AntFooter className="m-0 p-0 mt-16">
                <Footer />
            </AntFooter>
        </AntLayout>
    );
}
