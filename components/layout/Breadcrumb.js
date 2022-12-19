import { v4 } from "uuid";
import { Breadcrumb as AntBreadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLang } from "../../context";

////TODO REMODELL >>> FIX HREFS!
export default function Breadcrumb() {
    const { langData, language } = useLang();
    const router = useRouter();
    const pathname = router.asPath;
    function getBreadCrumbs() {
        if (pathname === "/" || pathname.startsWith("/#")) return null;
        const paths = pathname.split("/");
        const crumbList = paths.map((path, i) => {
            if (path.length === 0)
                return {
                    path: langData["home"],
                    href: "/",
                };
            if (path.lastIndexOf("?")) path = path.split("?")[0];
            path = langData[decodeURI(path)] || decodeURI(path);
            return {
                path,
                href: paths.slice(0, i).join("/") + "/" + path || "/",
            };
        });
        //
        return (
            <>
                {crumbList.map(({ href, path }) => {
                    return (
                        <BreadcrumbItem key={v4()} className="">
                            <Link href={href}>{path.toUpperCase()}</Link>
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
