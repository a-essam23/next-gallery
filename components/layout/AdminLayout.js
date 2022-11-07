import { Layout as AntLayout } from "antd";
import {
    Header as AntHeader,
    Content as AntContent,
    Footer as AntFooter,
} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    GroupsMenuWithOptions,
    Header,
    Breadcrumb,
    Footer,
    NavBar,
    Counter,
    Loading,
} from "../../components";
import { useAuth, useLang } from "../../context";
import LanguageSelection from "./LanguageSelection";

export default function AdminLayout({ children, className = "", title }) {
    const { language, dir } = useLang();
    const { user } = useAuth();
    const router = useRouter();

    return (
        <AntLayout dir={dir} lang={language} className="bg-white">
            <LanguageSelection />
            <AntHeader className="main-theme h-auto p-0 m-0 flex sticky z-10 top-0 shadow-lg">
                <Header title={title} />
                <NavBar />
            </AntHeader>
            <AntContent className="bg-white">
                <Breadcrumb />
                <AntLayout
                    hasSider
                    className="w-full bg-white min-h-screen h-full max-w-full"
                >
                    <Sider
                        className="main-theme mr-4 xl:mr-0 "
                        breakpoint="md"
                        width={225}
                    >
                        <GroupsMenuWithOptions />
                    </Sider>
                    <AntContent
                        className={`${className} xl:mx-6 bg-white min-h-screen h-full `}
                    >
                        <Counter />
                        {user && children}
                    </AntContent>
                </AntLayout>
            </AntContent>
            <AntFooter className="m-0 p-0 mt-16">
                <Footer />
            </AntFooter>
        </AntLayout>
    );
}
