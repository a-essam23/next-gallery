import { v4 } from "uuid";
import { Breadcrumb as AntBreadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLang } from "../../hooks";

export default function Breadcrumb() {
    const router = useRouter();
    const pathname = router.pathname;
    const { langData, language } = useLang();
    function getBreadCrumbs() {
        const paths = pathname.split("/").filter((path) => path.length > 1);
        if (paths.length < 1) return null;
        const crumbList = paths.map((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            // console.log(router.query[]);
            const dynamicPath = path.match(/\[([^)]+)\]/);
            console.log();
            return {
                path: dynamicPath
                    ? router.query[dynamicPath[1]]
                    : langData[decodeURI(path)] || decodeURI(path),
                href,
            };
        });
        return (
            <>
                <BreadcrumbItem key={v4()} className="px-1 ">
                    <Link href="/">
                        <a>{langData["home"].toUpperCase()}</a>
                    </Link>
                </BreadcrumbItem>
                {crumbList.length > 1 &&
                    crumbList.map(({ href, path }, index) => (
                        <BreadcrumbItem key={v4()}>
                            <Link href={href}>
                                <a>{path.toUpperCase()}</a>
                            </Link>
                        </BreadcrumbItem>
                    ))}
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
