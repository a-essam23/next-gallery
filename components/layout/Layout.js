import { ConfigProvider, Layout as AntLayout } from "antd";
const { Content: AntContent, Footer: AntFooter, Header: AntHeader } = AntLayout;
import {
    Breadcrumb,
    NavBar,
    Footer,
    Header,
    LanguageSelection,
} from "../../components";
import { useLang } from "../../context";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const NotoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export default function Layout({ children, className, title }) {
    const { language, dir } = useLang();
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#be123c",
                },
                components: {},
            }}
        >
            <AntLayout
                dir={dir}
                lang={language}
                className={`striped-background ${
                    language === "ar"
                        ? NotoSansArabic.className
                        : inter.className
                } `}
            >
                <Header title={title} />
                <LanguageSelection />
                <AntHeader className="h-auto p-0 m-0 flex justify-center main-theme z-10 top-0 shadow-gray-700 shadow-md ">
                    <NavBar />
                </AntHeader>
                <Breadcrumb />
                <AntContent
                    className={`container min-h-screen relative flex flex-col ${className} `}
                >
                    {children}
                </AntContent>
                <AntFooter className="m-0 p-0 mt-16">
                    <Footer />
                </AntFooter>
            </AntLayout>
        </ConfigProvider>
    );
}
