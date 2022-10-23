import { Layout as AntLayout } from "antd";
import {
    Header as AntHeader,
    Content as AntContent,
    Footer as AntFooter,
} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import {
    GroupsMenuWithOptions,
    Header,
    Breadcrumb,
    Footer,
    NavBar,
} from "../../components";
import { useLang } from "../../hooks";

export default function AdminLayout({ children, className = "" }) {
    return (
        <AntLayout className="">
            <AntHeader className="main-theme h-auto p-0 m-0 flex sticky z-10 top-0 shadow-lg">
                <Header />
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
                        {children}
                    </AntContent>
                </AntLayout>
            </AntContent>
            <AntFooter className="m-0 p-0 mt-16">
                <Footer />
            </AntFooter>
        </AntLayout>
    );
}
