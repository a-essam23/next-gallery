import { v4 } from "uuid";
import { Breadcrumb as AntBreadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLang } from "../../context";

////TODO REMODELL >>> FIX HREFS!
export default function Breadcrumb() {
    const router = useRouter();
    const pathname = router.asPath;
    const { langData, language } = useLang();
    function getBreadCrumbs() {
        const paths = pathname.split("/").filter((path) => path.length > 0);

        if (!paths.length) return null;
        const crumbList = paths.map((path, index) => {
            const path_ = langData[decodeURI(path)] || decodeURI(path);
            const href =
                paths.slice(0, index).join("/") + `${path_ ? "/" + path_ : ""}`;

            return {
                path: path_,
                href,
            };
        });
        return (
            <>
                <BreadcrumbItem key={v4()} className="">
                    <Link href="/">
                        <a>{langData["home"].toUpperCase()}</a>
                    </Link>
                </BreadcrumbItem>
                {crumbList.map(({ href, path }) => {
                    return (
                        <BreadcrumbItem key={v4()} className="">
                            <Link href={href}>
                                <a>{path.toUpperCase()}</a>
                            </Link>
                        </BreadcrumbItem>
                    );
                })}
            </>
        );
    }
    // eslint-disable-next-line
    const crumbs = useMemo(getBreadCrumbs, [pathname, language]);
    return (
        <AntBreadcrumb
            className={`container my-2 md:my-6 2xl:my-8 flex items-end `}
        >
            {crumbs}
        </AntBreadcrumb>
    );
}
